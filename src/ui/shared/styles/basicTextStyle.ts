import { combine } from "effector";
import { spec, StoreOrData } from "forest";
import { storeOrDataToStore } from "../../../lib/storeOrDataToStore";
import { basicTextStyleClass } from "..";

export const basicTextStyle = (config?: {
  class?: StoreOrData<string>;
  textColor?: StoreOrData<string | null>;
}) => {
  const $class = storeOrDataToStore(config?.class, "");
  const $textStyle = basicTextStyleClass(config?.textColor);

  spec({
    attr: {
      class: combine(
        $class,
        $textStyle,
        (additionalClass, textStyle) => `${additionalClass} ${textStyle}`
      ),
    },
  });
};
