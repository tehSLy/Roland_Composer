import { createEffect, forward, guard } from "effector";
import { createTicker } from "../../../../lib/createTicker";
import { createInstrument } from "./createInstrument";
import {
  bassDrumUrlMap,
  clapMap,
  closedHihatMap,
  cowbellMap,
  cymbalsMap,
  highTomMap,
  hihatMap,
  lowTomMap,
  midTomMap,
  rimshotMap,
  snareDrumUrlMap,
} from "./urlMaps";

export const createInstrumentsSet = () => {
  const ticker = createTicker({ delay: 1000 });
  const loaded: Record<string, boolean> = {};

  const instruments = {
    bassDrum: createInstrument({
      additionalKnobsCount: 2,
      prefix: "BD",
      urlMap: bassDrumUrlMap,
    }),
    cowBell: createInstrument({
      prefix: "CB",
      urlMap: cowbellMap,
    }),
    closedHat: createInstrument({
      prefix: "CH",
      urlMap: closedHihatMap,
    }),
    handClap: createInstrument({
      prefix: "CP",
      alterPrefix: "MA",
      urlMap: clapMap,
    }),
    cymbal: createInstrument({
      additionalKnobsCount: 2,
      prefix: "CY",
      urlMap: cymbalsMap,
    }),
    hiTom: createInstrument({
      additionalKnobsCount: 1,
      prefix: "HT",
      alterPrefix: "HС",
      urlMap: highTomMap,
    }),
    lowTom: createInstrument({
      additionalKnobsCount: 1,
      prefix: "LT",
      alterPrefix: "LC",
      urlMap: lowTomMap,
    }),
    midTom: createInstrument({
      additionalKnobsCount: 1,
      prefix: "MT",
      alterPrefix: "MC",
      urlMap: midTomMap,
    }),
    openHihat: createInstrument({
      additionalKnobsCount: 1,
      prefix: "OH",
      urlMap: hihatMap,
    }),
    rimShot: createInstrument({
      prefix: "RS",
      alterPrefix: "CL",
      urlMap: rimshotMap,
    }),
    snareDrum: createInstrument({
      prefix: "SD",
      urlMap: snareDrumUrlMap,
      additionalKnobsCount: 2,
    }),
    accent: {},
  };

  const fxPollLoading = createEffect(() => {
    const { accent, ...instrumentsMap } = instruments;
    for (const key in instrumentsMap) {
      if (loaded[key]) {
        continue;
      }
      const instrument = instrumentsMap[key as keyof typeof instrumentsMap];
      loaded[key] = instrument.sampler.loaded;
    }
    return Object.values(loaded).every(Boolean);
  });

  const instrumentsLoaded = guard(fxPollLoading.doneData, {
    filter: Boolean,
  });

  forward({ from: ticker.tick, to: fxPollLoading });
  forward({ from: instrumentsLoaded, to: ticker.stop });

  ticker.start();

  return { instruments, instrumentsLoaded };
};

export type InstrumentsSet = ReturnType<typeof createInstrumentsSet>;
