import { useStore } from 'effector-react';
import { Store } from 'effector';

interface InputProps extends React.ComponentPropsWithoutRef<'input'> {
  width?: string;
  value: any;
}

export const Input = ({ value, width = 'auto', ...props }: InputProps) => {
  const storeValue = useStore(value as Store<string>);

  return (
    <input
      {...props}
      value={storeValue}
      className={`rounded-sm focus:outline-none focus:border-neutral-700 focus:ring-neutral-700 focus:ring-2 text-gray-200 bg-neutral-500 px-1 w-${width} text-right`}
    />
  );
};
