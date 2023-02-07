import { Store } from "effector";
import { useStore } from "effector-react";
import { Divider } from "~shared/ui/Divider";
import { Typography } from "~shared/ui/Typography";
import { Sidebar } from "~shared/ui/Sidebar";
import { StepList } from "./StepList";

type HistoryProps = {
  visible: Store<boolean>;
};

export const History = ({ visible: $visible }: HistoryProps) => {
  const isVisible = useStore($visible);

  if (!isVisible) return null;

  return (
    <Sidebar placement="left" className="w-48">
      <div className="sticky top-0 bg-neutral-600">
        <Typography bold className="px-4 py-1">
          History
        </Typography>
        <Divider />
      </div>
      <StepList />
    </Sidebar>
  );
};
