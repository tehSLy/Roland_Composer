import { useList, useStore } from "effector-react";
import { SelectableListModel } from "~/ui/SelectableList/createSelectableListModel";
import { Input } from "./Input";
import tw from "tailwind-styled-components";

export const SelectableList = <T,>({
  model,
  item,
}: {
  item: (item: T, index: number) => React.ReactNode;
  model: SelectableListModel<T>;
}) => {
  const inputValue = useStore(model.input);
  const items = useList(model.items, item);

  return (
    <>
      <ListWrapper>{items}</ListWrapper>
      <Input
        autoFocus
        className="mb-1"
        value={inputValue}
        onChange={model.setInputValue.prepend((e) => e.target.value)}
      />
    </>
  );
};

const ListWrapper = tw.div`
  bg-neutral-800
  text-gray-200
  mb-1
  h-48
  overflow-y-auto
  no-scrollbar
`;
