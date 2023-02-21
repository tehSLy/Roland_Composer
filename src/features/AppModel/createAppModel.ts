import {
  attach,
  combine,
  createEffect,
  createEvent,
  createStore,
  forward,
  sample,
} from "effector";
import { persist } from "effector-storage/local";
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

const defaultName = "Untitled";

export const createAppModel = () => {
  const $projectName = createStore(defaultName);
  const init = createEvent();
  const sceneModel = createScene();

  const model = createRoland3DModel();
  const intersectionsManager = createIntersectionsManager({
    camera: sceneModel.camera,
    canvasElement: sceneModel.renderer.domElement,
  });
  const dragManager = createDragManager({ intersectionsManager });
  const clickManager = createClickManager({ intersectionsManager });
  const controlsModel = createControlsModel();
  const highlightManager = createObjectHighlightManager({
    intersectionsManager,
    dragManager,
  });
  const composer = createRoland808Model({});
  const $isLoadingAssets = combine(
    model.isLoaded,
    composer.isLoaded,
    (...assets) => assets.some((v) => !v),
  );

  const fxShare = attach({
    source: { snapshot: composer.snapshot.state, name: $projectName },
    effect({ name, snapshot }) {
      const encodedSnapshot = encodeURIComponent(
        btoa(JSON.stringify(snapshot)),
      );
      navigator.share({
        url: `${location.origin}?snapshot=${encodedSnapshot}`,
        title: `My Roland TR-808 Composition: ${name}`,
      });
    },
  });

  const fxParseSnapshotFromUrl = createEffect(() => {
    const search = new URLSearchParams(location.search);
    const snapshot = search.get("snapshot");

    if (!snapshot) {
      return;
    }
    console.log(atob(decodeURIComponent(snapshot)));

    return JSON.parse(atob(decodeURIComponent(snapshot)));
  });

  const uiModel = createUIModel();

  const fxExport = createEffect(async (_: void) => {
    const snapshot = await composer.snapshot.make();
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

  const fxResolveProjectName = createEffect((filename: string) => {
    try {
      return filenameRegexp.exec(filename)?.[1] ?? defaultName;
    } catch (error) {
      return defaultName;
    }
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
    const name = await fxResolveProjectName(file.name);

    return {
      snapshot: (await file.text().then(JSON.parse)) as ComposerSnapshot,
      name,
    };
  });

  const $savedProjects = createStore<Record<string, ComposerSnapshot>>({});
  const fxLoad = attach({
    source: $savedProjects,
    effect(projects, name: string) {
      const project = projects[name];
      if (!project) {
        throw new Error("Project not found");
      }
      return project;
    },
  });
  const fxSave = attach({
    source: composer.snapshot.state,
    effect(state, filename: string) {
      if (!filename.trim()) {
        throw new Error("filename can't be empty");
      }

      return { snapshot: state, filename };
    },
  });

  const fxDelete = attach({
    source: $savedProjects,
    effect: (projects, name: string) => {
      if (!name) {
        throw new Error("");
      }

      if (!projects[name]) {
        throw new Error("");
      }

      return name;
    },
  });
  $savedProjects
    .on(fxSave.doneData, (state, { filename, snapshot }) => ({
      ...state,
      [filename]: snapshot,
    }))
    .on(
      fxDelete.doneData,
      (state, name) => (
        delete state[name],
        {
          ...state,
        }
      ),
    );

  persist({ store: $savedProjects, key: "savedProjects" });

  sample({
    clock: [fxImport.doneData.map(({ snapshot }) => snapshot), fxLoad.doneData],
    target: composer.snapshot.load,
  });
  sample({
    clock: fxImport.doneData.map(({ name }) => name),
    target: $projectName,
  });
  sample({
    clock: fxParseSnapshotFromUrl.doneData,
    target: composer.snapshot.load,
  });

  createKeyPressManager({
    keyMap: keymapping,
    player: composer,
    suppressed: uiModel.isModalOpened,
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
      fxParseSnapshotFromUrl,
    ],
  });

  const fxResolveControls = createEffect(resolveControls);
  const fxBindPlayerToControls = createEffect(bindPlayerToControls);

  forward({
    from: fxResolveControls.doneData,
    to: [
      intersectionsManager.setIntersectable.prepend(
        ({ hull, padsLights, aLight, bLight, ...intersectableControls }) =>
          gatherObjects(intersectableControls),
      ),
      fxBindPlayerToControls.prepend((controls) => ({
        controls,
        clickManager,
        controlsModel,
        dragManager,
        player: composer,
      })),
    ],
  });

  forward({
    from: model.loadModel.doneData.map((gltf) => gltf.scene),
    to: [fxResolveControls, sceneModel.add],
  });
  forward({ from: sceneModel.ticker.tick, to: intersectionsManager.render });

  return {
    deviceModel: composer,
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
    share: fxShare,
    projectName: $projectName,
    savedProjects: {
      list: $savedProjects,
      save: fxSave,
      load: fxLoad,
      delete: fxDelete,
    },
  };
};

const filenameRegexp = /(.+)\.(?:.*)/;

const gatherObjects = (controls: Record<string, any>) => {
  return Object.values(controls).flat();
};

export type AppModel = ReturnType<typeof createAppModel>;
