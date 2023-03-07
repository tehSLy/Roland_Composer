import { Effect, Event, Unit } from "effector";
import { KeyAction } from "~/features/shared";
import { StoreOrData } from "~/features/shared/StoreOrData";

export type MenuItemTypeMap = {
  number: NumberMeta;
  submenu: SubMenuMeta;
  link: LinkMeta;
  button: ButtonMeta;
  list: ListMeta;
};

export type MenuItem = {
  [K in keyof MenuItemTypeMap]: {
    label: StoreOrData<string>;
    type: K;
    disabled?: StoreOrData<boolean>;
    visible?: StoreOrData<boolean>;
    meta: MenuItemTypeMap[K];
  };
}[keyof MenuItemTypeMap];

export type SubMenuMeta = {
  children: MenuItem[];
  handler?: Unit<{ key: string; index: number }>;
};

export type ListMeta = {
  children: StoreOrData<string[]>;
  handler?: Unit<{ key: string; index: number }>;
};

export type NumberMeta = {
  value: StoreOrData<number>;
  from?: number;
  to?: number;
  handler: Event<number>;
};

export type LinkMeta = {
  url: string;
  openIn?: "newTab" | "sameTab";
};

export type ButtonMeta = {
  shortcut?: StoreOrData<KeyAction>;
  handler?:
    | Event<void>
    | Event<React.MouseEvent<Element, MouseEvent>>
    | Effect<void, any, any>
    | Effect<React.MouseEvent<Element, MouseEvent>, any, any>;
};

export type MenuDropdownSchema = {
  label: StoreOrData<string>;
  children: MenuItem[];
  visible?: StoreOrData<boolean>;
  disabled?: StoreOrData<boolean>;
};
