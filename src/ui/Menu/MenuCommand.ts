import { createEvent, createStore, Effect, Event, guard, Unit } from "effector";
import { h, spec, StoreOrData } from "forest";
import { hover } from "../../lib/forest-html";
import { StaticDropdownList } from "./DropdownList";
import { menuLabelStyle } from "./menuLabelStyle";

export const MenuCommand = ({
  label,
  handler,
  meta,
  shortcut,
  disabled,
}: MenuCommandSchema) => {
  h("div", () => {
    menuLabelStyle(
      "hover:bg-slate-500 hover:text-gray-100 px-5 py-1 flex justify-between gap-x-4 relative"
    );
    spec({
      style: {
        cursor: "pointer",
        userSelect: "none",
      },
      attr: {
        disabled: disabled || createStore(false),
      },
    });

    h("span", {
      text: label,
    });

    if (handler) {
      spec({
        handler: {
          click: handler.prepend((v) => v),
        },
      });
    }

    if (meta?.type === "list") {
      const $visible = createStore(false);
      $visible.on(hover(), (_, is) => is.hovered);
      h("span", {
        text: "▸",
      });
      StaticDropdownList({
        children: meta.children,
        visible: $visible,
        side: "right",
        handler: meta.handler,
      });
    }

    if (meta?.type === "number") {
      const onInput = createEvent<globalThis.Event>();
      onInput.watch((e) => {
        e.uiEvent = true;
      });

      const onKeyPress = createEvent<globalThis.KeyboardEvent>();
      onKeyPress.watch((e) => {
        e.uiEvent = true;
      });
      if (meta.handler) {
        guard(
          // @ts-ignore
          onInput.map((e) => +e.target?.value),
          {
            filter: (value) =>
              validateNumber({ value, from: meta.from, to: meta.to }),
            target: meta.handler,
          }
        );
      }

      h("input", {
        attr: {
          class:
            "rounded-sm focus:outline-none focus:border-neutral-700 focus:ring-neutral-700 focus:ring-2 text-gray-200 bg-neutral-500 px-1 w-16 text-right",
          type: "number",
          value: meta.value || 0,
        },
        handler: {
          input: onInput,
          keypress: onKeyPress,
        },
      });
    }

    if (shortcut) {
      h("span", {
        text: shortcut,
      });
    }
  });
};

const validateNumber = ({
  value,
  from,
  to,
}: {
  from?: number;
  to?: number;
  value: number;
}) => {
  if (isNaN(value)) {
    return false;
  }

  if (from != null && value < from) {
    return false;
  }

  if (to != null && value > to) {
    return false;
  }

  return true;
};

export type MenuCommandSchema = {
  label: StoreOrData<string>;
  handler?:
    | Event<MouseEvent>
    | Effect<MouseEvent, any, any>
    | Event<void>
    | Effect<void, any, any>;
  meta?: MenuCommandListType | MenuCommandNumberType;
  disabled?: StoreOrData<string>;
  shortcut?: StoreOrData<string>;
  key?: string;
};

export type MenuCommandListType = {
  type: "list";
  children: MenuCommandSchema[];
  handler?: Unit<{ key: string; index: number }>;
};

export type MenuCommandNumberType = {
  type: "number";
  value?: StoreOrData<number>;
  from?: number;
  to?: number;
  handler?: Event<number>;
};
