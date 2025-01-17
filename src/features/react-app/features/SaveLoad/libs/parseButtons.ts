import { storeOrDataToStore } from "~/features/shared/libs/storeOrDataToStore";
import { ModalButtonConfig } from "~shared/ui/Modal";

export const parseButtons = (buttons: ModalButtonConfig[]) => {
  return buttons.map((button) => ({
    ...button,
    disabled: storeOrDataToStore(button.disabled, false),
    label: storeOrDataToStore(button.label, ""),
  }));
};
