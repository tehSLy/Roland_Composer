import { useStore } from 'effector-react';
import { appModel } from '../../../../AppModel/createAppModel';
import { Typography } from '../../../shared/ui/typography';

export const ProjectName = () => {
  const projectName = useStore(appModel.projectName);

  return <Typography>{projectName}</Typography>;
};
