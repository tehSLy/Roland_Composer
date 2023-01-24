import { createStore, is, Store } from 'effector';
import { useStore } from 'effector-react';
import { Input } from './Input';
import { MenuItemWrapper } from './MenuItem';

type NumericMenuItemProps = {
  title: string;
  value?: Store<number>;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
};

export const NumericMenuItem = (props: NumericMenuItemProps) => {
  const { title, value = createStore(0), onChange = () => null } = props;

  const storeValue = useStore(value);

  return (
    <MenuItemWrapper>
      {title}
      <Input value={storeValue} width='16' onChange={onChange} />
    </MenuItemWrapper>
  );
};
