import { h, StoreOrData } from "forest";
import { basicTextStyle } from "../shared/styles/basicTextStyle";
import { MenuDropdown, MenuDropdownSchema } from "./MenuDropdown";

export const MenuBar = ({
  schema,
  title,
}: {
  schema: MenuDropdownSchema[];
  title: StoreOrData<string>;
}) => {
  h("div", {
    attr: {
      class:
        "w-screen absolute right-0 top-0 bg-neutral-600 p-1 flex flex-row h-9 justify-center",
    },
    fn: () => {
      h("div", {
        attr: {
          class: "flex flex-row h-9 absolute left-1",
        },
        fn: () => {
          for (const entry of schema) {
            MenuDropdown(entry);
          }
        },
      });

      h("span", {
        text: title,
        fn() {
          basicTextStyle({
            class: "flex items-center justify-center",
          });
        },
      });

      h("span", {});
    },
  });
};
