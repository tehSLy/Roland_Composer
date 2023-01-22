import { createRoot } from 'react-dom/client';
import { using } from 'forest';

import { App } from './features/react-app/app/app';

import { createAppModel } from './features/AppModel';

const root = createRoot(document.getElementById('root') as HTMLElement);

root.render(<App />);

// using(document.body, () => {
//   App({ appModel });
//   appModel.init();
// });
