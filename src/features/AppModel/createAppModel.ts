import { combine, createEffect, createEvent, forward, sample } from "effector";
import {
  bindPlayerToControls,
  createClickManager,
  createControlsModel,
  createDragManager,
  createIntersectionsManager,
  createKeyPressManager,
  createObjectHighlightManager,
  createRoland3DModel,
  createRoland808Model,
  disableCameraControlsUponDrag,
  resolveControls,
} from "../Player";
import { ComposerSnapshot } from "../Player/model/createPlayerModel";
import { createScene } from "../Scene";
import { keymapping } from "../shared";
import { createUIModel } from "./createUIModel";

export const createAppModel = () => {
  const init = createEvent();
  const sceneModel = createScene();

  const model = createRoland3DModel();
  const intersectionsManager = createIntersectionsManager({
    camera: sceneModel.camera,
  });
  const dragManager = createDragManager({ intersectionsManager });
  const clickManager = createClickManager({ intersectionsManager });
  const controlsModel = createControlsModel();
  const highlightManager = createObjectHighlightManager({
    intersectionsManager,
    dragManager,
  });
  const player = createRoland808Model({});
  const $isLoadingAssets = combine(
    model.isLoaded,
    player.isLoaded,
    (...assets) => assets.some((v) => !v)
  );

  const uiModel = createUIModel();

  const fxExport = createEffect(async (_: void) => {
    const snapshot = await player.snapshot.make();
    const blob = new Blob([JSON.stringify(snapshot)], {
      type: "application/json",
    });
    const pickerOptions = {
      suggestedName: `Untitled.json`,
      types: [
        {
          description: "JSON File",
          accept: {
            "application/json": [".json", ".txt"],
          },
        },
      ],
    };

    // @ts-ignore
    const fileHandle = await window.showSaveFilePicker(pickerOptions);
    const writableFileStream = await fileHandle.createWritable();
    await writableFileStream.write(blob);
    await writableFileStream.close();
  });

  const fxImport = createEffect(async () => {
    const pickerOptions = {
      types: [
        {
          description: "JSON File",
          accept: {
            "application/json": [".json", ".txt"],
          },
        },
      ],
    };
    // @ts-ignore
    const [fileHandle] = await window.showOpenFilePicker(pickerOptions);
    const file = await fileHandle.getFile();
    return file.text().then(JSON.parse) as Promise<ComposerSnapshot>;
  });

  sample({
    clock: fxImport.doneData,
    target: player.snapshot.load,
  });

  createKeyPressManager({
    keyMap: keymapping,
    player,
  });

  disableCameraControlsUponDrag({
    dragManager,
    cameraControls: sceneModel.cameraControls,
  });

  forward({
    from: init,
    to: [
      model.loadModel,
      sceneModel.ticker.start,
      dragManager.addEventListeners,
    ],
  });

  const fxResolveControls = createEffect(resolveControls);
  const fxBindPlayerToControls = createEffect(bindPlayerToControls);

  forward({
    from: fxResolveControls.doneData,
    to: [
      intersectionsManager.setIntersectable.prepend(
        ({ hull, padsLights, aLight, bLight, ...intersectableControls }) =>
          gatherObjects(intersectableControls)
      ),
      fxBindPlayerToControls.prepend((controls) => ({
        controls,
        clickManager,
        controlsModel,
        dragManager,
        player,
      })),
    ],
  });

  forward({
    from: model.loadModel.doneData.map((gltf) => gltf.scene),
    to: [fxResolveControls, sceneModel.add],
  });
  forward({ from: sceneModel.ticker.tick, to: intersectionsManager.render });

  return {
    deviceModel: player,
    intersectionsManager,
    dragManager,
    clickManager,
    controlsModel,
    init,
    isLoading: $isLoadingAssets,
    sceneModel,
    uiModel,
    export: fxExport,
    import: fxImport,
  };
};

const gatherObjects = (controls: Record<string, any>) => {
  return Object.values(controls).flat();
};

export type AppModel = ReturnType<typeof createAppModel>;
