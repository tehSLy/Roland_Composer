import { storeOrDataToStore } from "~/features/shared/libs/storeOrDataToStore";
import { ModalButtonConfig } from "~/ui/Modal";

export const parseSaveButtons = (buttons: ModalButtonConfig[]) => {
  return buttons.map((button) => ({
    disabled: storeOrDataToStore(button.disabled, false),
    label: storeOrDataToStore(button.label, ""),
  }));
};
