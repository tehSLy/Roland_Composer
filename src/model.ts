import { merge } from "effector";
import { debounce } from "patronum";
import { historyAction } from "./features/App/History";
import { createAppModel } from "./features/AppModel";
import { $steps } from "./features/react-app/features/History/model/model";

export const appModel = createAppModel();

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
