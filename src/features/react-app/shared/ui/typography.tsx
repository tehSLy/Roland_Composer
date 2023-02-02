import tw from "tailwind-styled-components";

type TypographyProps = {
  bold?: boolean;
};

export const Typography = tw.p<TypographyProps>`
  font-sans
  tracking-tight
  text-sm
  text-gray-300
  ${({ bold }) => bold && "font-bold"}
`;
