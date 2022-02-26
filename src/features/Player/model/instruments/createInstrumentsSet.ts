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
  };

  return instruments;
};

export type InstrumentsSet = ReturnType<typeof createInstrumentsSet>;
