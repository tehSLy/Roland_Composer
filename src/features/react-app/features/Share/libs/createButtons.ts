import { AppModel } from "~/features/AppModel";
import { parseModalButtons } from "~/features/react-app/shared/libs/parseModalButtons";
import { copyShareUrlClicked } from "../model";

export const createShareButtons = (appModel: AppModel) => {
  return parseModalButtons([
    {
      label: "Copy",
      handler: copyShareUrlClicked,
      disabled: false,
    },
    {
      label: "Close",
      handler: appModel.uiModel.shareModal.close,
      disabled: false,
    },
  ]);
};
