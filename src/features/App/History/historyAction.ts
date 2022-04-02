import { Event } from "effector";
import {
  HistoryAction,
  HistoryActionPayloadMapping,
  HistoryActionType,
} from "./HistoryActionType";

const historyActionFactory =
  <T extends HistoryActionType>(type: T) =>
  <P extends HistoryActionPayloadMapping[T]>(event: Event<P>) => {
    return event.map((value) => ({
      type,
      value,
    })) as any as Event<HistoryAction>;
  };

export const historyAction = {
  instrument: historyActionFactory("INSTRUMENT"),
  mode: historyActionFactory("MODE"),
  bpm: historyActionFactory("BPM"),
  ab: historyActionFactory("AB"),
};
