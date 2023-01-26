import { MenuItemSchema } from './types';
import { Button } from '../Button';
import { Dropdown } from '../Dropdown/Dropdown';
import { NumericMenuItem } from '../NumericMenuItem';
import { SubMenu } from '../SubMenu';
import { ShortcutMenuItem } from '../ShortcutMenuItem';
import { LinkMenuItem } from '../LinkMenuItem';
import { MenuItemWrapper } from '../MenuItemWrapper';

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

        switch (type) {
          case 'button': {
            return (
              <Dropdown
                anchorComponent={<Button disabled={disabled}>{label}</Button>}
                placement='bottomLeft'
              >
                <Menu items={children} />
              </Dropdown>
            );
          }

          case 'submenu': {
            return <SubMenu title={label} items={children} />;
          }

          case 'number': {
            return (
              <NumericMenuItem
                title={label}
                value={value}
                onChange={event => onChange(event.currentTarget.value)}
              />
            );
          }

          case 'shortcut': {
            return <ShortcutMenuItem title={label} shortcut={shortcut} />;
          }

          case 'link': {
            return <LinkMenuItem title={label} href={href} />;
          }

          default: {
            return (
              <MenuItemWrapper disabled={disabled}>{label}</MenuItemWrapper>
            );
          }
        }
      })}
    </ul>
  );
};
