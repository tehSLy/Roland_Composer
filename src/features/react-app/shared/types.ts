export type Placement = 'rightTop' | 'bottomLeft';

export type MenuItemSchema = {
  label?: string;
  type?: 'button';
  children?: MenuItemSchema[];
  extra?: React.ReactNode;
  disabled?: boolean;
  href?: string;
  onClick?: () => void;
};
