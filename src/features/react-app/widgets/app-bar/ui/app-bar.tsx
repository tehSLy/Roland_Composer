import { useMemo } from 'react';
import { Menu } from '../../../shared/ui/menu';
import { appMenuItems } from '../constants';
import { ProjectName } from '../../../entities/project/ui/projectName';
import tw from 'tailwind-styled-components';

export const AppBar = () => {
  const menuItems = useMemo(() => appMenuItems, []);

  return (
    <AppBarWrapper>
      <div className="flex items-center">
        <Menu items={menuItems} horizontal />
      </div>
      <div className="flex justify-center items-center">
        <ProjectName />
      </div>
    </AppBarWrapper>
  );
};

const AppBarWrapper = tw.div`
  w-screen
  h-9
  p-1
  absolute
  right-0
  top-0
  grid
  grid-cols-[1fr_auto_1fr]
  bg-neutral-600
`;
