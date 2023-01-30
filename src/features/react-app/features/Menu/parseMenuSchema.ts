import { KeyAction } from "~/features/shared";
import { storeOrDataToStore } from "~/features/shared/libs/storeOrDataToStore";
import { MenuDropdownSchema, MenuItem } from "./types";

export const parseMenuSchema = (schema: MenuDropdownSchema[]) => {
  return schema.map((schemaItem) => {
    const newSchemaItem = { ...schemaItem };

    newSchemaItem.disabled = storeOrDataToStore(schemaItem.disabled, false);
    newSchemaItem.visible = storeOrDataToStore(schemaItem.visible, true);
    newSchemaItem.label = storeOrDataToStore(schemaItem.label, "");
    newSchemaItem.children = schemaItem.children.map(parseSchemaChild);

    return newSchemaItem;
  });
};

const parseSchemaChild = (child: MenuItem) => {
  child.disabled = storeOrDataToStore(child.disabled, false);
  child.label = storeOrDataToStore(child.label, "");
  child.visible = storeOrDataToStore(child.visible, true);
  child.meta = parseMeta(child);

  return child;
};

const parseMeta = (child: MenuItem) => {
  const newMeta = { ...child.meta } as any;

  switch (child.type) {
    case "button":
      newMeta.shortcut = storeOrDataToStore(
        child.meta.shortcut as KeyAction,
        "",
      );
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
