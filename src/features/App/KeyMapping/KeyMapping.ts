import classNames from "classnames";
import { Store } from "effector";
import { h, StoreOrData } from "forest";
import { basicTextStyle } from "../../../ui/shared/styles/basicTextStyle";
import { keymapping, resolveActionLabel, resolveKeyLabel } from "../../shared";

const SpecialChars = ["PLUS_SIGN"] as const;
type SpecialChar = (typeof SpecialChars)[number];
const specialChar = (v: SpecialChar) => v;

export const KeyMapping = ({ visible }: { visible: Store<boolean> }) => {
  h("div", {
    visible,
    attr: {
      class:
        "absolute right-0 w-96 bg-neutral-700 overflow-y-auto no-scrollbar ",
    },
    style: {
      top: "2.25rem",
      height: "calc(100vh - 2.25rem)",
    },
    fn() {
      Keybind({
        action: "Action",
        keybind: "Keybinding",
        class:
          "bg-neutral-600 font-bold border-neutral-400 border-solid border-0 border-b-4 sticky top-0",
      });
      Object.entries(keymapping).forEach(([keybind, action], idx) => {
        Keybind({
          action: resolveActionLabel(action),
          keybind: resolveKeyLabel(keybind),
          class: idx % 2 ? "bg-neutral-600" : undefined,
        });
      });
    },
  });
};

const Keybind = ({
  class: bg,
  action,
  keybind,
  keybindClass,
}: {
  class?: string;
  keybind: StoreOrData<string>;
  action: StoreOrData<string>;
  keybindClass?: StoreOrData<string>;
}) => {
  h("div", {
    fn() {
      basicTextStyle({
        class: classNames(bg, "w-full px-4 py-1 flex flex-row space-between"),
      });
      h("span", {
        text: action,
        attr: {
          class: "w-2/3",
        },
      });
      h("span", {
        text: keybind,
        attr: {
          class: keybindClass || "",
        },
      });
    },
  });
};
