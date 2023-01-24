import tw from 'tailwind-styled-components';

type MenuItemProps = {
  href?: string;
  disabled?: boolean;
  title?: string;
};

export const MenuItem = (props: MenuItemProps) => {
  const { href, disabled, title, ...restProps } = props;

  const element = href ? 'a' : 'li';
  const additionalProps = href
    ? { ...restProps, href, target: '_blank' }
    : restProps;

  return (
    <MenuItemWrapper disabled={disabled} $as={element} {...additionalProps}>
      {title}
    </MenuItemWrapper>
  );
};

export const MenuItemWrapper = tw.span<{
  selected?: boolean;
  disabled?: boolean;
}>`
  relative
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
  hover:text-gray-100 
  hover:bg-slate-500 
  text-gray-300
  ${({ disabled }) =>
    disabled &&
    'text-neutral-400 hover:bg-inherit hover:text-neutral-400 cursor-default'}
  `;
