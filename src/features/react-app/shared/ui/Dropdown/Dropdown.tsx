import { Placement } from "./types";
import tw from "tailwind-styled-components";

type DropdownProps = {
  anchorComponent?: React.ReactNode;
  placement?: Placement;
  children?: React.ReactNode;
};

export const Dropdown = ({
  anchorComponent,
  placement = "bottomLeft",

  children,
}: DropdownProps) => {
  return (
    <DropdownWrapper>
      {anchorComponent}
      <DropdownMenuWrapper placement={placement}>
        {children}
      </DropdownMenuWrapper>
    </DropdownWrapper>
  );
};

const DropdownWrapper = tw.span`
  relative
  [&:hover>*:nth-child(2)]:block
  [&:hover>li]:bg-slate-500 
  [&:hover>li]:text-gray-100 
`;

const DropdownMenuWrapper = tw.div<{ placement: Placement }>`
  absolute
  py-1
  rounded-sm
  bg-neutral-700
  hidden
  ${({ placement }) => placementMap[placement]}
`;

const placementMap: Record<Placement, string> = {
  rightTop: "-top-1 left-full",
  bottomLeft: "left-0",
};
