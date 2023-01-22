import { useStore } from 'effector-react';
import { useEffect, useRef } from 'react';
import { AppBar } from '../widgets/app-bar/ui/app-bar';
import { LoadingIndicator } from '../shared/ui/loading-indicator';
import { appModel } from '../../AppModel/createAppModel';

export const App = () => {
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
      <AppBar />
      <div ref={sceneElementRef}></div>
    </>
  );
};
