import classNames from "classnames";
import { createStore, Event, merge, Store } from "effector";
import { h, list, remap, spec } from "forest";
import { menuLabelStyle } from "../../../ui/Menu/menuLabelStyle";
import {
  ABMode,
  InstrumentsKeys,
  PlayerMode,
} from "../../Player/shared/constants";
import { HistoryAction, HistoryActionType } from "./HistoryActionType";

type Config<T> = {
  actions: T;
};

export const History = <A extends Event<HistoryAction>[]>({
  actions,
  visible,
}: {
  actions: A;
  visible: Store<boolean>;
}) => {
  const actionTriggered = merge(actions) as Event<HistoryAction>;
  const $steps = createStore<HistoryAction[]>([]);

  $steps.on(actionTriggered, (state, action) => [...state, action]);

  h("div", {
    visible,
    style: {
      top: "2.25rem",
      height: "calc(100vh - 2.25rem)",
    },
    fn: () => {
      menuLabelStyle(
        "absolute bg-neutral-600 w-48 no-scrollbar overflow-y-auto"
      );
      h("div", {
        text: "History",
        attr: {
          class:
            "px-4 py-1 bg-neutral-600 font-bold border-neutral-400 border-solid border-0 border-b-4 sticky top-0 ",
        },
      }),
        list($steps, ({ store }) => {
          h("div", () => {
            spec({
              attr: {
                class: "flex flex-row py-1 px-2 items-center justify-between",
              },
            });
            const $type = remap(store, "type");
            const $dotClass = $type.map(
              composeResolveDotClass("rounded-full p-1 mx-2")
            );
            const $typeLabel = $type.map(resolveTypeLabel);
            const $value = store.map(({ type, value }) => {
              switch (type) {
                case "AB":
                  return resolveABLabel(value as ABMode);
                case "BPM":
                  return value;
                case "INSTRUMENT":
                  return resolveInstrumentLabel(value);
                case "MODE":
                  return resolveModeLabel(value as PlayerMode);
                case "VOLUME":
                  return value;

                default:
                  return "Unknown";
              }
            });

            h("div", () => {
              spec({
                attr: {
                  class: "flex flex-row items-center",
                },
              });
              h("span", {
                attr: {
                  class: $dotClass,
                },
              });
              h("span", {
                text: $typeLabel,
              });
            });
            h("span", {
              text: $value,
            });
          });
        });
    },
  });
};

const composeResolveDotClass = (cls: string) => (type: HistoryActionType) => {
  const map: Record<HistoryActionType, string> = {
    AB: "bg-red-400",
    BPM: "bg-yellow-400",
    INSTRUMENT: "bg-green-400",
    MODE: "bg-blue-400",
    VOLUME: "bg-violet-400",
  };

  return classNames(map[type] || "bg-gray-400", cls);
};

const resolveTypeLabel = (type: HistoryActionType) => {
  const map: Record<HistoryActionType, string> = {
    AB: "AB",
    BPM: "BPM",
    INSTRUMENT: "INST",
    MODE: "MODE",
    VOLUME: "VOL",
  };

  return map[type] || "UNKNW";
};

const resolveInstrumentLabel = (instrument: string) => {
  const map: Record<InstrumentsKeys, string> = {
    accent: "Accent",
    bassDrum: "Bass Drum",
    closedHat: "Closed hihats",
    cowBell: "Cowbell",
    cymbal: "Cymbals",
    handClap: "Handclap",
    hiTom: "Hi Tom",
    lowTom: "Low Tom",
    midTom: "Mid Tom",
    openHihat: "Open hihats",
    rimShot: "Rimshot",
    snareDrum: "Snare Drum",
  };
  return map[instrument as InstrumentsKeys] || "Unknown";
};

const resolveABLabel = (ab: ABMode) => {
  const map = {
    a: "A only",
    b: "B only",
    ab: "Both AB",
  };

  return map[ab] || "Unknown";
};

const resolveModeLabel = (mode: PlayerMode) => {
  const map: Record<PlayerMode, string> = {
    compose: "Compose mode",
    firstPart: "Edit First part",
    manualPlay: "Manual play mode",
    patternClear: "Clear pattern",
    play: "Play mode",
    secondPart: "Edit Second part",
  };

  return map[mode] || "Unknown";
};
