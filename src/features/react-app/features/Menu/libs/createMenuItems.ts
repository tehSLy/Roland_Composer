/* eslint-disable @typescript-eslint/no-unused-vars */
import { AppModel } from "~/features/AppModel";
import { parseMenuSchema } from "./parseMenuSchema";

const filePickerApiAvailable =
  "showSaveFilePicker" in window && "showOpenFilePicker" in window;

export const createMenuItems = (appModel: AppModel) =>
  parseMenuSchema([
    {
      label: "File",
      children: [
        {
          label: "Save...",
          type: "button",
          meta: {
            handler: appModel.uiModel.saveModal.open,
          },
        },
        {
          label: "Load...",
          type: "button",
          meta: {
            handler: appModel.uiModel.loadModal.open,
          },
        },
        {
          label: "Import...",
          type: "button",
          disabled: !filePickerApiAvailable,
          meta: {
            handler: appModel.import,
          },
        },
        {
          label: "Export...",
          type: "button",
          disabled: !filePickerApiAvailable,
          meta: {
            handler: appModel.export,
          },
        },
        {
          label: "Render...",
          type: "button",
          disabled: true,
          meta: {},
        },
        {
          label: "Share...",
          type: "button",
          meta: {
            handler: appModel.uiModel.shareModal.open,
          },
        },
      ],
    },
    {
      label: "Composer",
      children: [
        {
          label: "Set BPM",
          type: "number",
          meta: {
            value: appModel.deviceModel._bpm.position,
            handler: appModel.deviceModel._bpm.setPosition,
          },
        },
        {
          label: "Start/Stop",
          type: "button",
          meta: {
            shortcut: "startStop",
            handler: appModel.deviceModel.togglePlay,
          },
        },
        {
          label: "Cycle A/B",
          type: "button",
          meta: {
            shortcut: "cycleAb",
            handler: appModel.deviceModel.cycleABModes,
          },
        },
        {
          label: "Clear Pattern",
          type: "button",
          meta: {
            handler: appModel.deviceModel.clearPattern,
          },
        },
        {
          label: "Fill in...",
          type: "submenu",
          meta: {
            children: [
              {
                label: "Every 2th",
                type: "button",
                meta: {
                  handler: appModel.deviceModel.fillInEvery.prepend(
                    (_: void) => 2,
                  ),
                },
              },
              {
                label: "Every 4th",
                type: "button",
                meta: {
                  handler: appModel.deviceModel.fillInEvery.prepend(
                    (_: void) => 4,
                  ),
                },
              },
              {
                label: "Every 8th",
                type: "button",
                meta: {
                  handler: appModel.deviceModel.fillInEvery.prepend(
                    (_: void) => 8,
                  ),
                },
              },
            ],
          },
        },
      ],
    },
    {
      label: "View",
      children: [
        {
          label: "Toggle Keybindings",
          type: "button",
          meta: {
            handler: appModel.uiModel.toggleKeybindingsVisible,
          },
        },
        {
          label: "Toggle History",
          type: "button",
          meta: {
            handler: appModel.uiModel.toggleHistoryVisible,
          },
        },
      ],
    },
    {
      label: "Help",
      children: [
        {
          label: "Open manual...",
          type: "link",
          meta: {
            url: "http://cdn.roland.com/assets/media/pdf/TR-808_OM.pdf",
          },
        },
        {
          label: "About...",
          type: "button",
          meta: {
            handler: appModel.uiModel.aboutModal.open,
          },
        },
      ],
    },
  ]);
