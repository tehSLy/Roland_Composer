import {
  attach,
  combine,
  createEffect,
  createEvent,
  createStore,
  forward,
  guard,
  restore,
  sample,
  Store,
} from "effector";
import * as Tone from "tone";
import { createToggle } from "../../../lib/createToggle";
import {
  AB,
  ABMode,
  BPM,
  BPMStep,
  InstrumentsKeys,
  PlayerMode,
  playerModes,
} from "../shared/constants";
import { createInstrumentsSet } from "./createInstruments";

export type InstrumentDataset = {
  a?: number[];
  b?: number[];
};

const defaultBPM = BPM[4];

export type InstrumentsSetDataset = Record<InstrumentsKeys, InstrumentDataset>;
export type Roland808Model = ReturnType<typeof createRoland808Model>;
export const createRoland808Model = (config?: {
  dataset?: Partial<InstrumentsSetDataset>;
  bpm?: BPMStep;
}) => {
  const setBPM = createEvent<BPMStep>();
  const tone = createToneInstance();
  const initialize = createEffect(() => null);

  const setCurrentMode = createEvent<PlayerMode>();
  const $currentMode = restore(setCurrentMode, playerModes[1]);

  const clearButtonPressed = createEvent();
  const clearTrack = createEvent();
  const clearPattern = createEvent();

  const tapPressed = createEvent();

  const $bpm = restore(setBPM, config?.bpm || defaultBPM);
  const cycleBPM = createEvent();

  const instruments = createInstrumentsSet();
  const dataset = createDataset({ instruments, initial: config?.dataset });

  const cycleInstrument = createEvent();
  const setInstrument = createEvent<InstrumentsKeys>();
  const $instrument = restore(setInstrument, "bassDrum");

  const $abMode = createStore<ABMode>("a");
  const $ab = createStore<AB>("a");
  const $dataset = createStore(dataset);
  const $note = createStore(0);

  const lowTumbler = createToggle({ initial: false });
  const midTumbler = createToggle({ initial: false });
  const hiTumbler = createToggle({ initial: false });
  const rimShotTumbler = createToggle({ initial: false });
  const clapTumbler = createToggle({ initial: false });

  const stop = createEffect(() => Tone.Transport.stop());
  const start = createEffect(async () => {
    await Tone.start();
    Tone.Transport.bpm.value = $bpm.getState();
    Tone.Transport.start();
  });
  const $isRunning = createStore(false)
    .on(start, () => true)
    .on(stop, () => false);

  const $activeInstrumentPads = combine(
    $dataset,
    $instrument,
    $ab,
    (dataset, instrument, ab) =>
      dataset[instrument]?.[ab] || Array.from({ length: 16 }).map((_, k) => k)
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

  $bpm.watch((bpm) => (Tone.Transport.bpm.value = bpm));

  const $substitutedInstruments = combine({
    lowTom: lowTumbler.value,
    midTom: midTumbler.value,
    hiTom: hiTumbler.value,
    handClap: clapTumbler.value,
    rimShot: rimShotTumbler.value,
  } as Partial<Record<InstrumentsKeys, Store<boolean>>>);

  const fxPlay = attach({
    source: {
      ab: $ab,
      dataset: $dataset,
      note: $note,
      substitutedInstruments: $substitutedInstruments,
    },
    effect: createEffect(
      (params: {
        time: number;
        dataset: InstrumentsSetDataset;
        ab: AB;
        note: number;
        substitutedInstruments: Partial<Record<InstrumentsKeys, boolean>>;
      }) => {
        Object.entries(params.dataset).forEach(([key, dataset]) => {
          if (dataset[params.ab]?.[params.note]) {
            const isInstrumentSubstituted =
              params.substitutedInstruments[key as InstrumentsKeys];
            const instrumentKey = (
              isInstrumentSubstituted
                ? instrumentSubstitutionMap[key as InstrumentsKeys]
                : key
            ) as InstrumentsKeys;
            instruments[instrumentKey].player.start(params.time);
          }
        });
      }
    ),
    mapParams: (time: number, source) => ({ time, ...source }),
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
    const idx = instrumentMap.indexOf(instrument);

    if (idx === -1 || idx + 1 === instrumentMap.length) {
      return instrumentMap[0];
    }

    return instrumentMap[idx + 1];
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

  $dataset
    .on(
      sample(
        { instrument: $instrument, ab: $ab },
        toggleActiveInstrumentPad,
        ({ instrument, ab }, pad) => ({ instrument, pad, ab })
      ),
      (dataset, { ab, instrument, pad }) => ({
        ...dataset,
        [instrument]: {
          ...dataset[instrument],
          [ab]: [...dataset[instrument][ab]!].map((v, k) =>
            k === pad ? toggleNumber(v) : v
          ),
        },
      })
    )
    .on(sample($instrument, clearPattern), (dataset, instrument) => ({
      ...dataset,
      [instrument]: createInstrumentDataset(),
    }))
    .on(clearTrack, () => createDataset({ instruments }))
    .on(
      sample({ instrument: $instrument, ab: $ab, note: $note }, tapPressed),
      (dataset, { ab, instrument, note }) => {
        const noteAdjusted = note - 1 < 0 ? 0 : note - 1;

        return {
          ...dataset,
          [instrument]: {
            ...dataset[instrument],
            [ab]: dataset[instrument][ab]!.map((v, k) =>
              k === noteAdjusted ? 1 : v
            ),
          },
        };
      }
    );

  $bpm.on(cycleBPM, (currentBPM) => {
    const idx = BPM.indexOf(currentBPM);

    if (idx === -1 || idx + 1 === BPM.length) {
      return BPM[0];
    }

    return BPM[idx + 1];
  });

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

  Tone.Transport.scheduleRepeat(fxPlay, "16n");

  return {
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
    rimShotTumbler,
    clapTumbler,
    _meta: {
      $ab,
      $abMode,
      $note,
      $dataset,
      $bpm,
      toggleAB,
      setABMode,
    },
  };
};

const instrumentMap: InstrumentsKeys[] = [
  "bassDrum",
  "snareDrum",
  "lowTom",
  "midTom",
  "hiTom",
  "rimShot",
  "handClap",
  "cowBell",
  "cymbal",
  "openHihat",
  "closedHat",
];

const toggleNumber = (v: number) => (v === 0 ? 1 : 0);

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

const createInstrumentDataset = () => ({
  a: Array.from({ length: 16 }).map(() => 0),
  b: Array.from({ length: 16 }).map(() => 0),
});

const createDataset = <K extends Record<string, any>>(config: {
  instruments: K;
  initial?: Partial<InstrumentsSetDataset>;
}) => {
  const keys = Object.keys(config.instruments);

  const dataset = Object.fromEntries(
    keys.map((key) => [key, createInstrumentDataset()])
  ) as InstrumentsSetDataset;

  if (config.initial) {
    Object.assign(dataset, config.initial);
  }
  return dataset;
};

const createToneInstance = () => {
  const $isInitialized = createStore(false);
  const fxInitialize = createEffect(Tone.start);

  return {
    isInitialized: $isInitialized,
    initialize: fxInitialize,
  };
};

const createGenerator = (config: { bpm: Store<number> }) => {
  config.bpm.watch((bpm) => (Tone.Transport.bpm.value = bpm));
  const start = createEvent();
  //@ts-ignore
  start.watch(() => Tone.Transport.start());
  return { start };
};

const instrumentSubstitutionMap: Partial<
  Record<InstrumentsKeys, InstrumentsKeys>
> = {
  lowTom: "lowConga",
  midTom: "midConga",
  hiTom: "hiConga",
  rimShot: "claves",
  handClap: "maracas",
};
