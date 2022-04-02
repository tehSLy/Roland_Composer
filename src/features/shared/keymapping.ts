const padsMapping = Object.fromEntries(
  Array.from({ length: 9 }).map((_, v) => [`Digit${v + 1}`, `pad${v + 1}`])
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
