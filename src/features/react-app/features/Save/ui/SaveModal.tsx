import { attach, createStore } from "effector";
import { useMemo } from "react";
import { Project } from "~/features/App/SaveLoadModal/Project";
import { AppModel } from "~/features/AppModel";
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
    [appModel],
  );

  return <Modal title="Save Project in browser..." buttons={saveButtons} />;
};
