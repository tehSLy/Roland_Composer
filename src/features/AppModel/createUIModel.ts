import { createEvent, createStore } from "effector";

export const createUIModel = () => {
  const toggleKeybindingsVisible = createEvent();
  const $keybindingsVisible = createStore(false).on(
    toggleKeybindingsVisible,
    (is) => !is
  );

  const toggleHistoryVisible = createEvent();
  const $historyVisible = createStore(false).on(
    toggleHistoryVisible,
    (is) => !is
  );

  return {
    toggleKeybindingsVisible,
    keybindingsVisible: $keybindingsVisible,
    toggleHistoryVisible,
    historyVisible: $historyVisible,
  };
};

export type UIModel = ReturnType<typeof createUIModel>;
