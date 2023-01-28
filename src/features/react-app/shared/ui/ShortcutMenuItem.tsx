import { KeyAction, resolveKeyLabel, resolveShortcut } from '~/features/shared';
import { MenuItemWrapper } from './MenuItemWrapper';

type ShortcutMenuItem = {
  title: string;
  shortcut?: KeyAction;
};

export const ShortcutMenuItem = ({ title, shortcut }: ShortcutMenuItem) => {
  if (!shortcut) return <MenuItemWrapper>{title}</MenuItemWrapper>;

  const resolvedShortcut = resolveKeyLabel(resolveShortcut(shortcut));

  return (
    <MenuItemWrapper>
      {title}
      <span>{resolvedShortcut}</span>
    </MenuItemWrapper>
  );
};
