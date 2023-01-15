import { useMemo } from 'react';
import { useStore } from 'effector-react';
import { AppModel } from '../../../AppModel';
import { createSchema } from '../create-schema';
import { Typography } from './typography';
import { Menu } from './menu';
import tw from 'tailwind-styled-components';

type AppBarProps = {
  appModel: AppModel;
};

export const AppBar = ({ appModel }: AppBarProps) => {
  const schema = useMemo(() => createSchema(appModel), [appModel]);

  return (
    <AppBarStyled>
      <div className='mr-auto'>
        <Menu schema={schema} />
      </div>
      <div className='absolute'>
        <ProjectName appModel={appModel} />
      </div>
    </AppBarStyled>
  );
};

const ProjectName = ({ appModel }: { appModel: AppModel }) => {
  const projectName = useStore(appModel.projectName);
  return <Typography>{projectName}</Typography>;
};

const AppBarStyled = tw.div`
  w-screen
  h-9
  flex
  flex-row
  items-center
  justify-center
  p-1
  absolute
  right-0
  top-0
  bg-neutral-600
`;
