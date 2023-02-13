import { Effect, Event, Store, Unit } from "effector";
import { useStore } from "effector-react";
import { StoreOrData } from "~/features/shared/StoreOrData";
import { Button } from "~/features/react-app/shared/ui/Button";
import { Typography } from "./Typography";
import { ModalModel } from "~/ui/Modal";

export type ModalButtonConfig = {
  disabled: StoreOrData<boolean>;
  label: StoreOrData<string>;
  handler: Effect<any, any> | Event<any>;
};

type ModalProps = {
  model: ModalModel;
  title: string;
  body: React.ReactNode;
  buttons: ModalButtonConfig[];
};

export const Modal = ({ model, title, buttons, body }: ModalProps) => {
  const isOpen = useStore(model.isOpen);

  if (!isOpen) return null;

  return (
    <ModalBackdrop>
      <div className="fixed z-10 inset-0 overflow-y-auto">
        <div className="flex items-end sm:items-center justify-center min-h-full text-center sm:p-0">
          <div className="relative bg-neutral-600 text-left overflow-hidden shadow-xl transform transition-all sm:max-w-lg sm:w-full mb-32 mt-8">
            <ModalHeader title={title} />
            <ModalContent content={body} />
            <div
              onClick={() => console.log("123")}
              className="px-1 flex items-center justify-end pb-1"
            >
              {buttons.map(({ label, disabled, handler }) => (
                <Button
                  title={label as Store<string>}
                  disabled={disabled as Store<boolean>}
                  onClick={() => handler(null)}
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

const ModalContent = ({ content }: { content: React.ReactNode }) => {
  return <div className="px-1 text-sm">{content}</div>;
};
