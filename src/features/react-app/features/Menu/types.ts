import { Effect, Event, Unit } from "effector";
import { StoreOrData } from "~/features/shared/StoreOrData";

export type MenuCommandSchema =
  | MenuNumberCommandSchema
  | MenuSubmenuCommandSchema
  | MenuLinkCommandSchema
  | MenuButtonCommandSchema
  | MenuListCommandSchema;

interface MenuCommandSchemaBase {
  disabled?: StoreOrData<boolean>;
  visible?: StoreOrData<boolean>;
  label: StoreOrData<string>;
}

interface MenuNumberCommandSchema extends MenuCommandSchemaBase {
  type: "number";
  meta: MenuCommandNumberTypeMeta;
}
interface MenuSubmenuCommandSchema extends MenuCommandSchemaBase {
  type: "submenu";
  meta: MenuCommandSubmenuTypeMeta;
}
interface MenuLinkCommandSchema extends MenuCommandSchemaBase {
  type: "link";
  meta: MenuCommandLinkTypeMeta;
}
interface MenuButtonCommandSchema extends MenuCommandSchemaBase {
  type: "button";
  meta: MenuCommandButtonTypeMeta;
}
interface MenuListCommandSchema extends MenuCommandSchemaBase {
  type: "list";
  meta: MenuCommandListTypeMeta;
}

export type MenuCommandSubmenuTypeMeta = {
  children: MenuCommandSchema[];
  handler?: Unit<{ key: string; index: number }>;
};

export type MenuCommandListTypeMeta = {
  children: StoreOrData<string[]>;
  handler?: Unit<{ key: string; index: number }>;
};

export type MenuCommandNumberTypeMeta = {
  value?: StoreOrData<number>;
  from?: number;
  to?: number;
  handler?: Event<number>;
};

export type MenuCommandLinkTypeMeta = {
  url: string;
  openIn?: "newTab" | "sameTab";
};

export type MenuCommandButtonTypeMeta = {
  shortcut?: StoreOrData<string>;
  handler?:
    | Event<MouseEvent>
    | Effect<MouseEvent, any, any>
    | Event<void>
    | Effect<void, any, any>;
};

export type MenuDropdownSchema = {
  label: StoreOrData<string>;
  children: MenuCommandSchema[];
  visible?: StoreOrData<boolean>;
  disabled?: StoreOrData<boolean>;
};
