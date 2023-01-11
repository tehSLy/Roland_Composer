import * as React from "react";
import classNames from 'classnames';

type MenuItemProps = {
  href?: string;
  selected?: boolean;
  disabled?: boolean;
  children?: React.ReactNode
}

export const MenuItem = ({href, selected, disabled, children, ...props}: MenuItemProps) => {
  const Component = href ? 'a' : "li";
  const additionalProps = href ? {...props, href} : props

  return <Component {...additionalProps} className={classNames(
    `whitespace-nowrap cursor-pointer text-left px-5 py-1 w-full flex justify-between gap-x-4 font-sans tracking-tight text-sm  ${
      disabled ? 'text-neutral-400 ' : 'text-gray-300'
    } hover:bg-slate-500 `,
    { 'bg-slate-500 text-gray-100': selected },
    { 'hover:bg-inherit cursor-default': disabled }
  )}>{children}</Component>;
}