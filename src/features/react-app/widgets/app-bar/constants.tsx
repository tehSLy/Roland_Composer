import { appModel } from '../../../AppModel/createAppModel';
import { resolveKeyLabel, resolveShortcut } from '../../../shared';
import { BpmInput } from '../../entities/composer/ui/bpm-input';
import { MenuItemSchema } from '../../shared/types';

const filePickerApiAvailable =
  'showSaveFilePicker' in window && 'showOpenFilePicker' in window;

export const appMenuItems: MenuItemSchema[] = [
  {
    label: 'Menu',
    type: 'button',
    children: [
      {
        label: 'Save...',
        onClick: appModel.uiModel.saveModal.open,
      },
      {
        label: 'Load...',
        onClick: appModel.uiModel.loadModal.open,
      },
      {
        label: 'Import...',
        onClick: appModel.import,
        disabled: !filePickerApiAvailable,
      },
      {
        label: 'Export...',
        onClick: appModel.export,
        disabled: !filePickerApiAvailable,
      },
      {
        label: 'Render...',
        disabled: true,
      },
      {
        label: 'Share...',
        onClick: appModel.share,
      },
    ],
  },
  {
    label: 'Composer',
    type: 'button',
    children: [
      {
        label: 'Set BPM',
        extra: <BpmInput />,
      },
      {
        label: 'Start/Stop',
        onClick: appModel.deviceModel.togglePlay,
        extra: resolveShortcut('startStop'),
      },
      {
        label: 'Cycle A/B',
        onClick: appModel.deviceModel.cycleABModes,
        extra: resolveKeyLabel(resolveShortcut('cycleAb')),
      },
      {
        label: 'Clear Pattern',
        onClick: appModel.deviceModel.clearPattern,
      },
      {
        label: 'Fill in...',
        extra: '▸',
        children: [
          {
            label: 'Every 2th',
            onClick: appModel.deviceModel.fillInEvery.prepend((_: void) => 2),
          },
          {
            label: 'Every 4th',
            onClick: appModel.deviceModel.fillInEvery.prepend((_: void) => 4),
          },
          {
            label: 'Every 8th',
            onClick: appModel.deviceModel.fillInEvery.prepend((_: void) => 8),
          },
        ],
      },
    ],
  },
  {
    label: 'View',
    type: 'button',
    children: [
      {
        label: 'Toggle Keybindings',
        onClick: appModel.uiModel.toggleKeybindingsVisible,
      },
      {
        label: 'Toggle History',
        onClick: appModel.uiModel.toggleHistoryVisible,
      },
    ],
  },
  {
    label: 'Help',
    type: 'button',
    children: [
      {
        label: 'Open manual...',
        href: 'http://cdn.roland.com/assets/media/pdf/TR-808_OM.pdf',
      },
      {
        label: 'About...',
        onClick: appModel.uiModel.aboutModal.open,
      },
    ],
  },
];
