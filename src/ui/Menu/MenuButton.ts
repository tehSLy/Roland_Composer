import { createStore, is } from "effector";
import { styled } from "foliage";
import { spec, StoreOrData } from "forest";
import { basicTextStyle } from "../shared/styles/basicTextStyle";

export const MenuButton = ({
  text,
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

    basicTextStyle({
      class:
        "rounded-md px-2 py-1 hover:bg-gray-500 disabled:text-gray-800 disabled:hover:bg-inherit disabled:cursor-default",
    });
  });
};

const Btn = styled.button`
  /* cursor: pointer; */
  user-select: none;
`;
