import { createRoot } from 'react-dom/client';
import { using } from 'forest';
import { App } from './features/App';
import { createAppModel } from './features/AppModel';

const appModel = createAppModel();
appModel.init();

const root = createRoot(document.getElementById('root') as HTMLElement);

root.render(<App appModel={appModel} />);

// using(document.body, () => {
//   App({ appModel });
//   appModel.init();
// });
