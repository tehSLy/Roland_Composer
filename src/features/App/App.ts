import { Event } from "effector";
import { StyledRoot } from "foliage";
import { h, node, spec } from "forest";
import { AppModel } from "../AppModel";
import { History, historyAction } from "./History";
import { KeyMapping } from "./KeyMapping";
import { LoadingIndicator } from "./LoadingIndicator";

type Config = {
  appModel: AppModel;
};

export const App = ({ appModel }: Config) => {
  const $isVisible = appModel.isLoading;
  StyledRoot();
  LoadingIndicator({
    isVisible: $isVisible,
  });
  History([
    historyAction.instrument(appModel.deviceModel.activeInstrument.updates),
    historyAction.mode(appModel.deviceModel._mode.position.updates),
    historyAction.ab(appModel.deviceModel._meta.$abMode.updates),
    historyAction.bpm(appModel.deviceModel._bpm.position.updates)
  ]);
  KeyMapping();
  h("div", () => {
    node((el) => appModel.sceneModel.bindElement(el as HTMLElement));
    spec({
      visible: $isVisible.map((v) => !v),
    });
  });
};

