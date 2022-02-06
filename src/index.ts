import { attach, createEffect, forward, split, Store } from "effector";
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
  createInstrumentSelectorModel,
  createModeSelectorModel,
  createTumblerModel,
} from "./features/Player/3DModel/resolveControls";
import { createRoland3DModel } from "./features/Player/3DModel/Roland808";
import { createRoland808Model } from "./features/Player/model";
import { Roland808Model } from "./features/Player/model/createPlayerModel";
import {
  BPM,
  BPMStep,
  instrumentsChain,
  playerModes,
} from "./features/Player/shared/constants";
import { createScene } from "./features/Scene/Scene";
import { appInit } from "./model";


const { scene, camera, ticker, cameraControls } = createScene();

const model = createRoland3DModel();
const intersectionsManager = createIntersectionsManager({ camera });
const dragManager = createDragManager({ intersectionsManager });
const clickManager = createClickManager({intersectionsManager});
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

const createControls = (player: Roland808Model) => {
  const pads = Array.from({ length: 16 }).map((_, k) =>
    player.toggleActiveInstrumentPad.prepend(() => k)
  );

  return {
    pads,
  };
};

const playerControls = createControls(player);

model.loadModel.doneData.watch((gltf) => {
  const controls = resolveControls(gltf.scene);
  const { hull, padsLights, aLight, bLight, ...intersectableControls } =
    controls;

  intersectionsManager.setIntersectable(gatherObjects(intersectableControls));

  ticker.tick.watch(() => intersectionsManager.render());
  bind({ player, controls });
});

// player._meta.$dataset.watch(console.log);
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
  const lightsMaterialCache = controls.padsLights.map((obj) => obj.material);
  const abLightsMaterialCache = [
    controls.aLight.material,
    controls.bLight.material,
  ];
  playerControls.pads.map((handler, k) =>
    clickHandlersMap.set(controls.pads[k], handler)
  );

  clickHandlersMap.set(controls.startStopButton, player.toggle);

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

  const modeSelectorModel = createModeSelectorModel(controls.modeSelector);
  const BPMSelectorModel = createBPMSelectorModel(controls.bpmSelector);
  const ABMode = createABModeSelectorModel(controls.ABModeSelector);
  const instrumentSelectorModel = createInstrumentSelectorModel(
    controls.instrumentSelector
  );

  clickHandlersMap.set(controls.ABModeSelector, player.cycleABModes);
  forward({from: player._meta.$abMode, to: ABMode.set});

  instrumentSelectorModel.setInstrument(player.activeInstrument.getState());
  forward({
    from: player.activeInstrument,
    to: instrumentSelectorModel.setInstrument,
  });

  registerSteppedDragControl({
    object: controls.instrumentSelector,
    dictionary: instrumentsChain,
    handler: player.setInstrument,
    resolveCache: () => instrumentsChain.indexOf(player.activeInstrument.getState())
  })


  registerSteppedDragControl({
    object: controls.bpmSelector,
    dictionary: BPM,
    handler: BPMSelectorModel.setBPM,
    resolveCache: () => BPM.indexOf(player._meta.$bpm.getState()),
  })
  forward({ from: player._meta.$bpm, to: BPMSelectorModel.setBPM });
  BPMSelectorModel.setBPM(player._meta.$bpm.getState());


  registerSteppedDragControl({
    object: controls.modeSelector,
    dictionary: playerModes,
    resolveCache: () => playerModes.indexOf(player.currentMode.getState()),
    handler: player.setCurrentMode,
    threshold: 50
  })
  forward({ from: player.currentMode, to: modeSelectorModel.setMode });
  modeSelectorModel.setMode(player.currentMode.getState());

  clickHandlersMap.set(controls.clearTrackButton, player.clearButtonPressed);
  clickHandlersMap.set(controls.tapButton, player.tapPressed);
  clickHandlersMap.set(controls.lowTumbler, player.lowTumbler.toggle);

  const lowTumblerModel = createTumblerModel(controls.lowTumbler);
  lowTumblerModel.set(player.lowTumbler.value.getState());

  forward({ from: player.lowTumbler.value, to: lowTumblerModel.set });
};

const registerSteppedDragControl = <C extends number, D extends (T[] | Readonly<T[]>), T>(config: {
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
