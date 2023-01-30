import { Store } from "effector";
import { useStore } from "effector-react";
import { MenuItem } from "../../features/Menu/types";
import { Dropdown } from "./Dropdown";
import { MenuItemWrapper } from "./MenuItemWrapper";
import { SubMenu } from "./SubMenu";

type SubMenuItemProps = {
  title: Store<string>;
  items: MenuItem[];
};

export const SubMenuItem = ({ title, items }: SubMenuItemProps) => {
  const storeTitle = useStore(title);

  return (
    <Dropdown
      anchorComponent={
        <MenuItemWrapper>
          {storeTitle}
          <span>▸</span>
        </MenuItemWrapper>
      }
      placement="rightTop"
    >
      <SubMenu items={items} />
    </Dropdown>
  );
};
