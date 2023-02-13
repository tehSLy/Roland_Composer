import { useMemo } from "react";
import { Project } from "~/features/App/SaveLoadModal/Project";
import { AppModel } from "~/features/AppModel";
import { ProjectsList } from "~entities/project/ui/ProjectsList";
import { createSelectableListModel } from "~/ui/SelectableList/createSelectableListModel";
import { Modal } from "~shared/ui/Modal";
import { createSaveButtons } from "../libs/createSaveButtons";

type SaveModalProps = {
  appModel: AppModel;
};

export const SaveModal = ({ appModel }: SaveModalProps) => {
  const listModel = createSelectableListModel({
    items: appModel.savedProjects.list.map((projects) =>
      Object.entries(projects).map(
        ([key]) =>
          ({
            createdAt: "",
            name: key,
          } as Project),
      ),
    ),
  });

  const saveButtons = useMemo(
    () => createSaveButtons(appModel, listModel),
    [appModel, listModel],
  );

  return (
    <Modal
      model={appModel.uiModel.saveModal}
      title="Save Project in browser..."
      body={<ProjectsList model={listModel} />}
      buttons={saveButtons}
    />
  );
};
