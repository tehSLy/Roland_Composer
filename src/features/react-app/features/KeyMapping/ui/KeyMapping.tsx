import { useMemo } from "react";
import { Store } from "effector";
import { useStore } from "effector-react";
import { keymapping } from "~/features/shared";
import { Divider } from "~shared/ui/Divider";
import { Typography } from "~shared/ui/Typography";
import { Sidebar } from "~shared/ui/Sidebar";
import { parseKeyMapping } from "../parseKeyMapping";
import tw from "tailwind-styled-components";

type KeyMappingProps = {
  visible: Store<boolean>;
};

export const KeyMapping = ({ visible: $visible }: KeyMappingProps) => {
  const isVisible = useStore($visible);
  const parsedKeyMapping = useMemo(() => parseKeyMapping(keymapping), []);

  if (!isVisible) return null;

  return (
    <Sidebar placement="right" className="w-96">
      <ul>
        <ListItem>
          <Typography bold>Action</Typography>
          <Typography bold>Keybinding</Typography>
        </ListItem>
        <Divider />
        {parsedKeyMapping.map(([action, keybind]) => {
          return (
            <ListItem className="odd:bg-neutral-700">
              <Typography>{action}</Typography>
              <Typography>{keybind}</Typography>
            </ListItem>
          );
        })}
      </ul>
    </Sidebar>
  );
};

const ListItem = tw.li`
  grid
  grid-cols-[3fr_2fr]
  px-4
  py-1
`;
