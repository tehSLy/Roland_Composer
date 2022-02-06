import { attach, createEffect, forward, Store } from "effector";
import * as THREE from "three";
import {
  ControlsObjects,
  createIntersectionsManager,
  resolveControls,
} from "./features/Player/3DModel";
import { createClickManager } from "./features/Player/3DModel/createClickManager";
import {
  createDragManager,
  disableCameraControlsUponDrag,
} from "./features/Player/3DModel/createDragManager";
import {
  createABModeSelectorModel,
  createBPMSelectorModel,
  createControls,
  createInstrumentSelectorModel,
  createModeSelectorModel,
  createTumblerModel,
} from "./features/Player/3DModel/resolveControls";
import { createRoland3DModel } from "./features/Player/3DModel/Roland808";
import { createRoland808Model } from "./features/Player/model";
import { Roland808Model } from "./features/Player/model/createPlayerModel";
import {
  BPM,
  instrumentsChain,
  playerModes,
} from "./features/Player/shared/constants";
import { createScene } from "./features/Scene/Scene";
import { appInit } from "./model";

const { scene, camera, ticker, cameraControls } = createScene();

const model = createRoland3DModel();
const intersectionsManager = createIntersectionsManager({ camera });
const dragManager = createDragManager({ intersectionsManager });
const clickManager = createClickManager({ intersectionsManager });
const player = createRoland808Model({
  dataset: {
    bassDrum: {
      a: [1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0],
      b: [1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0],
    },
    snareDrum: {
      a: [0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0],
      b: [0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0],
    },
    closedHat: {
      a: [0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 1, 1, 0, 1],
      b: [0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 1, 0, 1, 0],
    },
  },
});

disableCameraControlsUponDrag({ dragManager, cameraControls });

model.loadModel.doneData.watch((gltf) => scene.add(gltf.scene));

forward({
  from: appInit,
  to: [model.loadModel, ticker.start, dragManager.addEventListeners],
});
appInit();

const gatherObjects = (controls: Record<string, any>) => {
  return Object.values(controls).flat();
};

// const createControls = (player: Roland808Model) => {
//   const pads = Array.from({ length: 16 }).map((_, k) =>
//     player.toggleActiveInstrumentPad.prepend(() => k)
//   );

//   return {
//     pads,
//   };
// };

model.loadModel.doneData.watch((gltf) => {
  const controls = resolveControls(gltf.scene);
  const { hull, padsLights, aLight, bLight, ...intersectableControls } =
    controls;

  intersectionsManager.setIntersectable(gatherObjects(intersectableControls));

  ticker.tick.watch(() => intersectionsManager.render());
  bind({ player, controls });
});

const activeLightMaterial = new THREE.MeshBasicMaterial({ color: 0xff0000 });

const clickHandlersMap = new Map();

const onMouseClick = attach({
  source: intersectionsManager.activeElement as Store<
    THREE.Intersection<THREE.Object3D<THREE.Event>>
  >,
  effect: createEffect(
    (params: {
      activeElement: THREE.Intersection<THREE.Object3D<THREE.Event>>;
      event: MouseEvent;
    }) => {
      const handler = clickHandlersMap.get(params.activeElement.object);

      if (!handler) {
        return;
      }

      return handler(params.event);
    }
  ),
  mapParams: (event: MouseEvent, activeElement) => ({ event, activeElement }),
});

document.addEventListener("click", onMouseClick);

