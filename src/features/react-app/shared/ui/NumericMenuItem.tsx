import { Store } from "effector";
import { useStore } from "effector-react";
import { Input } from "./Input";
import { MenuItemWrapper } from "./MenuItemWrapper";

type NumericMenuItemProps = {
  title: Store<string>;
  value: Store<number>;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  onBlur?: React.FocusEventHandler<HTMLInputElement>;
};

export const NumericMenuItem = ({
  title: $title,
  value: $value,
  onChange,
  onBlur,
}: NumericMenuItemProps) => {
  const value = useStore($value);
  const title = useStore($title);

  return (
    <MenuItemWrapper>
      <span>{title}</span>
      <Input
        value={value}
        onBlur={onBlur}
        onChange={onChange}
        type="number"
        className="text-right"
      />
    </MenuItemWrapper>
  );
};
