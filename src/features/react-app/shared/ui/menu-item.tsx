import * as React from 'react';
import tw from 'tailwind-styled-components';

type MenuItemProps = {
  href?: string;
  selected?: boolean;
  disabled?: boolean;
  children?: React.ReactNode;
};

export const MenuItem = ({
  href,
  selected,
  disabled,
  children,
  ...props
}: MenuItemProps) => {
  const Component = href ? 'a' : 'li';
  const additionalProps = href ? { ...props, href } : props;

  return (
    <Component {...additionalProps}>
      <MenuItemStyled disabled={disabled} selected={selected}>
        {children}
      </MenuItemStyled>
    </Component>
  );
};

const MenuItemStyled = tw.span<MenuItemProps>`
  whitespace-nowrap
  cursor-pointer
  text-left
  px-5
  py-1
  w-full
  flex
  justify-between
  gap-x-4
  font-sans
  tracking-tight
  text-sm 
  hover:bg-slate-500 
  ${({ disabled }) =>
    disabled
      ? 'text-neutral-400 hover:bg-inherit cursor-default'
      : 'text-gray-300'}
  ${({ selected }) => selected && 'bg-slate-500 text-gray-100'}
`;
