import { useState } from 'react';
import { Button } from './button';
import { Typography } from './typography';

type DropdownButtonProps = {
  title: string;
  children?: React.ReactNode;
};

export const DropdownButton = ({ title, children }: DropdownButtonProps) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <span
      className='relative inline-block'
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Button>
        <Typography>{title}</Typography>
      </Button>
      {isHovered ? <div className='absolute left-0 '>{children}</div> : null}
    </span>
  );
};
