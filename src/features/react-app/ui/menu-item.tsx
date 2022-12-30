import classNames from 'classnames';

interface MenuItemProps extends React.ComponentPropsWithoutRef<'a'> {
  selected?: boolean;
  disabled?: boolean;
}

export const MenuItem = ({ selected, disabled, ...props }: MenuItemProps) => {
  return (
    <a
      {...props}
      className={classNames(
        `whitespace-nowrap cursor-pointer text-left px-5 py-1 w-full flex justify-between gap-x-4 font-sans tracking-tight text-sm  ${
          disabled ? 'text-neutral-400 ' : 'text-gray-300'
        } hover:bg-slate-500 `,
        { 'bg-slate-500 text-gray-100': selected },
        { 'hover:bg-inherit cursor-default': disabled }
      )}
    />
  );
};
