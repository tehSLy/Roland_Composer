import { createRoot } from 'react-dom/client';
import { App } from './features/react-app/app/App';
import { createAppModel } from './features/AppModel';

const appModel = createAppModel();

const root = createRoot(document.getElementById('root') as HTMLElement);

root.render(<App appModel={appModel} />);
