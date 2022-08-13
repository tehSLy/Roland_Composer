import { attach, forward, sample } from "effector";
import { Modal } from "../../../ui/Modal";
import { createSelectableListModel } from "../../../ui/SelectableList/createSelectableListModel";
import { AppModel } from "../../AppModel";
import { Project } from "./Project";
import { ProjectsList } from "./ProjectsLists";

export function LoadModal({ appModel: appModel }: { appModel: AppModel }) {
  const listModel = createSelectableListModel({
    items: appModel.savedProjects.list.map((projects) =>
      Object.entries(projects).map(
        ([key]) =>
          ({
            createdAt: "",
            name: key,
          } as Project)
      )
    ),
  });

  appModel.uiModel.loadModal.isOpen.watch((is) =>
    is ? setTimeout(listModel.focus, 50) : null
  );

  sample({
    clock: appModel.uiModel.loadModal.isOpen,
    filter: (is) => !is,
    target: listModel.clearInput,
  });

  sample({
    clock: listModel.itemClicked.map(({ name }) => name),
    target: listModel.setInputValue,
  });

  sample({
    clock: listModel.itemDeleteClicked.map(({ name }) => name),
    target: appModel.savedProjects.delete,
  });

  forward({
    from: appModel.savedProjects.load.done,
    to: [listModel.clearInput, appModel.uiModel.loadModal.close],
  });

  return Modal({
    model: appModel.uiModel.loadModal,
    body() {
      ProjectsList({
        model: listModel,
      });
    },
    title: "Load Project from browser...",
    buttons: [
      {
        handler: attach({
          effect: appModel.savedProjects.load,
          source: listModel.input,
        }),
        label: "Load",
      },
      {
        handler: appModel.uiModel.loadModal.close,
        label: "Cancel",
      },
    ],
  });
}
