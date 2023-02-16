import { useStore } from "effector-react";
import { useEffect, useRef } from "react";
import { AppBar } from "~widgets/AppBar";
import { AppModel } from "~/features/AppModel";
import { History } from "~features/History";
import { KeyMapping } from "~features/KeyMapping";
import { LoadingIndicator } from "~shared/ui/LoadingIndicator";
import { SaveModal } from "../features/SaveLoad/ui/SaveModal";
import { LoadModal } from "../features/SaveLoad/ui/LoadModal";

type AppProps = {
  appModel: AppModel;
};

export const App = ({ appModel }: AppProps) => {
  const isAppLoading = useStore(appModel.isLoading);
  const sceneElementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    appModel.init();

    if (!sceneElementRef.current) return;
    appModel.sceneModel.bindElement(sceneElementRef.current);
  }, []);

  return (
    <>
      <LoadingIndicator isVisible={isAppLoading} />
      <History visible={appModel.uiModel.historyVisible} />
      <KeyMapping visible={appModel.uiModel.keybindingsVisible} />
      <AppBar appModel={appModel} />
      <SaveModal appModel={appModel} />
      <LoadModal appModel={appModel} />
      <div ref={sceneElementRef}></div>
    </>
  );
};
