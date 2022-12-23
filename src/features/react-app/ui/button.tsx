interface ButtonProps extends React.ComponentPropsWithoutRef<'button'> {}

export const Button = ({ ...props }: ButtonProps) => {
  return (
    <button
      {...props}
      className='select-none font-sans tracking-tight text-sm text-gray-300 rounded-md px-2 py-1 hover:bg-gray-500 disabled:text-gray-800 disabled:hover:bg-inherit disabled:cursor-default'
    ></button>
  );
};
