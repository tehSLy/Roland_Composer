import { createEvent, createStore } from "effector";
import { createModalModel } from "../../ui/Modal";

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

  const aboutModal = createModalModel({
    isOpen: false,
  });

  return {
    toggleKeybindingsVisible,
    keybindingsVisible: $keybindingsVisible,
    toggleHistoryVisible,
    historyVisible: $historyVisible,
    aboutModal,
  };
};

export type UIModel = ReturnType<typeof createUIModel>;
