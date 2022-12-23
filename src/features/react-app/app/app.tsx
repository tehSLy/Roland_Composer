import { useStore } from 'effector-react';
import { useEffect, useRef } from 'react';
import { AppModel } from '../../AppModel';
import { AppBar } from '../ui/app-bar';
import { LoadingIndicator } from '../ui/loading-indicator';
import { Menu } from '../ui/menu';

type AppProps = {
  appModel: AppModel;
};

export const App = ({ appModel }: AppProps) => {
  const isAppLoading = useStore(appModel.isLoading);
  const projectName = useStore(appModel.projectName);
  const sceneElementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    appModel.sceneModel.bindElement(sceneElementRef.current as HTMLDivElement);
  }, []);

  return (
    <>
      <LoadingIndicator isVisible={isAppLoading} />
      <AppBar appModel={appModel} title={projectName} />
      <Menu></Menu>
      <div ref={sceneElementRef}></div>
    </>
  );
};
