import { createStore, is, Store } from "effector";
import { StoreOrData } from "forest";

export const storeOrDataToStore = <T>(
  storeOrData: StoreOrData<T> | undefined,
  defaultValue: T
) => {
  return is.store(storeOrData)
    ? (storeOrData as Store<T>)
    : createStore((storeOrData as T) ?? defaultValue);
};
