export const BPM = [65, 80, 95, 110, 125, 140, 155, 170, 180, 200, 215] as const;
export type BPMStep = typeof BPM[number];
export type InstrumentsKeys =
  | "bassDrum"
  | "cowBell"
  | "closedHat"
  | "handClap"
  | "cymbal"
  | "hiTom"
  | "lowTom"
  | "midTom"
  | "openHihat"
  | "rimShot"
  | "snareDrum";


export const instrumentsChain:Readonly<InstrumentsKeys[]> = ['bassDrum','snareDrum','lowTom', 'midTom', 'hiTom', 'rimShot', 'handClap', 'cowBell', 'cymbal', 'openHihat','closedHat'] as const;

export type AB = "a" | "b";
export type ABMode = "a" | "b" | "ab";

export const playerModes = ["patternClear", "firstPart", 'secondPart', 'manualPlay', 'play', 'compose'] as const;
export type PlayerMode = typeof playerModes[number];