import { using } from "forest";
import { App } from "./features/App";
import { createAppModel } from "./features/AppModel";

const appModel = createAppModel();

using(document.body, () => {
  App({ appModel });
  appModel.init();
});
