import { MenuBar } from "../../ui/Menu/MenuBar";
import { AppModel } from "../AppModel";
import { resolveKeyLabel, resolveShortcut } from "../shared";

const filePickerApiAvailable =
  "showSaveFilePicker" in window && "showOpenFilePicker" in window;

export const Menu = ({ appModel }: { appModel: AppModel }) => {
  MenuBar({
    title: appModel.projectName,
    schema: [
      {
        label: "Menu",
        children: [
          {
            label: "Save...",
            // shortcut: "Ctrl + S",
            handler: appModel.uiModel.saveModal.open,
          },
          {
            label: "Load...",
            handler: appModel.uiModel.loadModal.open,
          },
          {
            label: "Import...",
            handler: appModel.import,
            disabled: !filePickerApiAvailable,
          },
          {
            label: "Export...",
            handler: appModel.export,
            disabled: !filePickerApiAvailable,
          },
          {
            label: "Render...",
            disabled: true,
          },
          {
            label: "Share...",
            handler: appModel.share,
          },
        ],
      },
      {
        label: "Composer",
        children: [
          {
            label: "Set BPM",
            meta: {
              type: "number",
              from: 60,
              to: 220,
              value: appModel.deviceModel._bpm.position,
              handler: appModel.deviceModel._bpm.setPosition,
            },
          },
          {
            label: "Start/Stop",
            handler: appModel.deviceModel.togglePlay,
            shortcut: resolveShortcut("startStop"),
          },
          {
            label: "Cycle A/B",
            handler: appModel.deviceModel.cycleABModes,
            shortcut: resolveKeyLabel(resolveShortcut("cycleAb")),
          },
          {
            label: "Clear Pattern",
            handler: appModel.deviceModel.clearPattern,
          },
          {
            label: "Fill in...",
            meta: {
              type: "list",
              children: [
                {
                  label: "Every 2th",
                  handler: appModel.deviceModel.fillInEvery.prepend(
                    (_: void) => 2
                  ),
                },
                {
                  label: "Every 4th",
                  handler: appModel.deviceModel.fillInEvery.prepend(
                    (_: void) => 4
                  ),
                },
                {
                  label: "Every 8th",
                  handler: appModel.deviceModel.fillInEvery.prepend(
                    (_: void) => 8
                  ),
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
            handler: appModel.uiModel.toggleKeybindingsVisible,
          },
          {
            label: "Toggle History",
            handler: appModel.uiModel.toggleHistoryVisible,
          },
        ],
      },
      {
        label: "Help",
        children: [
          {
            label: "Open manual...",
            meta: {
              type: "link",
              url: "http://cdn.roland.com/assets/media/pdf/TR-808_OM.pdf",
              openIn: "newTab",
            },
          },
          {
            label: "About...",
            handler: appModel.uiModel.aboutModal.open,
          },
        ],
      },
    ],
  });
};
