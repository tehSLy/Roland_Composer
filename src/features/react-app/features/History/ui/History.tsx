import { Store } from "effector";
import { useStore } from "effector-react";
import { Typography } from "../../../shared/ui/Typography";
import { StepList } from "./StepList";
import tw from "tailwind-styled-components";

type HistoryProps = {
  visible: Store<boolean>;
};

export const History = ({ visible: $visible }: HistoryProps) => {
  const isVisible = useStore($visible);

  if (!isVisible) return null;

  return (
    <HistoryWrapper>
      <HistoryrHeader>
        <Typography bold>History</Typography>
      </HistoryrHeader>
      <StepList />
    </HistoryWrapper>
  );
};

const HistoryWrapper = tw.div`
  top-9
  h-[calc(100vh-2.25rem)]
  absolute
  bg-neutral-600
  w-48
  no-scrollbar
  overflow-y-auto
  font-sans
  tracking-tight
  text-sm
  text-gray-300
`;

const HistoryrHeader = tw.div`
  px-4
  py-1
  border-neutral-400
  border-solid
  border-0
  border-b-4
  sticky
  top-0
`;
