import { createStore, is, Store } from "effector";
import { StoreOrData } from "~/features/shared/StoreOrData";

export const storeOrDataToStore = <T>(
  storeOrData: StoreOrData<T> | undefined,
  defaultValue: T,
) => {
  return is.store(storeOrData)
    ? (storeOrData as Store<T>)
    : createStore((storeOrData as T) ?? defaultValue);
};
