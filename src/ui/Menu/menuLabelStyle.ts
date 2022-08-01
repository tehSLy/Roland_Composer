import { createStore, is, Store } from "effector";
import { spec, StoreOrData } from "forest";

export const menuLabelStyle = (elementClass?: StoreOrData<string>) => {
  const $class: Store<string> = is.store(elementClass)
    ? elementClass
    : (createStore(elementClass || "") as Store<string>);
  spec({
    attr: {
      class: $class.map(
        (v) => `font-sans tracking-tight text-gray-300 text-sm ${v}`
      ),
    },
  });
};
