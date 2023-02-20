import { Project } from "~/features/App/SaveLoadModal/Project";
import { SelectableList } from "~shared/ui/SelectableList";
import { SelectableListModel } from "~/ui/SelectableList/createSelectableListModel";

export const ProjectsList = ({
  model,
}: {
  model: SelectableListModel<Project>;
}) => {
  return (
    <SelectableList
      model={model}
      item={(project) => <ProjectListItem project={project} model={model} />}
    />
  );
};

const ProjectListItem = ({
  model,
  project,
}: {
  project: Project;
  model: SelectableListModel<Project>;
}) => {
  const handleClick = () => {
    model.itemClicked(project);
  };

  const handleDeleteClick = () => {
    model.itemDeleteClicked(project);
  };

  return (
    <div
      onClick={handleClick}
      className="flex items-center justify-between px-1 hover:bg-gray-600 hover:text-gray-100 cursor-pointer"
    >
      <div className="flex items-center justify-between">
        <span>{project.name}</span>
        <span>{project.createdAt}</span>
      </div>
      <button onClick={handleDeleteClick} className="px-1 hover:bg-gray-500">
        ×
      </button>
    </div>
  );
};
