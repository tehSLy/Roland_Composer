import { useMemo } from 'react';
import { useStore } from 'effector-react';
import { AppModel } from '../../AppModel';
import { createSchema } from '../create-schema';
import { Typography } from './typography';
import { Menu } from './menu';

type AppBarProps = {
  appModel: AppModel;
};

export const AppBar = ({ appModel }: AppBarProps) => {
  const schema = useMemo(() => createSchema(appModel), [appModel]);

  return (
    <div className='w-screen absolute right-0 top-0 bg-neutral-600 p-1 flex flex-row h-9 justify-center items-center'>
      <div className='mr-auto'>
        <Menu schema={schema} />
      </div>
      <div className='absolute'>
        <ProjectName appModel={appModel} />
      </div>
    </div>
  );
};

const ProjectName = ({ appModel }: { appModel: AppModel }) => {
  const projectName = useStore(appModel.projectName);
  return <Typography>{projectName}</Typography>;
};
