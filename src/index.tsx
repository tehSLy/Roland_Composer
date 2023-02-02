import { createRoot } from "react-dom/client";
import { App } from "./features/react-app/app/app";
import { createAppModel } from "./features/AppModel";

import { createStore, Event, merge, Store } from "effector";
import { debounce } from "patronum";
import { historyAction } from "~/features/App/History";
import { HistoryAction } from "~/features/App/History/HistoryActionType";

export const appModel = createAppModel();

export const $steps = createStore<HistoryAction[]>([]);
const actionTriggered = merge([
  debounce({
    source: historyAction.instrument(
      appModel.deviceModel.activeInstrument.updates,
    ),
    timeout: 200,
  }),
  debounce({
    source: historyAction.mode(appModel.deviceModel._mode.position.updates),
    timeout: 200,
  }),
  debounce({
    source: historyAction.ab(appModel.deviceModel._meta.$abMode.updates),
    timeout: 200,
  }),
  debounce({
    source: historyAction.bpm(appModel.deviceModel._bpm.position.updates),
    timeout: 200,
  }),
]);

$steps.on(actionTriggered, (state, action) => [...state, action]);

const root = createRoot(document.getElementById("root") as HTMLElement);

root.render(<App appModel={appModel} />);
