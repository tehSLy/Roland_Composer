import { Effect, Event, Store } from "effector";
import { useStore } from "effector-react";
import { StoreOrData } from "~/features/shared/StoreOrData";
import { Button } from "~/features/react-app/shared/ui/Button";
import { Typography } from "./Typography";
import { ModalModel } from "~/ui/Modal";

import tw from "tailwind-styled-components";

export type ModalButtonConfig = {
  disabled: StoreOrData<boolean>;
  label: StoreOrData<string>;
  handler: Event<any> | Effect<any, any, any>;
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
    <ModalBackdrop onClick={() => model.close()}>
      <ModalWrapper onClick={(evt) => evt.stopPropagation()}>
        <ModalHeader title={title} onClose={() => model.close()} />
        <ModalContent>{body}</ModalContent>
        <ModalActions>
          {buttons.map(({ label, disabled, handler }) => (
            <Button
              title={label as Store<string>}
              disabled={disabled as Store<boolean>}
              onClick={() => handler(null)}
            />
          ))}
        </ModalActions>
      </ModalWrapper>
    </ModalBackdrop>
  );
};

const ModalHeader = ({
  title,
  onClose,
}: {
  title: string;
  onClose: React.MouseEventHandler<HTMLButtonElement>;
}) => {
  return (
    <div className="flex flex-row justify-between">
      <Typography bold className="p-1">
        {title}
      </Typography>
      <button
        onClick={onClose}
        className="w-8 flex text-sm text-gray-300 items-center justify-center hover:bg-red-800 hover:text-gray-100"
      >
        ×
      </button>
    </div>
  );
};

const ModalBackdrop = tw.div`
  fixed
  inset-0
  bg-gray-500
  bg-opacity-75
  transition-opacity
  z-10
  overflow-y-auto
  flex
  items-end
  sm:items-center
  justify-center
  min-h-full
  text-center
  sm:p-0
`;

const ModalWrapper = tw.div`
  relative
  bg-neutral-600
  text-left
  overflow-hidden
  shadow-xl
  transform
  transition-all
  sm:max-w-lg
  sm:w-full
  mb-32
  mt-8
`;

const ModalActions = tw.div`
  mt-2
  px-1
  flex
  items-center
  justify-end
  pb-1
`;

const ModalContent = tw.div`
  px-1
  text-sm
`;
