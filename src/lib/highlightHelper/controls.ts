import { createStore } from "effector";

export const $controlsNames = createStore([
  "bpmSelector",
  "hull",
  "startStopButton",
  "ABModeSelector",
  "instrumentSelector",
  "aLight",
  "bLight",
  "clearTrackButton",
  "modeSelector",
  "tapButton",
  "lowTumbler",
  "midTumbler",
  "hiTumbler",
  "rimShotTumbler",
  "clapTumbler",
  ...createArrayOfControls({ length: 2, name: "lowTomRow" }),
  ...createArrayOfControls({ length: 2, name: "hiTomRow" }),
  ...createArrayOfControls({ length: 2, name: "midTomRow" }),
  ...createArrayOfControls({ length: 1, name: "rimShotRow" }),
  ...createArrayOfControls({ length: 1, name: "clapRow" }),
  ...createArrayOfControls({ length: 1, name: "cowbellRow" }),
  ...createArrayOfControls({ length: 3, name: "cymballRow" }),
  ...createArrayOfControls({ length: 2, name: "openHihatRow" }),
  ...createArrayOfControls({ length: 1, name: "closedHihatRow" }),
  ...createArrayOfControls({ length: 3, name: "bassDrumRow" }),
  ...createArrayOfControls({ length: 3, name: "snareDrumRow" }),
  ...createArrayOfControls({ length: 16, name: "padsLights" }),
  ...createArrayOfControls({ length: 16, name: "pads" }),
]);

function createArrayOfControls(params: { length: number; name: string }) {
  return Array.from({ length: params.length }).map(
    (_, k) => `${params.name}.${k}`
  );
}
