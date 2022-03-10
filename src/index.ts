import { forward } from "effector";
import {
  createIntersectionsManager,
  resolveControls,
} from "./features/Player/3DModel";
import { bindPlayerToControls } from "./features/Player/3DModel/bindPlayerToControls";
import { createClickManager } from "./features/Player/3DModel/createClickManager";
import { createControlsModel } from "./features/Player/3DModel/createControlsModel";
import {
  createDragManager,
  disableCameraControlsUponDrag,
} from "./features/Player/3DModel/createDragManager";
import { createObjectHighlightManager } from "./features/Player/3DModel/createObjectHighlightManager";
import { createRoland3DModel } from "./features/Player/3DModel/Roland808";
import { createRoland808Model } from "./features/Player/model";
import { createKeyPressManager } from "./features/Player/model/createKeyPressManager";
import { createScene } from "./features/Scene/Scene";
import { appInit } from "./model";

const { scene, camera, ticker, cameraControls } = createScene();

const model = createRoland3DModel();
const intersectionsManager = createIntersectionsManager({ camera });
const dragManager = createDragManager({ intersectionsManager });
const clickManager = createClickManager({ intersectionsManager });
const controlsModel = createControlsModel();
const highlightManager = createObjectHighlightManager({
  intersectionsManager,
  dragManager,
});
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

const padsMapping = Object.fromEntries(
  Array.from({ length: 9 }).map((_, v) => [`Digit${v + 1}`, `pad${v + 1}`])
);

createKeyPressManager({
  keyMap: {
    Space: "startStop",
    KeyV: "toggleGui",
    ...padsMapping,
    Digit0: "pad10",
    Minus: "pad11",
    Equal: "pad12",
    "Shift+Digit1": "pad13",
    "Shift+Digit2": "pad14",
    "Shift+Digit3": "pad15",
    "Shift+Digit4": "pad16",
    KeyI: "modeInstrument",
    KeyC: "clear",
    KeyM: "modeMute",
    KeyL: "modeVolume",
    ArrowUp: "increase",
    ArrowDown: "decrease",
    Enter: "tap",
    KeyA: "cycleAb"
  },
  player,
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

model.loadModel.doneData.watch((gltf) => {
  const controls = resolveControls(gltf.scene);
  const { hull, padsLights, aLight, bLight, ...intersectableControls } =
    controls;
  // console.log(controls);

  intersectionsManager.setIntersectable(gatherObjects(intersectableControls));
  ticker.tick.watch(() => {
    intersectionsManager.render();
  });

  bindPlayerToControls({
    player,
    controls,
    clickManager,
    controlsModel,
    dragManager,
  });
});
