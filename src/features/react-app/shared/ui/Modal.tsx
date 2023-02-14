import { Store } from "effector";
import { Project } from "~/features/App/SaveLoadModal/Project";
import { SelectableListModel } from "~/ui/SelectableList/createSelectableListModel";
import { Button } from "./Button";
import { Input } from "./Input";
import { Typography } from "./Typography";

type ModalButtonConfig = {
  disabled: Store<boolean>;
  label: Store<string>;
};

type ModalProps = {
  open?: Store<boolean>;
  title: string;
  buttons: ModalButtonConfig[];
};

export const Modal = ({ open: $open, title, buttons }: ModalProps) => {
  // const isOpen = useStore($open);

  // if (isOpen) return null;

  return (
    <ModalBackdrop>
      <div className="fixed z-10 inset-0 overflow-y-auto">
        <div className="flex items-end sm:items-center justify-center min-h-full text-center sm:p-0">
          <div className="relative bg-neutral-600 text-left overflow-hidden shadow-xl transform transition-all sm:max-w-lg sm:w-full mb-32 mt-8">
            <ModalHeader title={title} />
            <ModalContent />
            <div className="px-1 flex items-center justify-end pb-1">
              {buttons.map(({ label, disabled }) => (
                <Button
                  title={label as Store<string>}
                  disabled={disabled as Store<boolean>}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </ModalBackdrop>
  );
};

const ModalBackdrop = ({ children }: { children?: React.ReactNode }) => {
  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity">
      {children}
    </div>
  );
};

const ModalHeader = ({ title }: { title: string }) => {
  return (
    <div className="flex flex-row justify-between">
      <Typography bold className="p-1">
        {title}
      </Typography>
      <button className="w-8 flex text-sm text-gray-300 items-center justify-center hover:bg-red-800 hover:text-gray-100">
        ×
      </button>
    </div>
  );
};

const ModalContent = ({ children }: { children?: React.ReactNode }) => {
  return (
    <div className="px-1">
      <SelectableList />
    </div>
  );
};

const ProjectsList = ({ model }: { model: SelectableListModel<Project> }) => {
  return (
    <div className="flex items-center justify-between px-1 hover:bg-gray-600 hover:text-gray-100 cursor-pointer">
      <div className="flex items-center justify-between">
        <span>ProjectName</span>
        <span>ProjectCreatedAt</span>
      </div>
      <button className="px-1 hover:bg-gray-500">×</button>
    </div>
  );
};

const SelectableList = () => {
  return (
    <>
      <div className="bg-neutral-800 text-gray-200  h-48 overflow-y-auto no-scrollbar"></div>
      <Input className="mb-1" />
    </>
  );
};
