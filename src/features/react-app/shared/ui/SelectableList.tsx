import { useList } from "effector-react";
import { SelectableListModel } from "~/ui/SelectableList/createSelectableListModel";
import { Input } from "./Input";

export const SelectableList = <T,>({
  model,
  item,
}: {
  item: (item: T, index: number) => React.ReactNode;
  model: SelectableListModel<T>;
}) => {
  const items = useList(model.items, item);

  return (
    <>
      <div className="bg-neutral-800 text-gray-200 mb-1 h-48 overflow-y-auto no-scrollbar">
        {items}
      </div>
      <Input
        className="mb-1"
        onChange={model.setInputValue.prepend((e) => e.target.value)}
      />
    </>
  );
};
