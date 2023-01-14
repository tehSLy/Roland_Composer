type MenuProps = {
  children?: React.ReactNode;
};

export const MenuList = ({ children }: MenuProps) => {
  return <ul className='py-1 bg-neutral-700 rounded-sm'>{children}</ul>;
};
