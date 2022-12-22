import {
  attach,
  createEvent,
  createStore,
  guard,
  split,
  Store,
} from "effector";
import { KeyAction, KeyMap } from "../../shared";
import { instrumentsChain, playerModes } from "../shared/constants";
import { DeviceModel } from "./createPlayerModel";

type Mode = "mute" | "instrument" | "mode" | "bpm" | "volume" | "togglePad";

type Config = {
  keyMap: KeyMap;
  player: DeviceModel;
  suppressed?: Store<boolean>;
};

const actionToModeMap: Partial<Record<KeyAction, Mode>> = {
  modeInstrument: "instrument",
  modeMute: "mute",
  modePlayerMode: "mode",
  modeVolume: "volume",
  modeBpm: "bpm",
};

export const createKeyPressManager = ({
  keyMap,
  player,
  suppressed,
}: Config) => {
  const $mode = createStore<Mode>("togglePad");
  const padPressed = createEvent<number>();
  const $suppressed = suppressed ?? createStore(false);

  const fxResolveAction = attach({
    source: $suppressed,
    effect: (isSuppressed, event: KeyboardEvent) => {
      if (event.uiEvent || isSuppressed) {
        return;
      }
      return keyMap[eventToString(event)];
    },
  });

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

  const increasePressed = createEvent();
  const decreasePressed = createEvent();

  split({
    source: actionTriggered,
    match: (v) => v,
    cases: {
      startStop: player.togglePlay.prepend(() => null),
      abort: abortCurrentMode,
      ...padHandlers,
      tap: player.tapPressed,
      cycleAb: player.cycleABModes,
      decrease: decreasePressed,
      increase: increasePressed,
    },
  });

  split({
    source: padPressed,
    match: $mode,
    cases: {
      togglePad: player.toggleActiveInstrumentPad,
      mute: player.mute.prepend((k) => instrumentsChain[k]),
      instrument: player._instrument.setPosition.prepend(
        (k) => instrumentsChain[k]
      ),
      mode: player._mode.setPosition.prepend((k) =>
        k in playerModes ? playerModes[k] : playerModes[1]
      ),
    },
  });

  split({
    source: increasePressed,
    match: $mode,
    cases: {
      instrument: player._instrument.setNext,
      mode: player._mode.setNext,
      bpm: player._bpm.increase.prepend(() => void 0),
    },
  });

  split({
    source: decreasePressed,
    match: $mode,
    cases: {
      instrument: player._instrument.setPrevious,
      mode: player._mode.setPrevious,
      bpm: player._bpm.decrease.prepend(() => void 0),
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
};

const eventToString = ({ code, ctrlKey, shiftKey }: KeyboardEvent) =>
  [ctrlKey && "Ctrl", shiftKey && "Shift", code].filter(Boolean).join("+");
