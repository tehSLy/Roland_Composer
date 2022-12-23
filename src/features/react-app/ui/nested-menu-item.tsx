import { useState } from 'react';

interface NestedMenuItemProps
  extends React.ComponentPropsWithoutRef<'button'> {}

export const NestedMenuItem = ({
  title,
  children,
  ...props
}: NestedMenuItemProps) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <span
      className='relative'
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <button
        {...props}
        className='whitespace-nowrap text-left px-5 py-1 w-full flex justify-between gap-x-4 hover:text-gray-100 hover:bg-slate-500 font-sans tracking-tight text-sm text-gray-300 disabled:text-neutral-400 disabled:hover:bg-inherit disabled:cursor-default'
      >
        {title}
        <span>▸</span>
      </button>
      {isHovered ? (
        <div className='absolute py-1 bg-neutral-700 rounded-sm left-full -top-1'>
          {children}
        </div>
      ) : null}
    </span>
  );
};
