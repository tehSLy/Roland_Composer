import { Effect, Event, forward, Store } from "effector";
import { Mesh } from "three";
import { ControlsObjects } from ".";
import { DeviceModel } from "../model/createPlayerModel";
import { InstrumentsSet } from "../model/instruments";
import { activeLightMaterial } from "../shared/ActiveLightMaterial";
import { instrumentsChain, playerModes } from "../shared/constants";
import { ClickManager } from "./createClickManager";
import {
  ControlsModel,
  KnobsRowModel,
  TumblerModel,
} from "./createControlsModel";
import { DragManager } from "./createDragManager";

export const bindPlayerToControls = ({
  controls,
  player,
  controlsModel,
  clickManager,
  dragManager,
}: {
  player: DeviceModel;
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

  dragManager.registerRangeDragControl({
    range: [65, 215],
    object: controls.bpmSelector,
    handler: player.setBPM.prepend((bpm) => bpm),
    resolveCache: () => player._meta.$bpm.getState(),
  });

  dragManager.registerSteppedDragControl({
    object: controls.modeSelector,
    dictionary: playerModes,
    resolveCache: () => playerModes.indexOf(player.currentMode.getState()),
    handler: player.setCurrentMode,
    threshold: 50,
  });

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

  bindInstrument({
    clickManager,
    dragManager,
    instrument: player.instruments.bassDrum,
    knobsRow: controls.bassDrumRow,
    knobsRowModel: controlsModel.model.bassDrumKnobs,
  });
  bindInstrument({
    clickManager,
    dragManager,
    instrument: player.instruments.snareDrum,
    knobsRow: controls.snareDrumRow,
    knobsRowModel: controlsModel.model.snareDrumsKnobs,
  });
  bindInstrument({
    clickManager,
    dragManager,
    instrument: player.instruments.lowTom,
    knobsRow: controls.lowTomRow,
    knobsRowModel: controlsModel.model.lowTomKnobs,
    tumbler: {
      model: controlsModel.model.lowTumbler,
      object: controls.lowTumbler,
    },
  });
  bindInstrument({
    clickManager,
    dragManager,
    instrument: player.instruments.midTom,
    knobsRow: controls.midTomRow,
    knobsRowModel: controlsModel.model.midTomKnobs,
    tumbler: {
      model: controlsModel.model.midTumbler,
      object: controls.midTumbler,
    },
  });
  bindInstrument({
    clickManager,
    dragManager,
    instrument: player.instruments.hiTom,
    knobsRow: controls.hiTomRow,
    knobsRowModel: controlsModel.model.hiTomKnobs,
    tumbler: {
      model: controlsModel.model.hiTumbler,
      object: controls.hiTumbler,
    },
  });
  bindInstrument({
    clickManager,
    dragManager,
    instrument: player.instruments.rimShot,
    knobsRow: controls.rimShotRow,
    knobsRowModel: controlsModel.model.rimShotKnobs,
    tumbler: {
      model: controlsModel.model.rimShotTumbler,
      object: controls.rimShotTumbler,
    },
  });
  bindInstrument({
    clickManager,
    dragManager,
    instrument: player.instruments.handClap,
    knobsRow: controls.clapRow,
    knobsRowModel: controlsModel.model.clapKnobs,
    tumbler: {
      model: controlsModel.model.clapTumbler,
      object: controls.clapTumbler,
    },
  });
  bindInstrument({
    clickManager,
    dragManager,
    instrument: player.instruments.cowBell,
    knobsRow: controls.cowbellRow,
    knobsRowModel: controlsModel.model.cowbellKnobs,
  });
  bindInstrument({
    clickManager,
    dragManager,
    instrument: player.instruments.cymbal,
    knobsRow: controls.cymbalRow,
    knobsRowModel: controlsModel.model.cymbalKnobs,
  });
  bindInstrument({
    clickManager,
    dragManager,
    instrument: player.instruments.openHihat,
    knobsRow: controls.openHihatRow,
    knobsRowModel: controlsModel.model.openHihatKnobs,
  });
  bindInstrument({
    clickManager,
    dragManager,
    instrument: player.instruments.closedHat,
    knobsRow: controls.closedHihatRow,
    knobsRowModel: controlsModel.model.closedHihatKnobs,
  });

  forward({
    from: controlsModel.model.padControls.padClicked,
    to: player.toggleActiveInstrumentPad,
  });

  controlsModel.model.padControls.padsHandlers.map((handler, k) =>
    clickManager.register(controls.pads[k], handler),
  );

  clickManager.register(controls.startStopButton, player.togglePlay);
  clickManager.register(controls.ABModeSelector, player.cycleABModes);
  clickManager.register(controls.clearTrackButton, player.clearButtonPressed);
  clickManager.register(controls.tapButton, player.tapPressed);

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
    }),
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

const bindInstrument = ({
  dragManager,
  instrument,
  knobsRow,
  tumbler,
  knobsRowModel,
  clickManager,
}: {
  instrument: InstrumentsSet[keyof InstrumentsSet];
  knobsRow: Mesh[];
  knobsRowModel: KnobsRowModel["models"];
  tumbler?: {
    object: Mesh;
    model: TumblerModel["model"];
  };
  dragManager: DragManager;
  clickManager: ClickManager;
}) => {
  dragManager.registerRangeDragControl({
    object: knobsRow[0],
    handler: instrument.setVolume,
    range: [0, 100],
    resolveCache: () => instrument.volume.getState(),
    threshold: 10,
  });

  bindStoreToControlModel({
    source: instrument.volume,
    target: knobsRowModel[0].set,
  });

  for (let i = 0; i < instrument._meta.additionalKnobsCount; i++) {
    dragManager.registerSteppedDragControl({
      object: knobsRow[i + 1],
      handler: (level: number) => instrument.setKnob({ id: i, level }),
      resolveCache: () => instrument.knobs.getState()[i],
      dictionary: [0, 1, 2, 3, 4],
    });

    bindStoreToControlModel({
      source: instrument.knobs.map((knobs) => knobs[i]),
      target: knobsRowModel[i + 1].set,
    });
  }

  if (tumbler) {
    clickManager.register(tumbler.object, instrument.togglePrefix);
    bindStoreToControlModel({
      source: instrument.isMainInstrumentToggled,
      target: tumbler.model.set,
    });
  }
};
