import { createEvent, createStore, Store } from "effector";

type Config = {
  initial?: boolean;
};

export function createToggle(config: Config): ReturnType<typeof _createToggle>;
export function createToggle(
  initial: boolean
): ReturnType<typeof _createToggle>;
export function createToggle(params: any) {
  return _createToggle(params);
}

function _createToggle(params: any) {
  const $value =
    typeof params === "boolean"
      ? createStore(params)
      : typeof params === "object"
      ? createStore(params.initial || false)
      : createStore(false);
    
  const toggle = createEvent();
  $value.on(toggle, (v) => !v);

  return {value: $value as Store<boolean>, toggle};
}
