import { MenuItem } from './MenuItem';
import { MenuItemSchema } from '../types';
import { Button } from './Button';
import { Dropdown } from './Dropdown';
import { NumericMenuItem } from './NumericMenuItem';
import { SubMenu } from './SubMenu';
import { ShortcutMenuItem } from './ShortcutMenuItem';

type MenuProps = {
  items?: MenuItemSchema[];
};

export const Menu = ({ items }: MenuProps) => {
  if (!items) return null;

  return (
    <ul>
      {items.map(item => {
        const { label, type, disabled, onChange = () => null, meta } = item;
        const { children, value, shortcut, href } = meta;

        if (type === 'button') {
          return (
            <Dropdown
              anchorComponent={<Button disabled={disabled}>{label}</Button>}
              placement='bottomLeft'
            >
              <Menu items={children} />
            </Dropdown>
          );
        }

        if (type === 'submenu') {
          return <SubMenu title={label} items={children} />;
        }
        if (type === 'number') {
          return (
            <NumericMenuItem
              title={label}
              value={value}
              onChange={event => onChange(event.currentTarget.value)}
            />
          );
        }
        if (type === 'shortcut') {
          return <ShortcutMenuItem title={label} shortcut={shortcut} />;
        }

        return <MenuItem title={label} href={href} disabled={disabled} />;
      })}
    </ul>
  );
};
