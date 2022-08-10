import { StoreOrData } from "forest";
import { storeOrDataToStore } from "../../../lib/storeOrDataToStore";

const defaultTextColor = "text-gray-300";

/**
 * Resolves store with basic text style class
 * If no color/empty color is passed, returns default text-color class
 */
export const basicTextStyleClass = <C extends StoreOrData<string | null>>(
  color?: C
) => {
  return storeOrDataToStore(color, defaultTextColor).map(
    (color) => `font-sans tracking-tight text-sm ${color || defaultTextColor}`
  );
};