const bind = ({
  controls,
  player,
}: {
  player: Roland808Model;
  controls: ControlsObjects;
}) => {
  const { padClicked, padsHandlers } = createControls(controls.pads);
  const modeSelectorModel = createModeSelectorModel(controls.modeSelector);
  const BPMSelectorModel = createBPMSelectorModel(controls.bpmSelector);
  const ABMode = createABModeSelectorModel(controls.ABModeSelector);
  const instrumentSelectorModel = createInstrumentSelectorModel(
    controls.instrumentSelector
  );
  const lowTumblerModel = createTumblerModel(controls.lowTumbler);
  const midTumblerModel = createTumblerModel(controls.midTumbler);
  const hiTumblerModel = createTumblerModel(controls.hiTumbler);
  const rimShotTumblerModel = createTumblerModel(controls.rimShotTumbler);
  const clapTumblerModel = createTumblerModel(controls.clapTumbler);

  registerSteppedDragControl({
    object: controls.instrumentSelector,
    dictionary: instrumentsChain,
    handler: player.setInstrument,
    resolveCache: () =>
      instrumentsChain.indexOf(player.activeInstrument.getState()),
  });

  registerSteppedDragControl({
    object: controls.bpmSelector,
    dictionary: BPM,
    handler: player.setBPM,
    resolveCache: () => BPM.indexOf(player._meta.$bpm.getState()),
  });

  registerSteppedDragControl({
    object: controls.modeSelector,
    dictionary: playerModes,
    resolveCache: () => playerModes.indexOf(player.currentMode.getState()),
    handler: player.setCurrentMode,
    threshold: 50,
  });

  forward({ from: padClicked, to: player.toggleActiveInstrumentPad });
  forward({ from: player._meta.$abMode, to: ABMode.set });
  forward({
    from: player.activeInstrument,
    to: instrumentSelectorModel.setInstrument,
  });
  forward({ from: player._meta.$bpm, to: BPMSelectorModel.setBPM });
  forward({ from: player.currentMode, to: modeSelectorModel.setMode });
  forward({ from: player.lowTumbler.value, to: lowTumblerModel.set });
  forward({ from: player.midTumbler.value, to: midTumblerModel.set });
  forward({ from: player.hiTumbler.value, to: hiTumblerModel.set });
  forward({ from: player.clapTumbler.value, to: clapTumblerModel.set });
  forward({ from: player.rimShotTumbler.value, to: rimShotTumblerModel.set });

  modeSelectorModel.setMode(player.currentMode.getState());
  instrumentSelectorModel.setInstrument(player.activeInstrument.getState());
  BPMSelectorModel.setBPM(player._meta.$bpm.getState());
  lowTumblerModel.set(player.lowTumbler.value.getState());
  midTumblerModel.set(player.midTumbler.value.getState());
  hiTumblerModel.set(player.hiTumbler.value.getState());
  rimShotTumblerModel.set(player.rimShotTumbler.value.getState());
  clapTumblerModel.set(player.clapTumbler.value.getState());

  padsHandlers.map((handler, k) =>
    clickHandlersMap.set(controls.pads[k], handler)
  );
  clickHandlersMap.set(controls.startStopButton, player.togglePlay);
  clickHandlersMap.set(controls.ABModeSelector, player.cycleABModes);
  clickHandlersMap.set(controls.clearTrackButton, player.clearButtonPressed);
  clickHandlersMap.set(controls.tapButton, player.tapPressed);
  clickHandlersMap.set(controls.lowTumbler, player.lowTumbler.toggle);
  clickHandlersMap.set(controls.midTumbler, player.midTumbler.toggle);
  clickHandlersMap.set(controls.hiTumbler, player.hiTumbler.toggle);
  clickHandlersMap.set(controls.rimShotTumbler, player.rimShotTumbler.toggle);
  clickHandlersMap.set(controls.clapTumbler, player.clapTumbler.toggle);

  const lightsMaterialCache = controls.padsLights.map((obj) => obj.material);
  const abLightsMaterialCache = [
    controls.aLight.material,
    controls.bLight.material,
  ];

  player.activePadLights.watch((lights) =>
    lights.forEach((isActive, k) => {
      controls.padsLights[k].material = isActive
        ? activeLightMaterial
        : lightsMaterialCache[k];
    })
  );

  player._meta.$ab.watch((ab) => {
    if (ab === "a") {
      controls.aLight.material = activeLightMaterial;
      controls.bLight.material = abLightsMaterialCache[1];
    } else {
      controls.bLight.material = activeLightMaterial;
      controls.aLight.material = abLightsMaterialCache[0];
    }
  });
};

const registerSteppedDragControl = <
  C extends number,
  D extends T[] | Readonly<T[]>,
  T
>(config: {
  resolveCache: () => C;
  dictionary: D;
  handler: (data: T) => any;

  /**
   * The higher, the greater dragging distance is needed in order to change value
   */
  threshold?: number;
  object: THREE.Object3D;
}) => {
  let cache: C;
  dragManager.register({
    object: config.object,
    handlers: {
      onStart: () => {
        cache = config.resolveCache();
      },
      onDrag: (distance: number) => {
        const base = config.dictionary.length - 1;
        const threshold = config.threshold || 35;
        const newIdx = Math.round(base - cache - distance / threshold);

        const maxIdx = config.dictionary.length - 1;
        const resultIdx =
          base - (newIdx > maxIdx ? maxIdx : newIdx <= 0 ? 0 : newIdx);

        config.handler(config.dictionary[resultIdx]);
      },
      onEnd: () => {},
    },
  });
};
