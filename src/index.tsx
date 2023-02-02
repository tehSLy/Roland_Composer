import { createRoot } from "react-dom/client";
import { App } from "./features/react-app/app/app";
import { appModel } from "./model";

const root = createRoot(document.getElementById("root") as HTMLElement);

root.render(<App appModel={appModel} />);
