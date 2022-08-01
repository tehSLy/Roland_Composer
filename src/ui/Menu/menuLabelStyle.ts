import { combine } from "effector";
import { spec, StoreOrData } from "forest";
import { storeOrDataToStore } from "../../lib/storeOrDataToStore";

const defaultTextColor = "text-gray-300";

export const menuLabelStyle = (config: {
  class?: StoreOrData<string>;
  textColor?: StoreOrData<string | null>;
}) => {
  const $class = storeOrDataToStore(config.class, "");
  const $color = storeOrDataToStore(config.textColor, defaultTextColor);
  spec({
    attr: {
      class: combine(
        $class,
        $color,
        (additionalClass, textColor) =>
          `font-sans tracking-tight text-sm ${additionalClass} ${
            textColor ?? defaultTextColor
          }`
      ),
    },
  });
};

function foo() {}
