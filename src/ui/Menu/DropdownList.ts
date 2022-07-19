import classNames from "classnames";
import { createStore, is } from "effector";
import { h, StoreOrData } from "forest";
import { MenuCommand } from "./MenuCommand";

export const DropdownList = () => {};

export const StaticDropdownList = ({
  children,
  visible,
  side = "bottom",
  handler,
}: {
  children: any[];
  visible: StoreOrData<boolean>;
  side?: "bottom" | "right";
  handler?: any;
}) => {
  if (children.length) {
    h("div", {
      attr: {
        class: classNames(
          "absolute py-1 bg-neutral-700 rounded-sm",
          {
            bottom: "top-full left-0",
            right: "left-full -top-1",
          }[side]
        ),
      },
      visible: is.store(visible) ? visible : createStore(visible as boolean),
      style: {
        width: "max-content",
      },
      fn() {
        children.forEach((config, idx) => {
          if (handler) {
            config.handler = handler.prepend(() => ({
              index: idx,
              key: config.key || config.label,
            }));
          }

          MenuCommand(config);
        });
      },
    });
  }
};
