type TypographyProps = {
  children?: React.ReactNode;
};

export const Typography = ({ children }: TypographyProps) => {
  return (
    <p className='font-sans tracking-tight text-sm text-gray-300'>{children}</p>
  );
};
