import { KeyMap, resolveActionLabel, resolveKeyLabel } from "~/features/shared";

export const parseKeyMapping = (keymapping: KeyMap) => {
  return Object.entries(keymapping).map(([keybind, action]) => {
    return [resolveActionLabel(action), resolveKeyLabel(keybind)];
  });
};
