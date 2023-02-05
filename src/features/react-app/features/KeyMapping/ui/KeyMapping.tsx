import { useMemo } from "react";
import { Store } from "effector";
import { keymapping } from "~/features/shared";
import { Sidebar } from "~shared/ui/Sidebar";
import { Table } from "~shared/ui/Table";
import { parseKeyMapping } from "../parseKeyMapping";
import { useStore } from "effector-react";

type KeyMappingProps = {
  visible: Store<boolean>;
};

export const KeyMapping = ({ visible: $visible }: KeyMappingProps) => {
  const isVisible = useStore($visible);

  const parsedKeyMapping = useMemo(() => parseKeyMapping(keymapping), []);

  if (!isVisible) return null;

  return (
    <Sidebar placement="right" className="w-96">
      <Table columns={["Action", "Keybinding"]} dataSource={parsedKeyMapping} />
    </Sidebar>
  );
};
