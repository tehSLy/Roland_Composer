import { Effect, Event, forward, Store } from "effector";
import { ControlsObjects } from ".";
import { Roland808Model } from "../model/createPlayerModel";
import { activeLightMaterial } from "../shared/ActiveLightMaterial";
import { BPM, instrumentsChain, playerModes } from "../shared/constants";
import { ClickManager } from "./createClickManager";
import { ControlsModel } from "./createControlsModel";
import { DragManager } from "./createDragManager";

export const bindPlayerToControls = ({
  controls,
  player,
  controlsModel,
  clickManager,
  dragManager,
}: {
  player: Roland808Model;
  controls: ControlsObjects;
  controlsModel: ControlsModel;
  clickManager: ClickManager;
  dragManager: DragManager;
}) => {
  controlsModel.bind(controls);

  dragManager.registerSteppedDragControl({
    object: controls.instrumentSelector,
    dictionary: instrumentsChain,
    handler: player.setInstrument,
    resolveCache: () =>
      instrumentsChain.indexOf(player.activeInstrument.getState()),
  });

  dragManager.registerSteppedDragControl({
    object: controls.bpmSelector,
    dictionary: BPM,
    handler: player.setBPM,
    resolveCache: () => BPM.indexOf(player._meta.$bpm.getState()),
  });

  dragManager.registerSteppedDragControl({
    object: controls.modeSelector,
    dictionary: playerModes,
    resolveCache: () => playerModes.indexOf(player.currentMode.getState()),
    handler: player.setCurrentMode,
    threshold: 50,
  });
 
  dragManager.registerRangeDragControl({
    object: controls.bassDrumRow[0],
    handler: player.nodesModels.bassDrumRowNodesModel[0].setLevel,
    range: [0, 100],
    resolveCache: () => player.nodesModels.bassDrumRowNodesModel[0].level.getState(),
    threshold: 10
  });

  dragManager.registerRangeDragControl({
    object: controls.bassDrumRow[1],
    handler: player.nodesModels.bassDrumRowNodesModel[1].setLevel,
    range: [0, 100],
    resolveCache: () => player.nodesModels.bassDrumRowNodesModel[1].level.getState(),
    threshold: 10
  })

  console.log(controls.bassDrumRow[0]);
  


  bindStoreToControlModel({
    source: player._meta.$abMode,
    target: controlsModel.model.abSelector.set,
  });

  bindStoreToControlModel({
    source: player.activeInstrument,
    target: controlsModel.model.instrumentSelector.setInstrument,
  });

  bindStoreToControlModel({
    source: player._meta.$bpm,
    target: controlsModel.model.bpmSelector.setBPM,
  });

  bindStoreToControlModel({
    source: player.currentMode,
    target: controlsModel.model.modeSelector.setMode,
  });

  bindStoreToControlModel({
    source: player.lowTumbler.value,
    target: controlsModel.model.lowTumbler.set,
  });

  bindStoreToControlModel({
    source: player.midTumbler.value,
    target: controlsModel.model.midTumbler.set,
  });

  bindStoreToControlModel({
    source: player.hiTumbler.value,
    target: controlsModel.model.hiTumbler.set,
  });

  bindStoreToControlModel({
    source: player.clapTumbler.value,
    target: controlsModel.model.clapTumbler.set,
  });

  bindStoreToControlModel({
    source: player.rimShotTumbler.value,
    target: controlsModel.model.rimShotTumbler.set,
  });

  bindStoreToControlModel({
    source: player.nodesModels.bassDrumRowNodesModel[0].level,
    target: controlsModel.model.bassDrumKnobs[0].set
  })

  forward({
    from: controlsModel.model.padControls.padClicked,
    to: player.toggleActiveInstrumentPad,
  });

  controlsModel.model.padControls.padsHandlers.map((handler, k) =>
    clickManager.register(controls.pads[k], handler)
  );

  clickManager.register(controls.startStopButton, player.togglePlay);
  clickManager.register(controls.ABModeSelector, player.cycleABModes);
  clickManager.register(controls.clearTrackButton, player.clearButtonPressed);
  clickManager.register(controls.tapButton, player.tapPressed);
  clickManager.register(controls.lowTumbler, player.lowTumbler.toggle);
  clickManager.register(controls.midTumbler, player.midTumbler.toggle);
  clickManager.register(controls.hiTumbler, player.hiTumbler.toggle);
  clickManager.register(controls.rimShotTumbler, player.rimShotTumbler.toggle);
  clickManager.register(controls.clapTumbler, player.clapTumbler.toggle);

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

const bindStoreToControlModel = <T>(config: {
  source: Store<T>;
  target: Event<T> | Effect<T, any, any>;
}) => {
  forward({ from: config.source, to: config.target });
  config.target(config.source.getState());
};
