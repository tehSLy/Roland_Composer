import { MenuItemWrapper } from './MenuItemWrapper';

type LinkMenuItemProps = {
  title: string;
  href: string;
};

export const LinkMenuItem = ({ title, href }: LinkMenuItemProps) => {
  return (
    <li>
      <MenuItemWrapper $as={'a'} href={href}>
        {title}
      </MenuItemWrapper>
    </li>
  );
};
