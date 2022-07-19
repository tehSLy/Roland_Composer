import { StyledRoot } from "foliage";
import { h, node, spec } from "forest";
import { debounce } from "patronum/debounce";
import { AppModel } from "../AppModel";
import { History, historyAction } from "./History";
import { KeyMapping } from "./KeyMapping";
import { LoadingIndicator } from "./LoadingIndicator";
import { Menu } from "./Menu";

type Config = {
  appModel: AppModel;
};

export const App = ({ appModel }: Config) => {
  StyledRoot();
  LoadingIndicator({
    isVisible: appModel.isLoading,
  });
  History({
    actions: [
      debounce({
        source: historyAction.instrument(
          appModel.deviceModel.activeInstrument.updates
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
    ],
    visible: appModel.uiModel.historyVisible,
  });
  KeyMapping({
    visible: appModel.uiModel.keybindingsVisible,
  });
  h("div", () => {
    node((el) => appModel.sceneModel.bindElement(el as HTMLElement));
    spec({
      visible: appModel.isLoading.map((v) => !v),
    });
  });
  Menu({ appModel });
};
