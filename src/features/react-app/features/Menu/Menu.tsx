import { MenuItemSchema } from './types';
import { Button } from '../../shared/ui/Button';
import { Dropdown } from '../../shared/ui/Dropdown';
import { NumericMenuItem } from '../../shared/ui/NumericMenuItem';
import { SubMenu } from '../../shared/ui/SubMenu';
import { ShortcutMenuItem } from '../../shared/ui/ShortcutMenuItem';
import { LinkMenuItem } from '../../shared/ui/LinkMenuItem';
import { MenuItemWrapper } from '../../shared/ui/MenuItemWrapper';
import { useStore } from 'effector-react';

type MenuProps = {
  items?: MenuItemSchema[];
};

export const Menu = ({ items }: MenuProps) => {
  if (!items) return null;

  return (
    <ul>
      {items.map((item) => {
        const { label, type, disabled, onChange = () => null, meta } = item;
        const { children, value, shortcut, href } = meta;

        switch (type) {
          case 'button': {
            return (
              <Dropdown
                anchorComponent={<Button disabled={disabled}>{label}</Button>}
                placement="bottomLeft"
              >
                <Menu items={children} />
              </Dropdown>
            );
          }

          case 'submenu': {
            return <SubMenu title={label} items={children} />;
          }

          case 'number': {
            const storeValue = useStore(value!);

            return (
              <NumericMenuItem
                title={label}
                value={storeValue}
                onChange={(event) => onChange(event.currentTarget.value)}
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
