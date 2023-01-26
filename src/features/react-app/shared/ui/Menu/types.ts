import { Store } from 'effector';
import { KeyAction } from '../../../../shared';

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
