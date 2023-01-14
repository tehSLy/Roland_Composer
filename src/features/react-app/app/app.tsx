import { useStore } from 'effector-react';
import { useEffect, useRef } from 'react';
import { AppModel } from '../../AppModel';
import { AppBar } from '../ui/app-bar';
import { LoadingIndicator } from '../ui/loading-indicator';

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
      <AppBar appModel={appModel} />
      <div ref={sceneElementRef}></div>
    </>
  );
};
