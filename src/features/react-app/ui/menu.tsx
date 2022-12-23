type MenuProps = {
  children?: React.ReactNode;
};

export const Menu = ({ children }: MenuProps) => {
  return <div className='py-1 bg-neutral-700 rounded-sm'>{children}</div>;
};
