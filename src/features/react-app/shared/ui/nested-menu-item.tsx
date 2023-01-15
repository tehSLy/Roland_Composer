import { useState } from 'react';
import { MenuItem } from './menu-item';
import tw from 'tailwind-styled-components';

interface NestedMenuItemProps extends React.ComponentPropsWithoutRef<'a'> {}

export const NestedMenuItem = ({
  title,
  children,
  ...props
}: NestedMenuItemProps) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <NestedMenuItemWrapper
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <MenuItem {...props} selected={isHovered}>
        {title}
        <span>▸</span>
      </MenuItem>
      {isHovered && <NestedMenuWrapper>{children}</NestedMenuWrapper>}
    </NestedMenuItemWrapper>
  );
};

const NestedMenuItemWrapper = tw.span`
  relative
`;

const NestedMenuWrapper = tw.div`
bg-neutral-700
  rounded-sm
  absolute
  left-full
  -top-1
`;
