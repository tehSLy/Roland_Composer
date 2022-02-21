import { attach, createEffect, createEvent, Effect } from "effector";
import { ControlsObjects } from ".";
import {
  ABMode,
  BPM,
  BPMStep,
  instrumentsChain,
  InstrumentsKeys,
  PlayerMode,
  playerModes,
} from "../shared/constants";

export const createControlsModel = () => {
  const lowTumblerModel = createTumblerModel();
  const midTumblerModel = createTumblerModel();
  const hiTumblerModel = createTumblerModel();
  const rimShotTumblerModel = createTumblerModel();
  const clapTumblerModel = createTumblerModel();
  const padControlsModel = createPadControlsModel();

  const abSelectorModel = createBindableModelFactory({
    handler: (object, angle: number) =>
      object.rotation.set(angle, object.rotation.y, object.rotation.z),
    model: (fx) => {
      const set = attach({
        effect: fx,
        mapParams: (ab: ABMode) => abMap[ab],
      });

      return {
        set,
      };
    },
  });

  const instrumentSelectorModel = createBindableModelFactory({
    handler: (object, instrument: InstrumentsKeys) => {
      const angle = instrumentMap[instrument];

      return object.rotation.set(
        0,
        angle === undefined ? instrumentMap.bassDrum : angle,
        0
      );
    },
    model: (fx) => ({
      setInstrument: fx,
    }),
  });

  const bpmSelectorModel = createBindableModelFactory({
    handler: (object, bpm: BPMStep) => {
      const angle = bpmMap[bpm];
      const rotation = object.rotation;

      return object.rotation.set(
        rotation.x,
        rotation.y,
        angle === undefined ? bpmMap[BPM[4]] : angle
      );
    },
    model: (fx) => ({ setBPM: fx }),
  });

  const modeSelectorModel = createBindableModelFactory({
    handler: (object, mode: PlayerMode) => {
      const angle = playerModesMap[mode];

      return object.rotation.set(
        0,
        angle === undefined ? playerModesMap.firstPart : angle,
        0
      );
    },
    model: (fx) => ({ setMode: fx }),
  });

  const bassDrumKnobsRowModel = createKnobsRowModel({
    knobsCount: 3,
    offset: [0, 0, -3.3],
  });

  const bind = (controls: ControlsObjects) => {
    lowTumblerModel.bind(controls.lowTumbler);
    midTumblerModel.bind(controls.midTumbler);
    hiTumblerModel.bind(controls.hiTumbler);
    clapTumblerModel.bind(controls.clapTumbler);
    rimShotTumblerModel.bind(controls.rimShotTumbler);
    modeSelectorModel.bind(controls.modeSelector);
    bpmSelectorModel.bind(controls.bpmSelector);
    instrumentSelectorModel.bind(controls.instrumentSelector);
    abSelectorModel.bind(controls.ABModeSelector);
    bassDrumKnobsRowModel.bind(controls.bassDrumRow);
  };

  return {
    model: {
      lowTumbler: lowTumblerModel.model,
      midTumbler: midTumblerModel.model,
      hiTumbler: hiTumblerModel.model,
      rimShotTumbler: rimShotTumblerModel.model,
      clapTumbler: clapTumblerModel.model,
      padControls: padControlsModel,
      abSelector: abSelectorModel.model,
      instrumentSelector: instrumentSelectorModel.model,
      bpmSelector: bpmSelectorModel.model,
      modeSelector: modeSelectorModel.model,
      bassDrumKnobs: bassDrumKnobsRowModel.models,
    },
    bind,
  };
};

export type ControlsModel = ReturnType<typeof createControlsModel>;

const createBindableModelFactory = <
  R,
  P,
  T extends THREE.Object3D | THREE.Object3D[] = THREE.Object3D
>(config: {
  model(handler: Effect<P, any, Error>): R;
  handler(obj: T, params: P): void;
}) => {
  let obj: T;
  const fx = createEffect((params: P) => config.handler(obj, params));
  const model = config.model(fx);

  return {
    bind: (v: T) => (obj = v),
    model,
  };
};

const resolveMap = <T extends string | number>({
  start,
  step,
  dictionary,
  inverseAngle = false,
}: {
  start: number;
  step: number;
  dictionary: T[] | readonly T[];
  inverseAngle?: boolean;
}) =>
  Object.fromEntries(
    dictionary.map((v, k) => [v, start - step * k * (inverseAngle ? -1 : 1)])
  ) as Record<T, number>;

const resolveAngleStep = (params: {
  from: number;
  to: number;
  steps: number;
}) => {
  return (params.from - params.to) / (params.steps - 1);
};

const createMap = <T extends string | number>(config: {
  from: number;
  to: number;
  dictionary: T[] | readonly T[];
  inverseAngle?: boolean;
}) =>
  resolveMap({
    start: config.from,
    dictionary: config.dictionary,
    step: resolveAngleStep({
      from: config.from,
      to: config.to,
      steps: config.dictionary.length,
    }),
  });

const instrumentMap = createMap({
  from: 4.6,
  to: -0.55,
  dictionary: instrumentsChain,
});

const abMap = {
  a: -0.55,
  ab: 0.05,
  b: 0.65,
};

const bpmMap = createMap({
  from: -3.05,
  to: 2.2,
  dictionary: BPM,
});

const playerModesMap = createMap({
  dictionary: playerModes,
  from: 1.15,
  to: -1.75,
});

const tumblerPositionsMap = {
  [true as any]: 42.46,
  [false as any]: 38.96,
};

export const createTumblerModel = () =>
  createBindableModelFactory({
    handler: (object, isOn: boolean) =>
      object.position.setX(tumblerPositionsMap[isOn as any]),
    model: (fx) => ({ set: fx }),
  });

export const createPadControlsModel = () => {
  const padClicked = createEvent<number>();
  const padsHandlers = Array.from({ length: 16 }).map((_, k) =>
    padClicked.prepend(() => k)
  );

  return {
    padsHandlers,
    padClicked,
  };
};

export const createKnobsRowModel = <C extends 1 | 2 | 3>(config: {
  knobsCount: C;
  offset: [number, number, number];
}) => {
  const models = Array.from({ length: config.knobsCount }).map((_, k) =>
    createKnobModel({ offset: config.offset[k] })
  );

  return {
    bind: <T extends THREE.Object3D[] | readonly THREE.Object3D[]>(
      objects: T
    ) => models.forEach((model, k) => model.bind(objects[k])),
    models: models.map(({ model }) => model),
  };
};

export const createKnobModel = (config: { offset: number }) =>
  createBindableModelFactory({
    handler: (object, level: number) => {
      const min = 4.1;
      const max = -1;
      const multiplier = resolveAngleStep({ from: min, to: max, steps: 100 });

      object.rotation.set(0, min - multiplier * level + config.offset, 0);
    },
    model: (fx) => ({
      set: fx,
    }),
  });
