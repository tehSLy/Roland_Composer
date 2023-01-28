import classNames from "classnames";
import {
  createEvent,
  createStore,
  Effect,
  Event,
  guard,
  sample,
  Unit,
} from "effector";
import { h, spec, StoreOrData } from "forest";
import { hover } from "../../lib/forest-html";
import { storeOrDataToStore } from "../../lib/storeOrDataToStore";
import { basicTextStyle } from "../shared/styles/basicTextStyle";
import { StaticDropdownList } from "./DropdownList";

export const MenuCommand = ({
  label,
  handler,
  meta,
  shortcut,
  disabled,
  visible,
}: MenuCommandSchema) => {
  const clicked = createEvent<globalThis.MouseEvent>();
  const $isDisabled = storeOrDataToStore(disabled, false);

  if (handler) {
    sample({
      clock: clicked,
      filter: $isDisabled.map((v) => !v),
      target: handler.prepend((v: MouseEvent) => v),
    });
  }

  h("button", () => {
    basicTextStyle({
      class: $isDisabled.map((disabled) =>
        classNames(
          "px-5 py-1 flex justify-between gap-x-4 relative w-full disabled:cursor-default",
          {
            "hover:text-gray-100 hover:bg-slate-500": !disabled,
          },
        ),
      ),
      textColor: $isDisabled.map((is) =>
        is ? ("text-neutral-400" as string) : null,
      ),
    });

    if (meta?.type === "link") {
      h("a", {
        text: label,
        attr: {
          href: meta.url,
          target: meta.openIn === "newTab" ? "_blank" : "",
        },
      });

      return;
    }

    spec({
      style: {
        userSelect: "none",
      },
      attr: {
        disabled: $isDisabled,
      },
      visible: storeOrDataToStore(visible, true),
    });

    h("span", {
      text: label,
    });

    if (handler) {
      spec({
        handler: {
          click: clicked,
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
          },
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
  meta?: MenuCommandListType | MenuCommandNumberType | MenuCommandLinkType;
  disabled?: StoreOrData<boolean>;
  shortcut?: StoreOrData<string>;
  key?: string;
  visible?: StoreOrData<boolean>;
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

export type MenuCommandLinkType = {
  type: "link";
  url: string;
  openIn?: "newTab" | "sameTab";
};
