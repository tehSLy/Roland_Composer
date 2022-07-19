import { createStore, is } from "effector";
import { styled } from "foliage";
import { spec, StoreOrData } from "forest";
import { menuLabelStyle } from "./menuLabelStyle";

export const MenuButton = ({
  text,
  fn,
  disabled,
}: {
  text: StoreOrData<string>;
  fn?: () => void;
  disabled?: StoreOrData<boolean>;
}) => {
  Btn(() => {
    spec({
      attr: {
        disabled: is.store(disabled)
          ? disabled
          : createStore((disabled as boolean) || false),
      },
      text,
    });

    menuLabelStyle(
      "rounded-md px-2 py-1 hover:bg-gray-500 disabled:text-gray-800 disabled:hover:bg-inherit"
    );
  });
};

const Btn = styled.button`
  cursor: pointer;
  user-select: none;
`;
