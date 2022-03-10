import * as THREE from "three";
import { Mesh, Object3D } from "three";
import { controlsMapping } from "./controlsMapping";

export const resolveControls = (object: THREE.Group) => {
  const children = object.children;
  const result: Record<string, Object3D | Object3D[]> = {};

  const resolveElement = (idx: string) => {
    const element = children.find((elem) => elem.name === idx)!;
    if (!element) console.warn(`Unable to find element with name ${idx}`);
    return element;
  };

  for (const key in controlsMapping) {
    const entry = controlsMapping[key as keyof typeof controlsMapping];
    if (entry instanceof Array) {
      result[key] = entry.map(resolveElement);
      continue;
    }

    result[key] = resolveElement(entry);
  }

  return result as ControlsObjects;
};

export type ControlsObjects = {
  bpmSelector: Mesh;
  padsLights: Mesh[];
  pads: Mesh[];
  hull: Mesh;
  startStopButton: Mesh;
  ABModeSelector: Mesh;
  instrumentSelector: Mesh;
  aLight: Mesh;
  bLight: Mesh;
  clearTrackButton: Mesh;
  modeSelector: Mesh;
  tapButton: Mesh;
  lowTumbler: Mesh;
  midTumbler: Mesh;
  hiTumbler: Mesh;
  rimShotTumbler: Mesh;
  clapTumbler: Mesh;
  lowTomRow: [Mesh, Mesh];
  hiTomRow: [Mesh, Mesh];
  midTomRow: [Mesh, Mesh];
  rimShotRow: [Mesh];
  clapRow: [Mesh];
  cowbellRow: [Mesh];
  cymbalRow: [Mesh, Mesh, Mesh];
  openHihatRow: [Mesh, Mesh];
  closedHihatRow: [Mesh];
  bassDrumRow: [Mesh, Mesh, Mesh];
  snareDrumRow: [Mesh, Mesh, Mesh];
};
