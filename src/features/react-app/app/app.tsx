import { useStore } from 'effector-react';
import { useEffect, useRef } from 'react';
import { AppBar } from '../widgets/AppBar/ui/AppBar';
import { LoadingIndicator } from '../shared/ui/LoadingIndicator';
import { AppModel } from '../../AppModel/createAppModel';

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
