import { Store } from "effector";

export type StoreOrData<T> = Store<T> | T;
