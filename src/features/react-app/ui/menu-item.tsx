import { useStore } from 'effector-react';
import { createStore } from 'effector';

interface MenuItemProps extends React.ComponentPropsWithoutRef<'button'> {
  meta?: any;
  shortcut?: string;
}

export const MenuItem = ({
  meta = {},
  shortcut = '',
  ...props
}: MenuItemProps) => {
  const value = useStore(meta.value || createStore(null));

  if (meta.type === 'link') {
    return (
      <a
        className='whitespace-nowrap text-left px-5 py-1 w-full flex justify-between gap-x-4 hover:text-gray-100 hover:bg-slate-500 font-sans tracking-tight text-sm text-gray-300 disabled:text-neutral-400 disabled:hover:bg-inherit disabled:cursor-default'
        href={meta.url}
      >
        {props.children}
      </a>
    );
  }

  return (
    <button
      {...props}
      className='whitespace-nowrap text-left px-5 py-1 w-full flex justify-between gap-x-4 hover:text-gray-100 hover:bg-slate-500 font-sans tracking-tight text-sm text-gray-300 disabled:text-neutral-400 disabled:hover:bg-inherit disabled:cursor-default'
    >
      {props.children}
      {meta.type === 'number' ? (
        <input
          className='rounded-sm focus:outline-none focus:border-neutral-700 focus:ring-neutral-700 focus:ring-2 text-gray-200 bg-neutral-500 px-1 w-16 text-right'
          type='number'
          onChange={(evt) => meta.handler(evt.currentTarget.value)}
          value={'' + value}
        />
      ) : null}
      {shortcut ? <span>{shortcut}</span> : null}
    </button>
  );
};
