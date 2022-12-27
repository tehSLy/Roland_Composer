import { MenuItemSchema } from '../create-schema';
import { DropdownButton } from './dropdown-button';
import { Input } from './input';
import { MenuItem } from './menu-item';
import { MenuList } from './menu-list';
import { NestedMenuItem } from './nested-menu-item';

type MenuProps = {
  schema: MenuItemSchema[];
};

export const Menu = ({ schema }: MenuProps) => {
  return (
    <>
      {schema.map((menuItem) => (
        <DropdownButton title={menuItem.label}>
          <MenuList>
            {menuItem.children.map((dropdownMenuItem) => {
              const { meta } = dropdownMenuItem;

              if (meta.children) {
                return (
                  <NestedMenuItem title={dropdownMenuItem.label}>
                    <MenuList>
                      {meta.children.map((nestedMenuItem) => (
                        <MenuItem>{nestedMenuItem.label}</MenuItem>
                      ))}
                    </MenuList>
                  </NestedMenuItem>
                );
              }

              return dropdownMenuItem.meta.url ? (
                <a href={dropdownMenuItem.meta.url}>
                  <MenuItem disabled={dropdownMenuItem.disabled}>
                    {dropdownMenuItem.label}
                    {dropdownMenuItem.shortcut && (
                      <span>{dropdownMenuItem.shortcut}</span>
                    )}
                    {dropdownMenuItem.meta.type === 'number' && (
                      <Input
                        width='16'
                        type='number'
                        value={dropdownMenuItem.meta.value}
                        onChange={(evt) =>
                          dropdownMenuItem.meta.handler?.(
                            Number(evt.currentTarget.value)
                          )
                        }
                      />
                    )}
                  </MenuItem>
                </a>
              ) : (
                <MenuItem disabled={dropdownMenuItem.disabled}>
                  {dropdownMenuItem.label}
                  {dropdownMenuItem.shortcut && (
                    <span>{dropdownMenuItem.shortcut}</span>
                  )}
                  {dropdownMenuItem.meta.type === 'number' && (
                    <Input
                      width='16'
                      type='number'
                      value={dropdownMenuItem.meta.value}
                      onChange={(evt) =>
                        dropdownMenuItem.meta.handler?.(
                          Number(evt.currentTarget.value)
                        )
                      }
                    />
                  )}
                </MenuItem>
              );
            })}
          </MenuList>
        </DropdownButton>
      ))}
    </>
  );
};
