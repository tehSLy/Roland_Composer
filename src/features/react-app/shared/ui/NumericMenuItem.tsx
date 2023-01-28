import { Input } from './Input';
import { MenuItemWrapper } from './MenuItemWrapper';

type NumericMenuItemProps = {
  title: string;
  value?: number;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
};

export const NumericMenuItem = ({
  title,
  value = 0,
  onChange,
}: NumericMenuItemProps) => {
  return (
    <MenuItemWrapper>
      <span>{title}</span>
      <Input value={value} onChange={onChange} />
    </MenuItemWrapper>
  );
};
