import { createApi, createEvent, createStore, Event, Store } from "effector";

export const createSelectableListModel = <T>({
  items,
}: {
  items: Store<T[]>;
}) => {
  const focus = createEvent();
  const $input = createStore("");
  const itemClicked = createEvent<T>();
  const itemDeleteClicked = createEvent<T>();
  const { clearInput, setInputValue } = createApi($input, {
    clearInput: () => "",
    setInputValue: (_, v: string) => v,
  });

  return {
    input: $input,
    clearInput,
    setInputValue,
    items,
    focus,
    itemClicked,
    itemDeleteClicked,
  } as SelectableListModel<T>;
};

export type SelectableListModel<T> = {
  input: Store<string>;
  clearInput: Event<void>;
  setInputValue: Event<string>;
  items: Store<T[]>;
  focus: Event<void>;
  itemClicked: Event<T>;
  itemDeleteClicked: Event<T>;
};
