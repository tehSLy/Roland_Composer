import { attach } from "effector";
import { Project } from "~/features/App/SaveLoadModal/Project";
import { AppModel } from "~/features/AppModel";
import { SelectableListModel } from "~/ui/SelectableList/createSelectableListModel";
import { parseSaveButtons } from "./parseSaveButtons";

export const createSaveButtons = (
  appModel: AppModel,
  listModel: SelectableListModel<Project>,
) => {
  return parseSaveButtons([
    {
      handler: attach({
        effect: appModel.savedProjects.save,
        source: listModel.input,
      }),
      label: "Save",
    },
    {
      handler: appModel.uiModel.saveModal.close,
      label: "Cancel",
    },
  ]);
};
