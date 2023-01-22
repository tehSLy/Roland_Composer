import { useState } from 'react';
import { Placement } from '../types';
import tw from 'tailwind-styled-components';

type DropdownProps = {
  menu?: React.ReactNode;
  placement?: Placement;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
  children?: React.ReactNode;
};

export const Dropdown = ({
  menu,
  placement = 'bottomLeft',
  onMouseEnter = () => null,
  onMouseLeave = () => null,
  children,
}: DropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <DropdownWrapper
      onMouseEnter={() => {
        setIsOpen(true);
        onMouseEnter();
      }}
      onMouseLeave={() => {
        setIsOpen(false);
        onMouseLeave();
      }}
    >
      {children}
      {isOpen && (
        <DropdownMenuWrapper placement={placement}>{menu}</DropdownMenuWrapper>
      )}
    </DropdownWrapper>
  );
};

const DropdownWrapper = tw.span`
  relative
`;

const DropdownMenuWrapper = tw.div<{ placement: Placement }>`
  absolute
  py-1
  rounded-sm
  bg-neutral-700  

  ${({ placement }) => (placement === 'rightTop' ? '-top-1 left-full' : '')}
  ${({ placement }) => (placement === 'bottomLeft' ? 'left-0' : '')}
`;
