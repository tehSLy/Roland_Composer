import { useMemo } from "react";
import { AppModel } from "~/features/AppModel";
import { ProjectsList } from "~entities/project/ui/ProjectsList";
import { Modal } from "~shared/ui/Modal";
import { createLoadButtons } from "../createButtons";
import { savedProjectslistModel } from "~/model";

type SaveModalProps = {
  appModel: AppModel;
};

export const LoadModal = ({ appModel }: SaveModalProps) => {
  const loadButtons = useMemo(
    () => createLoadButtons(appModel, savedProjectslistModel),
    [appModel, savedProjectslistModel],
  );

  return (
    <Modal
      model={appModel.uiModel.loadModal}
      title="Load Project from browser..."
      body={<ProjectsList model={savedProjectslistModel} />}
      buttons={loadButtons}
    />
  );
};
