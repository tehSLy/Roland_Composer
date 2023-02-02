import classNames from "classnames";
import { useList } from "effector-react";
import { HistoryActionType } from "~/features/App/History/HistoryActionType";
import {
  InstrumentsKeys,
  ABMode,
  PlayerMode,
} from "~/features/Player/shared/constants";
import { $steps } from "~/index";

export const StepList = () => {
  const stepList = useList($steps, (step) => (
    <div className="flex flex-row py-1 px-2 items-center justify-between">
      <div className="flex flex-row items-center">
        <span
          className={composeResolveDotClass("rounded-full p-1 mx-2")(step.type)}
        ></span>
        <span>{resolveTypeLabel(step.type)}</span>
      </div>
      <span>{resolveValue(step.type, step.value)}</span>
    </div>
  ));

  return <ul>{stepList}</ul>;
};

const composeResolveDotClass = (cls: string) => (type: HistoryActionType) => {
  const map: Record<HistoryActionType, string> = {
    AB: "bg-red-400",
    BPM: "bg-yellow-400",
    INSTRUMENT: "bg-green-400",
    MODE: "bg-blue-400",
    VOLUME: "bg-violet-400",
  };

  return classNames(map[type] || "bg-gray-400", cls);
};

const resolveTypeLabel = (type: HistoryActionType) => {
  const map: Record<HistoryActionType, string> = {
    AB: "AB",
    BPM: "BPM",
    INSTRUMENT: "INST",
    MODE: "MODE",
    VOLUME: "VOL",
  };

  return map[type] || "UNKNW";
};

const resolveInstrumentLabel = (instrument: string) => {
  const map: Record<InstrumentsKeys, string> = {
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
  return map[instrument as InstrumentsKeys] || "Unknown";
};

const resolveABLabel = (ab: ABMode) => {
  const map = {
    a: "A only",
    b: "B only",
    ab: "Both AB",
  };

  return map[ab] || "Unknown";
};

const resolveModeLabel = (mode: PlayerMode) => {
  const map: Record<PlayerMode, string> = {
    compose: "Compose mode",
    firstPart: "Edit First part",
    manualPlay: "Manual play mode",
    patternClear: "Clear pattern",
    play: "Play mode",
    secondPart: "Edit Second part",
  };

  return map[mode] || "Unknown";
};

const resolveValue = (type: HistoryActionType, value: any) => {
  const map: Record<HistoryActionType, string> = {
    AB: resolveABLabel(value as ABMode),
    BPM: value,
    INSTRUMENT: resolveInstrumentLabel(value),
    MODE: resolveModeLabel(value as PlayerMode),
    VOLUME: value,
  };

  return map[type] || "UNKNW";
};
