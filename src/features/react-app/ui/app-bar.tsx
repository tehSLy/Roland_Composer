import { Store, Event } from 'effector';
import { AppModel } from '../../AppModel';
import { resolveKeyLabel, resolveShortcut } from '../../shared';
import { DropdownButton } from './dropdown-button';
import { Menu } from './menu';
import { MenuItem } from './menu-item';
import { NestedMenuItem } from './nested-menu-item';
import { Typography } from './typography';

type MenuItemChildrenSchema = {
  label?: string;
  handler?: () => void;
  shortcut?: string;
  meta?: {
    type?: 'number' | 'list' | 'link';
    from?: 60;
    to?: 220;
    value?: Store<number>;
    handler?: Event<number>;
    url?: string;
    openIn?: string;
    children?: MenuItemChildrenSchema[];
  };
  disabled?: boolean;
};

type MenuItemSchema = {
  label: string;
  children: MenuItemChildrenSchema[];
};

type AppBarProps = {
  title: string;
  appModel: AppModel;
};

const filePickerApiAvailable =
  'showSaveFilePicker' in window && 'showOpenFilePicker' in window;

export const AppBar = ({ appModel, title }: AppBarProps) => {
  const schema: MenuItemSchema[] = [
    {
      label: 'Menu',
      children: [
        {
          label: 'Save...',
          // shortcut: "Ctrl + S",
          handler: appModel.uiModel.saveModal.open,
          meta: {},
          disabled: false,
        },
        {
          label: 'Load...',
          handler: appModel.uiModel.loadModal.open,
          meta: {},
          disabled: false,
        },
        {
          label: 'Import...',
          handler: appModel.import,
          meta: {},
          disabled: !filePickerApiAvailable,
        },
        {
          label: 'Export...',
          handler: appModel.export,
          meta: {},
          disabled: !filePickerApiAvailable,
        },
        {
          label: 'Render...',
          meta: {},
          disabled: true,
        },
        {
          label: 'Share...',
          handler: appModel.share,
          meta: {},
          disabled: false,
        },
      ],
    },
    {
      label: 'Composer',
      children: [
        {
          label: 'Set BPM',
          meta: {
            type: 'number',
            from: 60,
            to: 220,
            value: appModel.deviceModel._bpm.position,
            handler: appModel.deviceModel._bpm.setPosition,
          },
          disabled: false,
        },
        {
          label: 'Start/Stop',
          handler: appModel.deviceModel.togglePlay,
          shortcut: resolveShortcut('startStop'),
          meta: {},
          disabled: false,
        },
        {
          label: 'Cycle A/B',
          handler: appModel.deviceModel.cycleABModes,
          shortcut: resolveKeyLabel(resolveShortcut('cycleAb')),
          meta: {},
          disabled: false,
        },
        {
          label: 'Clear Pattern',
          handler: appModel.deviceModel.clearPattern,
          meta: {},
          disabled: false,
        },
        {
          label: 'Fill in...',
          meta: {
            type: 'list',
            children: [
              {
                label: 'Every 2th',
                handler: appModel.deviceModel.fillInEvery.prepend(
                  (_: void) => 2
                ),
              },
              {
                label: 'Every 4th',
                handler: appModel.deviceModel.fillInEvery.prepend(
                  (_: void) => 4
                ),
              },
              {
                label: 'Every 8th',
                handler: appModel.deviceModel.fillInEvery.prepend(
                  (_: void) => 8
                ),
              },
            ],
          },
          disabled: false,
        },
      ],
    },
    {
      label: 'View',
      children: [
        {
          label: 'ToggleKey bindings',
          handler: appModel.uiModel.toggleKeybindingsVisible,
          meta: {},
          disabled: false,
        },
        {
          label: 'Toggle History',
          handler: appModel.uiModel.toggleHistoryVisible,
          meta: {},
          disabled: false,
        },
      ],
    },
    {
      label: 'Help',
      children: [
        {
          label: 'Open manual...',
          meta: {
            type: 'link',
            url: 'http://cdn.roland.com/assets/media/pdf/TR-808_OM.pdf',
            openIn: 'newTab',
          },
          disabled: false,
        },
        {
          label: 'About...',
          handler: appModel.uiModel.aboutModal.open,
          meta: {},
          disabled: false,
        },
      ],
    },
  ];

  return (
    <div className='w-screen absolute right-0 top-0 bg-neutral-600 p-1 flex flex-row h-9 justify-center items-center'>
      <div className='mr-auto'>
        {schema.map((item) => (
          <DropdownButton title={item.label}>
            <Menu>
              {item.children.map((children) => {
                if (children.meta?.children) {
                  return (
                    <NestedMenuItem title={children.label}>
                      <Menu>
                        {children.meta.children.map((item) => (
                          <MenuItem
                            disabled={item.disabled}
                            meta={item?.meta}
                            shortcut={item?.shortcut}
                          >
                            {item.label}
                          </MenuItem>
                        ))}
                      </Menu>
                    </NestedMenuItem>
                  );
                }

                return (
                  <MenuItem
                    disabled={children.disabled}
                    meta={children?.meta}
                    shortcut={children?.shortcut}
                  >
                    {children.label}
                  </MenuItem>
                );
              })}
            </Menu>
          </DropdownButton>
        ))}
      </div>
      <div className='absolute'>
        <Typography>{title}</Typography>
      </div>
    </div>
  );
};
