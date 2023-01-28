import { MenuItemSchema } from '../../features/Menu/types';
import { Dropdown } from './Dropdown/Dropdown';
import { Menu } from '../../features/Menu/Menu';
import { MenuItemWrapper } from './MenuItemWrapper';

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
      placement="rightTop"
    >
      <Menu items={items} />
    </Dropdown>
  );
};
