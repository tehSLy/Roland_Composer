import { Store } from "effector";
import { Button } from "~shared/ui/Button";
import { Dropdown } from "~shared/ui/Dropdown";
import { SubMenu } from "~shared/ui/SubMenu";
import { MenuDropdownSchema } from "../types";

type MenuProps = {
  items: MenuDropdownSchema[];
};

export const Menu = ({ items }: MenuProps) => {
  return (
    <ul>
      {items.map((item) => {
        return (
          <Dropdown
            anchorComponent={
              <Button
                title={item.label as Store<string>}
                disabled={item.disabled as Store<boolean>}
              />
            }
            placement="bottomLeft"
          >
            <SubMenu items={item.children} />
          </Dropdown>
        );
      })}
    </ul>
  );
};
