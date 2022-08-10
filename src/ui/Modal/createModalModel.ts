import { createApi, createStore } from "effector";
import { StoreOrData } from "forest";
import { storeOrDataToStore } from "../../lib/storeOrDataToStore";

export const createModalModel = (config: { isOpen?: StoreOrData<boolean> }) => {
  const $open =
    config.isOpen == undefined
      ? createStore(false)
      : storeOrDataToStore(config.isOpen, false);

  const { close, open, toggle } = createApi($open, {
    open: () => true,
    close: () => false,
    toggle: (v) => !v,
  });

  return {
    isOpen: $open,
    open,
    close,
    toggle,
  };
};

export type ModalModel = ReturnType<typeof createModalModel>;
