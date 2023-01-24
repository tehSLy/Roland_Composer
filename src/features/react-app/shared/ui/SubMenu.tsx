import { MenuItemSchema } from '../types';
import { Dropdown } from './Dropdown';
import { Menu } from './Menu';
import { MenuItemWrapper } from './MenuItem';

type SubMenuProps = {
  title: string;
  items?: MenuItemSchema[];
};

export const SubMenu = ({ title, items }: SubMenuProps) => {
  return (
    <Dropdown
      anchorComponent={
        <MenuItemWrapper>
          {title} <span>▸</span>
        </MenuItemWrapper>
      }
      placement='rightTop'
    >
      <Menu items={items} />
    </Dropdown>
  );
};
