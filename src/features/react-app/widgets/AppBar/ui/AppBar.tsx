import { useMemo } from 'react';
import { Menu } from '../../../shared/ui/Menu';
import { createMenuItems } from '../constants';
import { ProjectName } from '../../../entities/project/ui/ProjectName';
import { AppModel } from '../../../../AppModel';
import tw from 'tailwind-styled-components';

type AppBarProps = {
  appModel: AppModel;
};

export const AppBar = ({ appModel }: AppBarProps) => {
  const menuItems = useMemo(() => createMenuItems(appModel), []);

  return (
    <AppBarWrapper>
      <div className='flex items-center'>
        <Menu items={menuItems} />
      </div>
      <div className='flex justify-center items-center'>
        <ProjectName appModel={appModel} />
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
