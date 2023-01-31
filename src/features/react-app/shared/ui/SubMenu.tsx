import { Store } from "effector";
import { KeyAction } from "~/features/shared";
import { MenuItem } from "../../features/Menu/types";
import { ButtonMenuItem } from "./ButtonMenuItem";
import { LinkMenuItem } from "./LinkMenuItem";
import { NumericMenuItem } from "./NumericMenuItem";
import { SubMenuItem } from "./SubMenuItem";

type SubMenuProps = {
  items: MenuItem[];
};

export const SubMenu = ({ items }: SubMenuProps) => {
  return (
    <>
      {items.map((item) => {
        const { label, type, disabled, meta } = item;

        switch (type) {
          case "button": {
            return (
              <ButtonMenuItem
                title={label as Store<string>}
                disabled={disabled as Store<boolean>}
                shortcut={meta.shortcut as Store<KeyAction>}
              />
            );
          }
          case "link": {
            return (
              <LinkMenuItem title={label as Store<string>} href={meta.url} />
            );
          }
          case "number": {
            return (
              <NumericMenuItem
                title={label as Store<string>}
                value={meta.value as Store<number>}
                onChange={(event) =>
                  meta.handler(Number(event.currentTarget.value))
                }
              />
            );
          }
          case "submenu": {
            return (
              <SubMenuItem
                title={label as Store<string>}
                items={meta.children}
              />
            );
          }
          default:
            return null;
        }
      })}
    </>
  );
};
