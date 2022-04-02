import { combine, createEffect, createEvent, forward } from "effector";
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
import { createScene } from "../Scene";
import { keymapping } from "../shared";

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
  };
};

const gatherObjects = (controls: Record<string, any>) => {
  return Object.values(controls).flat();
};

export type AppModel = ReturnType<typeof createAppModel>;
