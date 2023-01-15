import { useState } from 'react';
import { Button } from './button';
import { Typography } from './typography';
import tw from 'tailwind-styled-components';

type DropdownButtonProps = {
  title: string;
  children?: React.ReactNode;
};

export const DropdownButton = ({ title, children }: DropdownButtonProps) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <DropdownWrapper
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Button>
        <Typography>{title}</Typography>
      </Button>
      {isHovered && <DropdownListWrapper>{children}</DropdownListWrapper>}
    </DropdownWrapper>
  );
};

const DropdownWrapper = tw.span`
  relative
  inline-block
`;

const DropdownListWrapper = tw.div`
  absolute
  left-0
`;
