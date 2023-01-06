import * as React from "react";
import classNames from 'classnames';

interface MenuItemProps<T extends React.ElementType> {
  as?: T;
  selected?: boolean;
  disabled?: boolean;
}

export function MenuItem<T extends React.ElementType = "li">({
  as,
  selected,
  disabled,
  ...props
}:
  MenuItemProps<T>
  & Omit<React.ComponentPropsWithoutRef<T>, keyof MenuItemProps<T>>
) {
  const Component = as || "li";
  return <Component {...props} className={classNames(
    `whitespace-nowrap cursor-pointer text-left px-5 py-1 w-full flex justify-between gap-x-4 font-sans tracking-tight text-sm  ${
      disabled ? 'text-neutral-400 ' : 'text-gray-300'
    } hover:bg-slate-500 `,
    { 'bg-slate-500 text-gray-100': selected },
    { 'hover:bg-inherit cursor-default': disabled }
  )} />;
}

