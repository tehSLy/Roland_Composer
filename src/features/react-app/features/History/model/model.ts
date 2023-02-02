import { createStore } from "effector";
import { HistoryAction } from "~/features/App/History/HistoryActionType";

export const $steps = createStore<HistoryAction[]>([]);
