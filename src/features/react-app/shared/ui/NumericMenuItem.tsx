import { createStore, is, Store } from 'effector';
import { useStore } from 'effector-react';
import { Input } from './Input';
import { MenuItemWrapper } from './MenuItemWrapper';

type NumericMenuItemProps = {
  title: string;
  value?: Store<number>;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
};

export const NumericMenuItem = ({
  title,
  value = createStore(0),
  onChange = () => null,
}: NumericMenuItemProps) => {
  const storeValue = useStore(value);

  return (
    <MenuItemWrapper>
      <span>{title}</span>
      <Input value={storeValue} onChange={onChange} />
    </MenuItemWrapper>
  );
};
