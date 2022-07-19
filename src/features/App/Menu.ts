import { createEvent } from "effector";
import { MenuBar } from "../../ui/Menu/MenuBar";
import { AppModel } from "../AppModel";
import { resolveKeyLabel, resolveShortcut } from "../shared";

export const Menu = ({ appModel }: { appModel: AppModel }) => {
  MenuBar({
    schema: [
      {
        label: "Menu",
        visible: false,
        children: [
          {
            label: "Save...",
            shortcut: "Ctrl + S",
          },
          {
            label: "Import...",
          },
          {
            label: "Export...",
          },
          {
            label: "Render...",
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
        visible: false,
        children: [
          {
            label: "Open manual...",
          },
          {
            label: "About...",
          },
        ],
      },
    ],
  });
};
