import tw from 'tailwind-styled-components';

type MenuItemProps = {
  href?: string;
  selected?: boolean;
  disabled?: boolean;
  title?: string;
  extra?: React.ReactNode;
};

export const MenuItem = (props: MenuItemProps) => {
  const { href, selected, disabled, title, extra, ...restProps } = props;

  const Component = href ? 'a' : 'li';
  const additionalProps = href
    ? { ...restProps, href, target: '_blank' }
    : restProps;

  return (
    <Component {...additionalProps}>
      <MenuItemWrapper disabled={disabled} selected={selected}>
        {title}
        {extra && <span>{extra}</span>}
      </MenuItemWrapper>
    </Component>
  );
};

const MenuItemWrapper = tw.span<{ selected?: boolean; disabled?: boolean }>`
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
  hover:bg-slate-500 
  ${({ disabled }) =>
    disabled
      ? 'text-neutral-400 hover:bg-inherit cursor-default'
      : 'text-gray-300'}
  ${({ selected }) => selected && 'bg-slate-500 text-gray-100'}
`;
