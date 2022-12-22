import { createEvent, sample, Store } from "effector";
import { h, remap } from "forest";
import { SelectableList } from "../../../ui/SelectableList";
import { SelectableListModel } from "../../../ui/SelectableList/createSelectableListModel";
import { Project } from "./Project";

export const ProjectsList = function ({
  model,
}: {
  model: SelectableListModel<Project>;
}) {
  SelectableList({
    item: (project) => ProjectListItem({ project, model }),
    model,
  });
};

function ProjectListItem({
  model,
  project,
}: {
  project: Store<Project>;
  model: SelectableListModel<Project>;
}) {
  const click = createEvent<any>();
  const clickDelete = createEvent<any>();
  sample({
    source: project,
    clock: click,
    target: model.itemClicked,
  });
  sample({
    source: project,
    clock: clickDelete,
    target: model.itemDeleteClicked,
  });

  h("div", {
    attr: {
      class:
        "flex items-center justify-between px-1 hover:bg-gray-600 hover:text-gray-100 cursor-pointer",
    },
    handler: {
      click,
    },
    fn() {
      h("div", {
        attr: {
          class: "flex items-center justify-between",
        },
        fn() {
          h("span", {
            text: remap(project, "name"),
          });

          h("span", {
            text: remap(project, "createdAt"),
          });
        },
      });
      h("button", {
        text: "×",
        attr: {
          class: "px-1 hover:bg-gray-500",
        },
        handler: {
          click: clickDelete,
        },
      });
    },
  });
}
