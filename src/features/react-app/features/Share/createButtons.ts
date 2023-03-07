import { parseModalButtons } from "~/features/react-app/shared/libs/parseModalButtons";
import { copyShareUrlClicked } from "./model";

export const createShareButtons = () => {
  return parseModalButtons([
    {
      label: "Copy & close",
      handler: copyShareUrlClicked,
      disabled: false,
    },
  ]);
};
