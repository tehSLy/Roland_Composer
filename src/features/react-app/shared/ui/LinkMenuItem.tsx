import { Store } from "effector";
import { useStore } from "effector-react";
import { StoreOrData } from "~/features/shared/StoreOrData";
import { MenuItemWrapper } from "./MenuItemWrapper";

type LinkMenuItemProps = {
  title: Store<string>;
  href: string;
};

export const LinkMenuItem = ({ title, href }: LinkMenuItemProps) => {
  const title_ = useStore(title);

  return (
    <li>
      <MenuItemWrapper $as={"a"} href={href}>
        {title_}
      </MenuItemWrapper>
    </li>
  );
};
