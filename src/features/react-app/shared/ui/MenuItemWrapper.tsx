import tw from "tailwind-styled-components";

type MenuItemWrapperProps = {
  disabled?: boolean;
};

export const MenuItemWrapper = tw.li<MenuItemWrapperProps>`
  relative
  whitespace-nowrap
  cursor-pointer
  text-left
  px-5
  py-1
  w-full
  grid
  grid-cols-[auto_minmax(auto,4rem)]
  items-end
  gap-x-4
  font-sans
  tracking-tight
  text-sm 
  hover:text-gray-100 
  hover:bg-slate-500 
  text-gray-300
  ${({ disabled }) =>
    disabled &&
    "text-neutral-400 hover:bg-inherit hover:text-neutral-400 cursor-default"}
  `;
