import * as Tone from "tone";
import { ToneAudioNode } from "tone";
import BD from "../../../../assets/sounds/BD/BD0000.WAV";
import CB from "../../../../assets/sounds/CB/CB.WAV";
import CH from "../../../../assets/sounds/CH/CH.WAV";
import CL from "../../../../assets/sounds/CL/CL.WAV";
import CP from "../../../../assets/sounds/CP/CP.WAV";
import CY from "../../../../assets/sounds/CY/CY0000.WAV";
import HC from "../../../../assets/sounds/HC/HC00.WAV";
import HT from "../../../../assets/sounds/HT/HT00.WAV";
import LC from "../../../../assets/sounds/LC/LC00.WAV";
import LT from "../../../../assets/sounds/LT/LT00.WAV";
import MA from "../../../../assets/sounds/MA/MA.WAV";
import MC from "../../../../assets/sounds/MC/MC00.WAV";
import MT from "../../../../assets/sounds/MT/MT00.WAV";
import OH from "../../../../assets/sounds/OH/OH00.WAV";
import RS from "../../../../assets/sounds/RS/RS.WAV";
import SD from "../../../../assets/sounds/SD/SD0075.WAV";

export function createInstrument<
  K extends string,
  T extends { node: ToneAudioNode; key: K }
>(url: string, nodes?: T[]) {
  const player = new Tone.Player(url);
  const nodesWithDefaults = [
    {
      key: "gain",
      node: new Tone.Gain(),
    },
    ...(nodes || []),
  ];
  const nodesMap = Object.fromEntries(
    nodesWithDefaults.map(({ key, node }) => [key, node]) || []
  ) as any as { gain: Tone.Gain<"gain"> } & typeof nodes;

  const nodesArray = nodesWithDefaults.map(({ node }) => node) || [];

  return {
    player: player.chain(...nodesArray, Tone.Destination),
    nodes: nodesArray,
    nodesMap,
  };
}

export const createInstrumentsSet = () => {
  const instruments = {
    bassDrum: createInstrument(BD, [
      { key: "pitchshift", node: new Tone.PitchShift() },
    ]),
    cowBell: createInstrument(CB, []),
    closedHat: createInstrument(CH, []),
    claves: createInstrument(CL, []),
    handClap: createInstrument(CP, []),
    cymbal: createInstrument(CY, []),
    hiConga: createInstrument(HC, []),
    hiTom: createInstrument(HT, []),
    lowConga: createInstrument(LC, []),
    lowTom: createInstrument(LT, []),
    maracas: createInstrument(MA, []),
    midConga: createInstrument(MC, []),
    midTom: createInstrument(MT, []),
    openHihat: createInstrument(OH, []),
    rimShot: createInstrument(RS, []),
    snareDrum: createInstrument(SD, []),
  };

  return instruments;
};

export type InstrumentsSet = ReturnType<typeof createInstrumentsSet>;
