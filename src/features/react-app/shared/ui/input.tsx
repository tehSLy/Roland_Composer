import { useStore } from 'effector-react';
import { Store } from 'effector';
import tw from 'tailwind-styled-components';

interface InputProps extends React.ComponentPropsWithoutRef<'input'> {
  width?: string;
  value: any;
}

export const Input = ({ value, width = 'auto', ...props }: InputProps) => {
  const storeValue = useStore(value as Store<string>);

  return <InputStyled {...props} value={storeValue} width={width} />;
};

const InputStyled = tw.input<InputProps>`
  ${({ width }) => `w-${width}`}
  rounded-sm
  focus:outline-none
  focus:border-neutral-700
  focus:ring-neutral-700
  focus:ring-2
  text-gray-200
  text-right
  bg-neutral-500 px-1 
`;
