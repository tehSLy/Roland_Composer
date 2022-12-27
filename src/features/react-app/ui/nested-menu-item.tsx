import { useState } from 'react';
import classNames from 'classnames';
import { MenuItem } from './menu-item';

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
      <MenuItem {...props} selected={isHovered}>
        {title}
        <span>▸</span>
      </MenuItem>
      {isHovered && (
        <div className='absolute bg-neutral-700 rounded-sm left-full -top-1'>
          {children}
        </div>
      )}
    </span>
  );
};
