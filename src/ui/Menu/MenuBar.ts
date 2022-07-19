import { h } from "forest";
import { MenuDropdown, MenuDropdownSchema } from "./MenuDropdown";

export const MenuBar = ({ schema }: { schema: MenuDropdownSchema[] }) => {
  h("div", {
    attr: {
      class:
        "w-screen absolute right-0 top-0 bg-neutral-600 p-1 flex flex-row h-9",
    },
    fn: () => {
      for (const entry of schema) {
        MenuDropdown(entry);
      }
    },
  });
};
