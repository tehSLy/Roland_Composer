import { createStore } from "effector";
import { useStore } from "effector-react";
import { useMemo } from "react";
import { AppModel } from "~/features/AppModel";
import { Input } from "~/features/react-app/shared/ui/Input";
import { Modal } from "~/features/react-app/shared/ui/Modal";
import { createShareButtons } from "../createButtons";
import { $shareInputValue } from "../model";

type ShareModalProps = {
  appModel: AppModel;
};

export const ShareModal = ({ appModel }: ShareModalProps) => {
  const shareInputValue = useStore($shareInputValue);

  const shareModalButtons = useMemo(() => createShareButtons(), []);

  return (
    <Modal
      model={appModel.uiModel.shareModal}
      title="Share project..."
      body={
        <Input
          readOnly
          autoFocus
          onClick={(evt) => evt.currentTarget.select()}
          value={shareInputValue}
        />
      }
      buttons={shareModalButtons}
    />
  );
};
