import { storeOrDataToStore } from "~/lib/storeOrDataToStore";
import { ModalButtonConfig } from "../ui/Modal";

export const parseModalButtons = (buttons: ModalButtonConfig[]) => {
  return buttons.map((button) => ({
    ...button,
    disabled: storeOrDataToStore(button.disabled, false),
    label: storeOrDataToStore(button.label, ""),
  }));
};
