import { Store } from "effector";
import { useStore, useStoreMap } from "effector-react";
import { KeyAction, resolveKeyLabel, resolveShortcut } from "~/features/shared";
import { MenuItemWrapper } from "./MenuItemWrapper";

type ButtonMenuItemProps = {
  title: Store<string>;
  disabled: Store<boolean>;
  shortcut: Store<KeyAction>;
};

export const ButtonMenuItem = ({
  title: $title,
  disabled: $disabled,
  shortcut: $shortcut,
}: ButtonMenuItemProps) => {
  const title = useStore($title);
  const isDisabled = useStore($disabled);

  const resolvedShortcut = useStoreMap({
    store: $shortcut,
    keys: [],
    fn: (shortcut) =>
      shortcut ? resolveKeyLabel(resolveShortcut(shortcut)) : "",
  });

  return (
    <MenuItemWrapper disabled={isDisabled}>
      {title}
      {resolvedShortcut && <span>{resolvedShortcut}</span>}
    </MenuItemWrapper>
  );
};
