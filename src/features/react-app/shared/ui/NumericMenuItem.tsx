import { Store } from "effector";
import { useStore } from "effector-react";
import { Input } from "./Input";
import { MenuItemWrapper } from "./MenuItemWrapper";

type NumericMenuItemProps = {
  title: Store<string>;
  value: Store<number>;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
};

export const NumericMenuItem = ({
  title,
  value,
  onChange,
}: NumericMenuItemProps) => {
  const storeValue = useStore(value);
  const storeTitle = useStore(title);

  return (
    <MenuItemWrapper>
      <span>{storeTitle}</span>
      <Input value={storeValue} onChange={onChange} />
    </MenuItemWrapper>
  );
};
