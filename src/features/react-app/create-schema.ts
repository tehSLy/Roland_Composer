import { Store, Event } from 'effector';
import { AppModel } from '../AppModel';
import { resolveKeyLabel, resolveShortcut } from '../shared';

type MenuItemChildrenSchema = {
  label?: string;
  handler?: () => void;
  shortcut?: string;
  meta: {
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

export type MenuItemSchema = {
  label: string;
  children: MenuItemChildrenSchema[];
};

const filePickerApiAvailable =
  'showSaveFilePicker' in window && 'showOpenFilePicker' in window;

export const createSchema = (appModel: AppModel): MenuItemSchema[] => {
  return [
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
                meta: {},
              },
              {
                label: 'Every 4th',
                handler: appModel.deviceModel.fillInEvery.prepend(
                  (_: void) => 4
                ),
                meta: {},
              },
              {
                label: 'Every 8th',
                handler: appModel.deviceModel.fillInEvery.prepend(
                  (_: void) => 8
                ),
                meta: {},
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
};
