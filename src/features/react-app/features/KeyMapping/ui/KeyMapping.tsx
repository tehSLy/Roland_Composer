import { useMemo } from "react";
import { keymapping } from "~/features/shared";
import { Sidebar } from "~shared/ui/Sidebar";
import { Table } from "~shared/ui/Table";
import { parseKeyMapping } from "../parseKeyMapping";

export const KeyMapping = () => {
  const parsedKeyMapping = useMemo(() => parseKeyMapping(keymapping), []);

  return (
    <Sidebar placement="right" className="w-96">
      <Table columns={["Action", "Keybinding"]} dataSource={parsedKeyMapping} />
    </Sidebar>
  );
};
