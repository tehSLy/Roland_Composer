import { useMemo } from "react";
import { AppModel } from "~/features/AppModel";
import { ProjectsList } from "~entities/project/ui/ProjectsList";
import { Modal } from "~shared/ui/Modal";
import { createSaveButtons } from "../createButtons";
import { savedProjectslistModel } from "~/model";

type SaveModalProps = {
  appModel: AppModel;
};

export const SaveModal = ({ appModel }: SaveModalProps) => {
  const saveButtons = useMemo(
    () => createSaveButtons(appModel, savedProjectslistModel),
    [appModel, savedProjectslistModel],
  );

  return (
    <Modal
      model={appModel.uiModel.saveModal}
      title="Save Project in browser..."
      body={<ProjectsList model={savedProjectslistModel} />}
      buttons={saveButtons}
    />
  );
};
