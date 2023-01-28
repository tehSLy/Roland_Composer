import { attach, combine, createEvent, createStore } from "effector";
import { Sampler } from "tone";

const KNOBS_POSITIONS_COUNT = 5;
const KNOB_POSITIONS = ["00", "10", "25", "50", "75"];
/**
 * Somehow, there is no C note in Tone.js
 */
const NOTES = ["D", "E", "F", "A", "B"];

type Config = {
  urlMap: Record<string, string>;
  additionalKnobsCount?: number;
  knobsInitial?: number[];
  prefix: string;
  alterPrefix?: string;
};

const createInstrumentBaseModel = ({
  prefixInitial,
  knobsCount,
  knobsInitial,
}: {
  prefixInitial: string;
  knobsInitial?: number[];
  knobsCount: number;
}) => {
  const $prefix = createStore(prefixInitial);
  const $isMainInstrumentToggled = $prefix.map(
    (prefix) => prefix === prefixInitial,
  );
  const $volume = createStore(50);
  const $knobs = createStore(
    Array.from({ length: knobsCount }).map((_, k) => knobsInitial?.[k] || 2),
  );
  const $currentNote = combine($prefix, $knobs, (prefix, knobs) => {
    return prefix + knobs.map((k) => KNOB_POSITIONS[k]).join("");
  });

  const togglePrefix = createEvent();
  const setPrefix = createEvent<string>();
  const setKnob = createEvent<{ id: number; level: number }>();
  const setKnobs = createEvent<number[]>();
  const setVolume = createEvent<number>();
  return {
    $prefix,
    $isMainInstrumentToggled,
    $volume,
    $knobs,
    $currentNote,
    togglePrefix,
    setPrefix,
    setKnob,
    setKnobs,
    setVolume,
  };
};

export const createInstrument = ({
  additionalKnobsCount: knobsCount = 0,
  prefix: prefixInitial,
  alterPrefix,
  urlMap,
  knobsInitial,
}: Config) => {
  const { noteToUrl, sampleToNote } = createNotesMap(urlMap);
  const sampler = new Sampler({
    urls: noteToUrl,
  }).toDestination();

  const {
    $currentNote,
    $isMainInstrumentToggled,
    $knobs,
    $prefix,
    $volume,
    setKnob,
    setKnobs,
    setPrefix,
    setVolume,
    togglePrefix,
  } = createInstrumentBaseModel({
    knobsCount,
    knobsInitial,
    prefixInitial,
  });
  const play = attach({
    source: $currentNote,
    effect: (note: string) => {
      sampler.triggerAttackRelease([sampleToNote[note]], 0.4);
    },
  });

  $prefix
    .on(setPrefix, (_, next) => next)
    .on(togglePrefix, (prefix) =>
      prefix === prefixInitial ? alterPrefix : prefixInitial,
    );

  $knobs
    .on(setKnob, (knobs, { id, level }) =>
      knobs.map((currentLevel, idx) => (idx === id ? level : currentLevel)),
    )
    .on(setKnobs, (_, knobs) => knobs);

  $volume.on(setVolume, (_, level) => level);

  $volume.watch((level) => {
    const zeroPoint = 50;
    const newLevel =
      level <= zeroPoint ? (1 - level / zeroPoint) * -40 : (level / 100) * 3;
    sampler.volume.value = newLevel;
  });

  return {
    sampler,
    setVolume,
    setKnob,
    setKnobs,
    play,
    setPrefix,
    togglePrefix,
    volume: $volume,
    knobs: $knobs,
    isMainInstrumentToggled: $isMainInstrumentToggled,
    _meta: {
      additionalKnobsCount: knobsCount,
      prefix: prefixInitial,
    },
  };
};

export const createAccent = () => {
  return {} as ReturnType<typeof createInstrument>;
};

export const createNotesMap = (urlMap: Record<string, string>) => {
  let octave = 1;
  let currentNoteIdx = 0;

  const noteToUrl: Record<string, string> = {};
  const sampleToNote: Record<string, string> = {};

  for (const key in urlMap) {
    if (currentNoteIdx === NOTES.length) {
      currentNoteIdx = 0;
      octave += 1;
    }
    const note = NOTES[currentNoteIdx++];
    const url = urlMap[key];
    const octaveNote = `${note}${octave}`;

    noteToUrl[octaveNote] = url;
    sampleToNote[key] = octaveNote;
  }

  return { noteToUrl, sampleToNote };
};

/**
 * Generates all combination of given Array or number
 *
 * @param {Array | number} items  - Item accepts array or number. If it is array exports all combination of items. If it is a number export all combination of the number
 * @param {number} n - pow of the item, if given value is `n` it will be export max `n` item combination
 *
 * @return {Array} Array of combination arrays.
 * @see https://stackoverflow.com/a/65535210
 */
function combinate<T>(items: T[], n: number) {
  const filter = typeof n !== "undefined";
  n = n ? n : items.length;
  const result = [] as T[][];
  const isArray = items.constructor.name === "Array";
  const count = isArray ? items.length : items;

  // @ts-ignore
  const pow = (x, n, m = []) => {
    if (n > 0) {
      for (var i = 0; i < count; i++) {
        // @ts-ignore
        const value = pow(x, n - 1, [...m, isArray ? items[i] : i]);
        result.push(value);
      }
    }
    return m;
  };
  pow(isArray ? items.length : items, n);

  return filter ? result.filter((item) => item.length == n) : result;
}
