import { attach } from "effector";
import { Project } from "~/features/App/SaveLoadModal/Project";
import { AppModel } from "~/features/AppModel";
import { SelectableListModel } from "~/ui/SelectableList/createSelectableListModel";
import { parseButtons } from "./parseButtons";

export const createSaveButtons = (
  appModel: AppModel,
  listModel: SelectableListModel<Project>,
) => {
  return parseButtons([
    {
      handler: attach({
        effect: appModel.savedProjects.save,
        source: listModel.input,
      }),
      label: "Save",
      disabled: false,
    },
    {
      handler: appModel.uiModel.saveModal.close,
      label: "Cancel",
      disabled: false,
    },
  ]);
};

export const createLoadButtons = (
  appModel: AppModel,
  listModel: SelectableListModel<Project>,
) => {
  return parseButtons([
    {
      handler: attach({
        effect: appModel.savedProjects.load,
        source: listModel.input,
      }),
      disabled: false,
      label: "Load",
    },
    {
      handler: appModel.uiModel.loadModal.close,
      disabled: false,
      label: "Cancel",
    },
  ]);
};
