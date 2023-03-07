import { combine, createEvent, createStore } from "effector";
import { createModalModel } from "../../ui/Modal";

export const createUIModel = () => {
  const toggleKeybindingsVisible = createEvent();
  const $keybindingsVisible = createStore(false).on(
    toggleKeybindingsVisible,
    (is) => !is,
  );

  const toggleHistoryVisible = createEvent();
  const $historyVisible = createStore(false).on(
    toggleHistoryVisible,
    (is) => !is,
  );

  const aboutModal = createModalModel({});
  const saveModal = createModalModel({});
  const loadModal = createModalModel({});
  const shareModal = createModalModel({});

  const $isModalOpened = combine(
    [aboutModal.isOpen, saveModal.isOpen, loadModal.isOpen],
    (params) => params.some(Boolean),
  );

  return {
    toggleKeybindingsVisible,
    keybindingsVisible: $keybindingsVisible,
    toggleHistoryVisible,
    historyVisible: $historyVisible,
    aboutModal,
    saveModal,
    loadModal,
    shareModal,
    isModalOpened: $isModalOpened,
  };
};

export type UIModel = ReturnType<typeof createUIModel>;
