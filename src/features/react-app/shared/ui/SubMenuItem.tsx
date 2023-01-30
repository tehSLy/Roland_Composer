import { Store } from "effector";
import { useStore } from "effector-react";
import { MenuItem } from "../../features/Menu/types";
import { Dropdown } from "./Dropdown";
import { MenuItemWrapper } from "./MenuItemWrapper";
import { SubMenu } from "./SubMenu";

type SubMenuItemProps = {
  $title: Store<string>;
  items: MenuItem[];
};

export const SubMenuItem = ({ $title, items }: SubMenuItemProps) => {
  const title = useStore($title);

  return (
    <Dropdown
      anchorComponent={
        <MenuItemWrapper>
          {title}
          <span>▸</span>
        </MenuItemWrapper>
      }
      placement="rightTop"
    >
      <SubMenu items={items} />
    </Dropdown>
  );
};
