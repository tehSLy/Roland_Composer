import { Store } from "effector";
import { h, list, node } from "forest";
import { SelectableListModel } from "./createSelectableListModel";

export function SelectableList<T>({
  item,
  model,
}: {
  item(row: Store<T>): void;
  model: SelectableListModel<T>;
}) {
  h("div", {
    attr: {
      class:
        "bg-neutral-800 text-gray-200 mb-1 h-48 overflow-y-auto no-scrollbar",
    },
    fn() {
      list(model.items, ({ store }) => {
        item(store);
      });
    },
  });

  h("input", {
    attr: {
      class:
        "mb-1 rounded-sm focus:outline-none focus:border-neutral-700 focus:ring-neutral-700 focus:ring-2 text-gray-200 bg-neutral-500 px-1 w-full",
    },
    handler: {
      input: model.setInputValue.prepend((e) => e.target.value),
    },
    fn() {
      node((el) => {
        model.input.watch((v) => (el.value = v));
        model.focus.watch(() => el.focus());
      });
    },
  });
}
