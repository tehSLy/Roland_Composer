import { useList } from "effector-react";
import { HistoryActionType } from "~/features/App/History/HistoryActionType";
import {
  InstrumentsKeys,
  ABMode,
  PlayerMode,
} from "~/features/Player/shared/constants";
import { $steps } from "../model";
import tw from "tailwind-styled-components";

export const StepList = () => {
  const stepList = useList($steps, (step) => {
    const label = labelMap[step.type] || "Unknown";
    const resolvedValue = resolveValue(step.type, step.value);

    return (
      <ListItem>
        <div className="flex items-center">
          <Dot type={step.type} />
          <span>{label}</span>
        </div>
        <span>{resolvedValue}</span>
      </ListItem>
    );
  });

  return <ul>{stepList}</ul>;
};

const Dot = tw.span<{ type: HistoryActionType }>`
  w-2
  h-2
  mx-2
  inline-block
  rounded-full
  bg-gray-400
  ${({ type }) => dotStylesMap[type]}
`;

const ListItem = tw.div`
  flex
  py-1
  px-2
  items-center
  justify-between
`;

const dotStylesMap: Record<HistoryActionType, string> = {
  AB: "bg-red-400",
  BPM: "bg-yellow-400",
  INSTRUMENT: "bg-green-400",
  MODE: "bg-blue-400",
  VOLUME: "bg-violet-400",
};

const labelMap: Record<HistoryActionType, string> = {
  AB: "AB",
  BPM: "BPM",
  INSTRUMENT: "INST",
  MODE: "MODE",
  VOLUME: "VOL",
};

const aBLabelMap: Record<ABMode, string> = {
  a: "A only",
  b: "B only",
  ab: "Both AB",
};

const instrumentLabelMap: Record<InstrumentsKeys, string> = {
  accent: "Accent",
  bassDrum: "Bass Drum",
  closedHat: "Closed hihats",
  cowBell: "Cowbell",
  cymbal: "Cymbals",
  handClap: "Handclap",
  hiTom: "Hi Tom",
  lowTom: "Low Tom",
  midTom: "Mid Tom",
  openHihat: "Open hihats",
  rimShot: "Rimshot",
  snareDrum: "Snare Drum",
};

const modeLabelMap: Record<PlayerMode, string> = {
  compose: "Compose mode",
  firstPart: "Edit First part",
  manualPlay: "Manual play mode",
  patternClear: "Clear pattern",
  play: "Play mode",
  secondPart: "Edit Second part",
};

const resolveValue = (type: HistoryActionType, value: any) => {
  switch (type) {
    case "AB":
      return aBLabelMap[value as ABMode];
    case "BPM":
      return value;
    case "INSTRUMENT":
      return instrumentLabelMap[value as InstrumentsKeys];
    case "MODE":
      return modeLabelMap[value as PlayerMode];
    case "VOLUME":
      return value;

    default:
      return "Unknown";
  }
};
