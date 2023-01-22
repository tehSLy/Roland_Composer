import { Button } from './button';
import { Dropdown } from './dropdown';
import { MenuItem } from './menu-item';
import { useState } from 'react';
import { MenuItemSchema } from '../types';
import tw from 'tailwind-styled-components';

type MenuProps = {
  items?: MenuItemSchema[];
  horizontal?: boolean;
};

export const Menu = ({ items, horizontal }: MenuProps) => {
  if (!items) return null;

  const [isNestedSelected, setIsNestedSelected] = useState(false);

  return (
    <MenuWrapper horizontal={horizontal}>
      {items.map((item) => {
        const { label, type, children, ...restProps } = item;

        if (!children) return <MenuItem title={label} {...restProps} />;

        if (type === 'button') {
          return (
            <Dropdown menu={<Menu items={children} />} placement="bottomLeft">
              <Button>{label}</Button>
            </Dropdown>
          );
        }

        return (
          <Dropdown
            menu={<Menu items={children} />}
            onMouseEnter={() => setIsNestedSelected(true)}
            onMouseLeave={() => setIsNestedSelected(false)}
            placement="rightTop"
          >
            <MenuItem
              title={label}
              selected={isNestedSelected}
              {...restProps}
            />
          </Dropdown>
        );
      })}
    </MenuWrapper>
  );
};

const MenuWrapper = tw.ul<{ horizontal?: boolean }>`
  ${({ horizontal }) => horizontal && 'flex'}
`;
