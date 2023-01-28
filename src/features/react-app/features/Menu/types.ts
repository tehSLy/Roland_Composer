import { Store } from 'effector';
import { KeyAction } from '~/features/shared';

export type MenuItemSchema = {
  label: string;
  type?: 'button' | 'shortcut' | 'number' | 'submenu' | 'link';
  disabled?: boolean;
  onClick?: () => void;
  onChange?: (value: any) => void;
  meta: {
    children?: MenuItemSchema[];
    value?: Store<number>;
    shortcut?: KeyAction;
    href: string;
  };
};
