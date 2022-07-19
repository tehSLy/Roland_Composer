import { combine, createStore, is, Store } from "effector";
import { h, spec, StoreOrData } from "forest";
import { hover } from "../../lib/forest-html";
import { MenuButton } from "./MenuButton";
import { MenuCommand, MenuCommandSchema } from "./MenuCommand";

export const MenuDropdown = ({
  label,
  children,
  visible,
  disabled,
}: MenuDropdownSchema) => {
  const $isOpen = createStore(false);

  const $visible = (
    is.store(visible) ? visible : createStore(visible ?? true)
  ) as Store<boolean>;

  h("div", () => {
    spec({
      attr: { class: "relative" },
      visible: $visible,
    });
    $isOpen.on(hover(), (_, { hovered }) => hovered);

    MenuButton({
      text: label,
      disabled,
    });
    if (children.length) {
      h("div", {
        attr: {
          class: "absolute top-100 left-0 py-1 bg-neutral-700 rounded-sm",
        },
        visible: combine(
          { isOpen: $isOpen, disabled: disabled || false },
          ({ disabled, isOpen }) => (disabled ? false : isOpen)
        ),
        style: {
          width: "max-content",
        },
        fn() {
          children.forEach(MenuCommand);
        },
      });
    }
  });
};

export type MenuDropdownSchema = {
  label: StoreOrData<string>;
  children: MenuCommandSchema[];
  visible?: StoreOrData<boolean>;
  disabled?: StoreOrData<boolean>;
};
