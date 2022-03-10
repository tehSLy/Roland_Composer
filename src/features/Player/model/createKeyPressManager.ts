import {
  attach,
  createEffect,
  createEvent,
  createStore,
  guard,
  split,
} from "effector";
import { instrumentsChain } from "../shared/constants";
import { Roland808Model } from "./createPlayerModel";

type KeyAction =
  | "startStop"
  | "toggleGui"
  | "abort"
  | "modeInstrument"
  | "modeMute"
  | "modePlayerMode"
  | "modeVolume"
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

type KeyMap = Record<string, KeyAction>;

type Mode = "mute" | "instrument" | "mode" | "bpm" | "volume" | "togglePad";

type Config = {
  keyMap: KeyMap;
  player: Roland808Model;
};

const actionToModeMap: Partial<Record<KeyAction, Mode>> = {
  modeInstrument: "instrument",
  modeMute: "mute",
  modePlayerMode: "mode",
  modeVolume: "volume",
};

export const createKeyPressManager = ({ keyMap, player }: Config) => {
  const $mode = createStore<Mode>("togglePad");
  const padPressed = createEvent<number>();

  const fxResolveAction = createEffect(
    (event: KeyboardEvent) => keyMap[eventToString(event)]
  );
  const fxKeyPressed = attach({ effect: fxResolveAction });
  const fxModeSet = attach({ effect: fxResolveAction });
  const fxModeRelease = attach({ effect: fxResolveAction });

  const actionTriggered = guard(fxKeyPressed.doneData, {
    filter: Boolean,
  });
  const abortCurrentMode = createEvent();

  const padHandlers = Object.fromEntries(
    Array.from({ length: 16 }).map((_, v) => [
      `pad${v + 1}`,
      padPressed.prepend(() => v),
    ])
  );

  split({
    source: actionTriggered,
    match: (v) => v,
    cases: {
      startStop: player.togglePlay.prepend(() => null),
      // toggleGui: createEffect(console.log),
      abort: abortCurrentMode,
      ...padHandlers,
      tap: player.tapPressed,
      cycleAb: player.cycleABModes,
    },
  });

  split({
    source: padPressed,
    match: $mode,
    cases: {
      togglePad: player.toggleActiveInstrumentPad,
      mute: player.mute.prepend((k) => instrumentsChain[k]),
      instrument: player.setInstrument.prepend((k) => instrumentsChain[k]),
    },
  });
  $mode
    .on(fxModeSet.doneData, (_, action) => actionToModeMap[action])
    // Release only the last mode set
    .on(fxModeRelease.doneData, (mode, action) => {
      const newMode = actionToModeMap[action];
      return mode === newMode ? "togglePad" : mode;
    });

  document.addEventListener("keypress", fxKeyPressed);
  document.addEventListener("keydown", fxModeSet);
  document.addEventListener("keyup", fxModeRelease);

  fxKeyPressed.watch(console.log);
};

const eventToString = ({ code, ctrlKey, shiftKey }: KeyboardEvent) =>
  [ctrlKey && "Ctrl", shiftKey && "Shift", code].filter(Boolean).join("+");
