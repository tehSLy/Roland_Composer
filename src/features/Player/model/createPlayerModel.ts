import {
  attach,
  combine,
  createEffect,
  createEvent,
  createStore,
  forward,
  guard,
  sample,
  Store,
} from "effector";
import { clamp } from "lodash";
import * as Tone from "tone";
import { NoInfer } from "../../../../types/utils";
import { createTicker } from "../../../lib/createTicker";
import { createToggle } from "../../../lib/createToggle";
import {
  AB,
  ABMode,
  BPMStep,
  instrumentsChain,
  InstrumentsKeys,
  PlayerMode,
  playerModes,
} from "../shared/constants";
import { createInstrumentsSet } from "./instruments/createInstrumentsSet";

export type InstrumentDataset = {
  a?: number[];
  b?: number[];
};

// const defaultBPM = BPM[4];

export type InstrumentsSetDataset = Record<InstrumentsKeys, InstrumentDataset>;

export type PatternInstrumentDataset = Record<InstrumentsKeys, number[]>;

export type PatternPart = {
  1?: PatternInstrumentDataset;
  2?: PatternInstrumentDataset;
};

export type BasicVariation = {
  a?: PatternPart;
  b?: PatternPart;
};

export type Patterns = Record<number, BasicVariation>;

export type Composition = {
  patterns: Patterns;
  composed: number[];
};

