import { attach, forward, sample } from "effector";
import { Modal } from "../../../ui/Modal";
import { createSelectableListModel } from "../../../ui/SelectableList/createSelectableListModel";
import { AppModel } from "../../AppModel";
import { Project } from "./Project";
import { ProjectsList } from "./ProjectsLists";

export function SaveModal({ appModel: appModel }: { appModel: AppModel }) {
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

  appModel.uiModel.saveModal.isOpen.watch((is) =>
    is ? setTimeout(listModel.focus, 50) : null
  );

  sample({
    clock: appModel.uiModel.saveModal.isOpen,
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
    from: appModel.savedProjects.save.done,
    to: [listModel.clearInput, appModel.uiModel.saveModal.close],
  });

  return Modal({
    model: appModel.uiModel.saveModal,
    body() {
      ProjectsList({
        model: listModel,
      });
    },
    title: "Save Project in browser...",
    buttons: [
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
    ],
  });
}
