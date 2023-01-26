import tw from 'tailwind-styled-components';

type InputProps = {
  width?: string;
};

export const Input = tw.input<InputProps>`
  rounded-sm
  focus:outline-none
  focus:border-neutral-700
  focus:ring-neutral-700
  focus:ring-2
  text-gray-200
  text-right
  bg-neutral-500 px-1 
`;
