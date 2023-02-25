const padsMapping = Object.fromEntries(
  Array.from({ length: 9 }).map((_, v) => [`Digit${v + 1}`, `pad${v + 1}`]),
);

export type KeyAction =
  | "startStop"
  | "toggleGui"
  | "abort"
  | "modeInstrument"
  | "modeMute"
  | "modePlayerMode"
  | "modeVolume"
  | "modeBpm"
  | "increase"
  | "decrease"
  | "clear"
  | "cycleAb"
  | "tap"
  | "pad1"
  | "pad2"
  | "pad3"
  | "pad4"
  | "pad5"
  | "pad6"
  | "pad7"
  | "pad8"
  | "pad9"
  | "pad10"
  | "pad11"
  | "pad12"
  | "pad13"
  | "pad14"
  | "pad15"
  | "pad16";

export type KeyMap = Record<string, KeyAction>;

export const keymapping: KeyMap = {
  Space: "startStop",
  KeyV: "toggleGui",
  ...padsMapping,
  Digit0: "pad10",
  Minus: "pad11",
  Equal: "pad12",
  "Shift+Digit1": "pad13",
  "Shift+Digit2": "pad14",
  "Shift+Digit3": "pad15",
  "Shift+Digit4": "pad16",
  KeyI: "modeInstrument",
  KeyC: "clear",
  KeyM: "modeMute",
  KeyL: "modeVolume",
  BracketRight: "increase",
  BracketLeft: "decrease",
  Enter: "tap",
  KeyA: "cycleAb",
  KeyQ: "modePlayerMode",
  KeyB: "modeBpm",
};

const SubstitutionMap: Record<string, string | ((input: string) => string)> = {
  // Shift: "g",
  // Space: "w",
  Equal: "=",
  Minus: "-",
  // Enter: "a",
  BracketLeft: "[",
  BracketRight: "]",
};

const ActionsMap: Record<KeyAction, string> = {
  abort: "Abort current action",
  clear: "Clear track",
  cycleAb: "Cycle AB mode",
  decrease: "Decrease/Move down",
  increase: "Increase/Move down",
  modeBpm: "Mode: set BPM",
  modeInstrument: "Mode: set Instrument",
  modeMute: "Mode: Mute Instrument",
  modePlayerMode: "Mode: Composer Mode",
  modeVolume: "Mode: Volume",
  pad1: "Toggle Pad 1",
  pad2: "Toggle Pad 2",
  pad3: "Toggle Pad 3",
  pad4: "Toggle Pad 4",
  pad5: "Toggle Pad 5",
  pad6: "Toggle Pad 6",
  pad7: "Toggle Pad 7",
  pad8: "Toggle Pad 8",
  pad9: "Toggle Pad 9",
  pad10: "Toggle Pad 10",
  pad11: "Toggle Pad 11",
  pad12: "Toggle Pad 12",
  pad13: "Toggle Pad 13",
  pad14: "Toggle Pad 14",
  pad15: "Toggle Pad 15",
  pad16: "Toggle Pad 16",
  startStop: "Start/Stop",
  tap: "Tap",
  toggleGui: "Toggle GUI",
};

export const resolveKeyLabel = (input: string) => {
  const parsed = input.replace(regexp, "$2");

  const resolver = SubstitutionMap[parsed] || parsed;
  return typeof resolver === "function" ? resolver(parsed) : resolver;
};

const regexp = /(Key|Digit)(\d|\w)/;

export const resolveActionLabel = (action: KeyAction) => {
  return ActionsMap[action] || "None";
};

export const resolveShortcut = (action: KeyAction) => {
  return reverseMap[action] || "";
};

export const resolveKeymapping = () => keymapping;
const reverseMap = Object.entries(keymapping).reduce(
  (carry, [shortcut, action]) => ((carry[action] = shortcut), carry),
  {} as Record<KeyAction, string>,
);
