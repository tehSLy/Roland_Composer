import { AppModel } from '~/features/AppModel';
import { MenuItemSchema } from '~features/Menu/types';

const filePickerApiAvailable =
  'showSaveFilePicker' in window && 'showOpenFilePicker' in window;

export const createMenuItems = (appModel: AppModel): MenuItemSchema[] => [
  {
    label: 'Menu',
    type: 'button',
    meta: {
      href: '',
      children: [
        {
          label: 'Save...',
          onClick: appModel.uiModel.saveModal.open,
          meta: {
            href: '',
          },
        },
        {
          label: 'Load...',
          onClick: appModel.uiModel.loadModal.open,
          meta: {
            href: '',
          },
        },
        {
          label: 'Import...',
          onClick: appModel.import,
          disabled: !filePickerApiAvailable,
          meta: {
            href: '',
          },
        },
        {
          label: 'Export...',
          onClick: appModel.export,
          disabled: !filePickerApiAvailable,
          meta: {
            href: '',
          },
        },
        {
          label: 'Render...',
          disabled: true,
          meta: {
            href: '',
          },
        },
        {
          label: 'Share...',
          onClick: appModel.share,
          meta: {
            href: '',
          },
        },
      ],
    },
  },
  {
    label: 'Composer',
    type: 'button',
    meta: {
      href: '',
      children: [
        {
          label: 'Set BPM',
          type: 'number',
          onChange: appModel.deviceModel._bpm.setPosition,
          meta: {
            href: '',
            value: appModel.deviceModel._bpm.position,
          },
        },
        {
          label: 'Start/Stop',
          type: 'shortcut',
          onClick: appModel.deviceModel.togglePlay,
          meta: {
            href: '',
            shortcut: 'startStop',
          },
        },
        {
          label: 'Cycle A/B',
          type: 'shortcut',
          onClick: appModel.deviceModel.cycleABModes,
          meta: {
            href: '',
            shortcut: 'cycleAb',
          },
        },
        {
          label: 'Clear Pattern',
          onClick: appModel.deviceModel.clearPattern,
          meta: {
            href: '',
          },
        },
        {
          label: 'Fill in...',
          type: 'submenu',
          meta: {
            href: '',
            children: [
              {
                label: 'Every 2th',
                onClick: appModel.deviceModel.fillInEvery.prepend(
                  (_: void) => 2
                ),
                meta: {
                  href: '',
                },
              },
              {
                label: 'Every 4th',
                onClick: appModel.deviceModel.fillInEvery.prepend(
                  (_: void) => 4
                ),
                meta: {
                  href: '',
                },
              },
              {
                label: 'Every 8th',
                onClick: appModel.deviceModel.fillInEvery.prepend(
                  (_: void) => 8
                ),
                meta: {
                  href: '',
                },
              },
            ],
          },
        },
      ],
    },
  },
  {
    label: 'View',
    type: 'button',
    meta: {
      href: '',
      children: [
        {
          label: 'Toggle Keybindings',
          onClick: appModel.uiModel.toggleKeybindingsVisible,
          meta: {
            href: '',
          },
        },
        {
          label: 'Toggle History',
          onClick: appModel.uiModel.toggleHistoryVisible,
          meta: {
            href: '',
          },
        },
      ],
    },
  },
  {
    label: 'Help',
    type: 'button',
    meta: {
      href: '',
      children: [
        {
          label: 'Open manual...',
          type: 'link',
          meta: {
            href: 'http://cdn.roland.com/assets/media/pdf/TR-808_OM.pdf',
          },
        },
        {
          label: 'About...',
          onClick: appModel.uiModel.aboutModal.open,
          meta: {
            href: '',
          },
        },
      ],
    },
  },
];
