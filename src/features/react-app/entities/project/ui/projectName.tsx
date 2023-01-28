import { useStore } from "effector-react";
import { AppModel } from "~/features/AppModel/createAppModel";
import { Typography } from "~shared/ui/Typography";

type ProjectNameProps = {
  appModel: AppModel;
};

export const ProjectName = ({ appModel }: ProjectNameProps) => {
  const projectName = useStore(appModel.projectName);

  return <Typography>{projectName}</Typography>;
};
