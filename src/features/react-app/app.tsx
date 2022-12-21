import { useStore } from 'effector-react';
import { useEffect, useRef } from 'react';
import { AppModel } from '../AppModel';
import { LoadingIndicator } from './loading-indicator';

type AppProps = {
  appModel: AppModel;
};

export const App = ({ appModel }: AppProps) => {
  const isAppLoading = useStore(appModel.isLoading);
  const sceneElementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    appModel.sceneModel.bindElement(sceneElementRef.current as HTMLDivElement);
  }, []);

  return (
    <>
      <LoadingIndicator isVisible={isAppLoading} />
      <div ref={sceneElementRef}></div>
    </>
  );
};
