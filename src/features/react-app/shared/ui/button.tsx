import { Store } from "effector";
import { useStore } from "effector-react";
import tw from "tailwind-styled-components";

type ButtonProps = {
  title: Store<string>;
  disabled: Store<boolean>;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
};

export const Button = ({
  title: $title,
  disabled: $disabled,
  onClick,
}: ButtonProps) => {
  const title = useStore($title);
  const isDisabled = useStore($disabled);

  return (
    <ButtonWrapper onClick={onClick} disabled={isDisabled}>
      {title}
    </ButtonWrapper>
  );
};

const ButtonWrapper = tw.button`
  select-none
  font-sans
  tracking-tight
  text-sm
  text-gray-300
  rounded-md
  px-2
  py-1
  hover:bg-gray-500
  disabled:text-gray-800
  disabled:hover:bg-inherit
  disabled:cursor-default
`;
