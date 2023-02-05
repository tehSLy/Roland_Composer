import tw from "tailwind-styled-components";

type SidebarProps = {
  placement: "left" | "right";
};

export const Sidebar = tw.div<SidebarProps>`
  top-9
  h-[calc(100vh-2.25rem)]
  absolute
  bg-neutral-600
  no-scrollbar
  overflow-y-auto
  font-sans
  tracking-tight
  text-sm
  text-gray-300
  ${({ placement }) => placementMap[placement]}
`;

const placementMap = {
  left: "left-0",
  right: "right-0",
};
