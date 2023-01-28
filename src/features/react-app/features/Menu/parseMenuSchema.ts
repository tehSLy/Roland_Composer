import { storeOrDataToStore } from "~/lib/storeOrDataToStore";
import {
	MenuCommandSchema, MenuDropdownSchema
} from "./types";

export const parseMenuSchema = (schema: MenuDropdownSchema[]) => {
  return schema.map((schemaItem) => {
    schemaItem.disabled = storeOrDataToStore(schemaItem.disabled, false);
    schemaItem.visible = storeOrDataToStore(schemaItem.visible, true);
    schemaItem.label = storeOrDataToStore(schemaItem.label, "");
    schemaItem.children = schemaItem.children.map(parseSchemaChild);
  });
};

const parseSchemaChild = (child: MenuCommandSchema) => {
  child.disabled = storeOrDataToStore(child.disabled, false);
  child.label = storeOrDataToStore(child.label, "");
  child.visible = storeOrDataToStore(child.visible, true);
  child.meta = parseMeta(child);

  return child;
};

const parseMeta = (child: MenuCommandSchema) => {
  const newMeta = { ...child.meta } as any;

  switch (child.type) {
    case "button":
      newMeta.shortcut = storeOrDataToStore(child.meta.shortcut, "");
      break;

    case "list":
      newMeta.children = storeOrDataToStore(child.meta.children, []);
      break;

    case "submenu":
      newMeta.children = child.meta.children.map(parseSchemaChild);
      break;

    case "number":
      newMeta.value = storeOrDataToStore(child.meta.value, 0);
      break;
  }

  return newMeta as (typeof child)["meta"];
};
