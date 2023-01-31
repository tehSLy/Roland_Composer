import { Store } from "effector";
import { useStore } from "effector-react";
import { MenuItemWrapper } from "./MenuItemWrapper";

type LinkMenuItemProps = {
  title: Store<string>;
  href: string;
};

export const LinkMenuItem = ({ title: $title, href }: LinkMenuItemProps) => {
  const title = useStore($title);

  return (
    <li>
      <MenuItemWrapper $as={"a"} href={href}>
        {title}
      </MenuItemWrapper>
    </li>
  );
};