export type DeviceModel = ReturnType<typeof createRoland808Model>;
export const createRoland808Model = (config?: {
  dataset?: Partial<InstrumentsSetDataset>;
  bpm?: BPMStep;
}) => {
  const $currentPattern = createStore(1);
  const $currentPart = createStore<1 | 2>(1);

  const $audioLoaded = createStore(false);

  const muteCache: Partial<Record<InstrumentsKeys, number>> = {};

  const bpmKnob = createRangedKnobModel({
    range: [65, 215],
    initial: 120,
    defaultStep: 4,
  });

  const setBPM = bpmKnob.setPosition;
  const tone = createToneInstance();
  const initialize = createEffect(() => null);

  const modeKnob = createSteppedKnobModel({
    dictionary: playerModes,
    initial: playerModes[1],
  });

  /**
   * @deprecated
   */
  const setCurrentMode = modeKnob.setPosition;

  /**
   * @deprecated
   */
  const $currentMode = modeKnob.position;

  const clearButtonPressed = createEvent();
  const clearTrack = createEvent();
  const clearPattern = createEvent();

  const tapPressed = createEvent();

  /**
   * @deprecated
   */
  const $bpm = bpmKnob.position;
  /**
   * @deprecated
   */
  const cycleBPM = bpmKnob.increase;

  const { instruments, instrumentsLoaded } = createInstrumentsSet();
  const dataset = createComposition({ instruments, initial: config?.dataset });
  const instrumentKnob = createSteppedKnobModel({
    dictionary: instrumentsChain,
    initial: "bassDrum",
  });

  /**
   * @deprecated
   */
  const cycleInstrument = instrumentKnob.setNext;
  /**
   * @deprecated
   */
  const setInstrument = instrumentKnob.setPosition;
  /**
   * @deprecated
   */
  const $instrument = instrumentKnob.position;

  const $abMode = createStore<ABMode>("a");
  const $ab = createStore<AB>("a");
  const $composition = createStore(dataset);
  const $note = createStore(0);

  const lowTumbler = createToggle({ initial: false });
  const midTumbler = createToggle({ initial: false });
  const hiTumbler = createToggle({ initial: false });
  const rimShotTumbler = createToggle({ initial: false });
  const clapTumbler = createToggle({ initial: false });

  const stop = createEffect(() => null);
  const start = createEffect(async () => {
    await Tone.start();
  });
  const $isRunning = createStore(false)
    .on(start, () => true)
    .on(stop, () => false);

  const mute = createEffect((key: InstrumentsKeys) => {
    //@ts-expect-error
    const currentVolume = instruments[key].volume.getState();
    if (currentVolume) {
      muteCache[key] = currentVolume;
      //@ts-expect-error
      return instruments[key].setVolume(0);
    }
    //@ts-expect-error
    return instruments[key].setVolume(muteCache[key] || 50);
  });

  const $activeInstrumentPads = combine(
    $composition,
    $instrument,
    $ab,
    $currentPart,
    $currentPattern,
    (composition, instrument, ab, part, pattern) => {
      console.log(composition);
      const seq = composition.patterns[pattern][ab]?.[part]?.[instrument];
      return seq || Array.from({ length: 16 }).map((_, k) => 0);
      // composition[instrument]?.[ab] || Array.from({ length: 16 }).map((_, k) => k)
    }
  );

  const $activePadLights = combine(
    $activeInstrumentPads,
    $note,
    $isRunning,
    (activePads, note, isRunning) => {
      const copy = [...activePads];
      if (isRunning) {
        copy[note] = copy[note] ? 0 : 1;
      }
      return copy;
    }
  );

  const cycleABModes = createEvent();

  const togglePlay = createEvent();

  guard(sample($isRunning, togglePlay), {
    filter: Boolean,
    target: stop,
  });

  guard(sample($isRunning, togglePlay), {
    filter: (v) => !v,
    target: start,
  });

  const setABMode = createEvent<ABMode>();
  const toggleAB = createEvent();

  const toggleActiveInstrumentPad = createEvent<number>();

  const $substitutedInstruments = combine({
    lowTom: lowTumbler.value,
    midTom: midTumbler.value,
    hiTom: hiTumbler.value,
    handClap: clapTumbler.value,
    rimShot: rimShotTumbler.value,
  } as Partial<Record<InstrumentsKeys, Store<boolean>>>);

  const generator = createTicker({
    delay: $bpm.map((bpm) => ((60 / bpm) * 1000) / 4),
  });

  const fxPlay = attach({
    source: {
      ab: $ab,
      composition: $composition,
      note: $note,
      part: $currentPart,
      pattern: $currentPattern,
      substitutedInstruments: $substitutedInstruments,
    },
    effect: createEffect(
      (params: {
        composition: Composition;
        ab: AB;
        note: number;
        pattern: number;
        part: 1 | 2;
        substitutedInstruments: Partial<Record<InstrumentsKeys, boolean>>;
      }) => {
        const sequence =
          params.composition.patterns[params.pattern][params.ab]?.[params.part];
        if (!sequence) {
          console.warn("No seq ");
        }
        for (const key in sequence) {
          const k = key as keyof typeof sequence;
          const shouldPlay = sequence[k][params.note];
          if (shouldPlay) {
            //@ts-expect-error
            instruments[k].play();
          }
        }
      }
    ),
    mapParams: (_, source) => ({ ...source }),
  });

  const abToggled = guard(
    guard($note.updates, { filter: (note) => note === 0 }),
    {
      filter: combine($abMode, $ab, (mode, ab) =>
        mode === "ab" ? true : mode !== ab
      ),
    }
  );

  forward({ from: abToggled, to: toggleAB });

  forward({
    from: initialize,
    to: [tone.initialize, start],
  });

  $note.on(fxPlay.done, (note) => {
    return note === 15 ? 0 : note + 1;
  });

  $instrument.on(cycleInstrument, (instrument) => {
    const idx = instrumentsChain.indexOf(instrument);

    if (idx === -1 || idx + 1 === instrumentsChain.length) {
      return instrumentsChain[0];
    }

    return instrumentsChain[idx + 1];
  });

  $ab.on(toggleAB, (state) => (state === "a" ? "b" : "a"));
  $abMode
    .on(setABMode, (_, mode) => mode)
    .on(cycleABModes, (mode) => {
      switch (mode) {
        case "a":
          return "ab";
        case "ab":
          return "b";
        case "b":
          return "a";
      }
    });

  const $scope = combine({
    instrument: $instrument,
    ab: $ab,
    part: $currentPart,
    pattern: $currentPattern,
  });

  $audioLoaded.on(instrumentsLoaded, () => true);

  $composition
    .on(
      sample($scope, toggleActiveInstrumentPad, (source, pad) => ({
        ...source,
        pad,
      })),
      (composition, { ab, instrument, pad, part, pattern }) => {
        const clone = deepClone(composition);
        //fast inverse
        clone.patterns[pattern][ab]![part]![instrument][pad] ^= 1;
        return clone;
      }
    )
    .on(sample($instrument, clearPattern), (dataset, instrument) => ({
      ...dataset,
      [instrument]: createBasicVariation(),
    }))
    .on(clearTrack, () => createComposition({ instruments }))
    .on(
      sample({ scope: $scope, note: $note }, tapPressed),
      (composition, { scope: { ab, instrument, part, pattern }, note }) => {
        const noteAdjusted = note - 1 < 0 ? 0 : note - 1;
        const clone = deepClone(composition);

        clone.patterns[pattern][ab]![part]![instrument][noteAdjusted] = 1;

        return clone;
      }
    );

  guard(clearButtonPressed, {
    filter: $currentMode.map(isOneOf<PlayerMode>("compose", "play")),
    target: clearTrack,
  });

  guard(clearButtonPressed, {
    filter: $currentMode.map(
      isNotOneOf<PlayerMode>("compose", "play", "manualPlay")
    ),
    target: clearPattern,
  });

  forward({ from: generator.tick, to: fxPlay });
  forward({ from: start, to: generator.start });
  forward({ from: stop, to: generator.stop });

  return {
    isLoaded: $audioLoaded,
    activeInstrument: $instrument,
    activePadLights: $activePadLights,
    cycleABModes,
    cycleBPM,
    cycleInstrument,
    clearButtonPressed,
    initialize,
    instruments,
    setInstrument,
    setBPM,
    start,
    stop,
    togglePlay,
    toggleActiveInstrumentPad,
    tone,
    tapPressed,
    currentMode: $currentMode,
    setCurrentMode,
    lowTumbler,
    midTumbler,
    hiTumbler,
    mute,
    rimShotTumbler,
    clapTumbler,
    _mode: modeKnob,
    _bpm: bpmKnob,
    _instrument: instrumentKnob,
    _meta: {
      $ab,
      $abMode,
      $note,
      $dataset: $composition,
      $bpm,
      toggleAB,
      setABMode,
    },
  };
};

