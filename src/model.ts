import { sample, merge } from "effector";
import { debounce } from "patronum";
import { historyAction } from "./features/App/History";
import { Project } from "./features/App/SaveLoadModal/Project";
import { createAppModel } from "./features/AppModel";
import { $steps } from "./features/react-app/features/History/model/model";
import { createSelectableListModel } from "./ui/SelectableList/createSelectableListModel";

export const appModel = createAppModel();

const actionTriggered = merge([
  debounce({
    source: historyAction.instrument(
      appModel.deviceModel.activeInstrument.updates,
    ),
    timeout: 200,
  }),
  debounce({
    source: historyAction.mode(appModel.deviceModel._mode.position.updates),
    timeout: 200,
  }),
  debounce({
    source: historyAction.ab(appModel.deviceModel._meta.$abMode.updates),
    timeout: 200,
  }),
  debounce({
    source: historyAction.bpm(appModel.deviceModel._bpm.position.updates),
    timeout: 200,
  }),
]);

$steps.on(actionTriggered, (state, action) => [...state, action]);

export const savedProjectslistModel = createSelectableListModel({
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

sample({
  clock: savedProjectslistModel.itemDeleteClicked.map(({ name }) => name),
  target: appModel.savedProjects.delete,
});

sample({
  clock: savedProjectslistModel.itemClicked.map(({ name }) => name),
  target: savedProjectslistModel.setInputValue,
});

sample({
  clock: appModel.savedProjects.save.done,
  target: [savedProjectslistModel.clearInput, appModel.uiModel.saveModal.close],
});

sample({
  clock: appModel.savedProjects.load.done,
  target: [savedProjectslistModel.clearInput, appModel.uiModel.loadModal.close],
});
