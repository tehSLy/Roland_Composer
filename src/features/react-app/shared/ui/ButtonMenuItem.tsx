import { Store } from "effector";
import { useStore } from "effector-react";
import { KeyAction, resolveKeyLabel, resolveShortcut } from "~/features/shared";
import { MenuItemWrapper } from "./MenuItemWrapper";

type ButtonMenuItemProps = {
  title: Store<string>;
  disabled: Store<boolean>;
  shortcut?: Store<KeyAction>;
};

export const ButtonMenuItem = ({
  title,
  disabled,
  shortcut,
}: ButtonMenuItemProps) => {
  const storeTitle = useStore(title);
  const storeDisabled = useStore(disabled);

  if (!shortcut) {
    return (
      <MenuItemWrapper disabled={storeDisabled}>{storeTitle}</MenuItemWrapper>
    );
  }

  const storeShortcut = useStore(shortcut);

  const resolvedShortcut = resolveKeyLabel(resolveShortcut(storeShortcut));

  return (
    <MenuItemWrapper disabled={storeDisabled}>
      {storeTitle}
      <span>{resolvedShortcut}</span>
    </MenuItemWrapper>
  );
};