type SteppedKnobModelConfig<T> = {
  dictionary: T[] | readonly T[];
  initial: NoInfer<T>;
};

const createSteppedKnobModel = <T>({
  dictionary,
  initial,
}: SteppedKnobModelConfig<T>) => {
  const $position = createStore(initial as T);
  const setPosition = createEvent<T>();
  const setNext = createEvent();
  const setPrevious = createEvent();

  const resetPosition = createEvent();

  $position
    .on(setPosition, (_, v) => v)
    .on(setNext, (curr) => {
      const newIdx = dictionary.indexOf(curr) + 1;
      return newIdx in dictionary ? dictionary[newIdx] : dictionary[0];
    })
    .on(setPrevious, (curr) => {
      const newIdx = dictionary.indexOf(curr) - 1;
      return newIdx in dictionary
        ? dictionary[newIdx]
        : dictionary[dictionary.length - 1];
    })
    .reset(resetPosition);

  return {
    position: $position,
    setPosition,
    setNext,
    setPrevious,
    resetPosition,
  };
};

type RangedKnobModelConfig = {
  range: [number, number];
  initial: number;
  defaultStep?: number;
};
const createRangedKnobModel = ({
  range,
  initial,
  defaultStep,
}: RangedKnobModelConfig) => {
  const step = defaultStep || 1;
  const $position = createStore(initial);
  const setPosition = createEvent();
  const set = createEvent<number>();

  const increase = set.prepend((v: number = step) => v);
  const decrease = set.prepend((v: number = step) => -v);
  const resetPosition = createEvent();

  $position
    .on(setPosition, (_, v) => v)
    .on(set, (curr, amount) => clamp(curr + amount, range[0], range[1]))
    .reset(resetPosition);

  return {
    position: $position,
    setPosition,
    increase,
    decrease,
    resetPosition,
  };
};

const deepClone = <T extends object>(obj: T) =>
  JSON.parse(JSON.stringify(obj)) as T;

const isOneOf =
  <T>(...args: T[]) =>
  (target: T) => {
    return args.includes(target);
  };

const isNotOneOf =
  <T>(...args: T[]) =>
  (target: T) => {
    return !args.includes(target);
  };

const createInstrumentDataset = () => {
  return Object.fromEntries(
    instrumentsChain.map((instrument) => [
      instrument,
      Array.from({ length: 16 }).map(() => 0),
    ])
  ) as Record<InstrumentsKeys, number[]>;
};

const createParts = (): PatternPart => {
  return {
    1: createInstrumentDataset(),
    2: createInstrumentDataset(),
  };
};

const createBasicVariation = (): BasicVariation => ({
  a: createParts(),
  b: createParts(),
});

const createComposition = <K extends Record<string, any>>(config: {
  instruments: K;
  initial?: Partial<InstrumentsSetDataset>;
}) => {
  const keys = Object.keys(config.instruments);

  const dataset = Object.fromEntries(
    keys.map((key) => [key, createBasicVariation()])
  ) as InstrumentsSetDataset;

  if (config.initial) {
    Object.assign(dataset, config.initial);
  }

  return {
    composed: [],
    patterns: { 1: createBasicVariation() },
  } as Composition;
};

const createToneInstance = () => {
  const $isInitialized = createStore(false);
  const fxInitialize = createEffect(Tone.start);

  return {
    isInitialized: $isInitialized,
    initialize: fxInitialize,
  };
};
