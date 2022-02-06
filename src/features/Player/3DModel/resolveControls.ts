import { attach, createEffect, createEvent } from "effector";
import * as THREE from "three";
import {
  ABMode,
  BPM,
  InstrumentsKeys,
  PlayerMode,
  playerModes,
} from "../shared/constants";

const padButtonNameRegexp = /Pad\d{1,2}_Button/;
const padLightNameRegexp = /Pad\d{1,2}_Light/;

const resolveAngleStep = (params: {
  from: number;
  to: number;
  steps: number;
}) => {
  return (params.from - params.to) / (params.steps - 1);
};

export const resolveControls = (object: THREE.Group) => {
  const root = object.children[0].children[0].children[0].children[0];
  const beatPadsRoot = root.children[1];
  const bpmSelector = root.children[8].children[0];
  const pads = beatPadsRoot.children.filter((child) =>
    padButtonNameRegexp.test(child.name)
  );

  pads.sort((a, b) =>
    a.name.localeCompare(b.name, undefined, {
      numeric: true,
      sensitivity: "base",
    })
  );
  const padsLightsRoot = root.children[14];
  const aLight = padsLightsRoot.children[0];
  const bLight = padsLightsRoot.children[1];
  const padsLights = padsLightsRoot.children.filter((child) =>
    padLightNameRegexp.test(child.name)
  );
  padsLights.sort((a, b) =>
    a.name.localeCompare(b.name, undefined, {
      numeric: true,
      sensitivity: "base",
    })
  );
  // console.log(root);

  const hull = root.children[10].children[0];

  const startStopButton = root.children[17].children[0];
  const ABModeSelector = root.children[7].children[1];
  const instrumentSelector = root.children[3].children[0];
  const clearTrackButton = root.children[13].children[0];
  const modeSelector = root.children[3].children[3];
  const tapButton = root.children[18].children[0];
  const shiftButtons = root.children[15];

  const lowTumbler = shiftButtons.children[1];
  const midTumbler = shiftButtons.children[2];
  const hiTumbler = shiftButtons.children[3];
  const rimShotTumbler = shiftButtons.children[4];
  const clapTumbler = shiftButtons.children[5];

  // console.log(bpmSelector);

  return {
    bpmSelector,
    padsLights,
    pads,
    hull,
    startStopButton,
    ABModeSelector,
    instrumentSelector,
    aLight,
    bLight,
    clearTrackButton,
    modeSelector,
    tapButton,
    lowTumbler,
    midTumbler,
    hiTumbler,
    rimShotTumbler,
    clapTumbler,
  };
};

export type ControlsObjects = ReturnType<typeof resolveControls>;

export const createABModeSelectorModel = (
  object: THREE.Object3D<THREE.Event>
) => {
  const map = {
    a: -0.3,
    ab: 0.05,
    b: 0.3,
  };

  const fxSetRotation = createEffect((angle: number) =>
    object.rotation.set(0, angle, 0)
  );

  const setToA = attach({
    effect: fxSetRotation,
    mapParams: () => map.a,
  });
  const setToAB = attach({
    effect: fxSetRotation,
    mapParams: () => map.ab,
  });
  const setToB = attach({
    effect: fxSetRotation,
    mapParams: () => map.b,
  });

  const set = attach({
    effect: fxSetRotation,
    mapParams: (ab: ABMode) => map[ab],
  });

  return {
    setToA,
    setToAB,
    setToB,
    set,
  };
};

export const createInstrumentSelectorModel = (
  object: THREE.Object3D<THREE.Event>
) => {
  const fxSetRotation = createEffect((instrument: InstrumentsKeys) => {
    const angle = map[instrument];

    return object.rotation.set(
      0,
      0,
      angle === undefined ? map.bassDrum : angle
    );
  });

  const map: Record<InstrumentsKeys, number> = {
    bassDrum: 2,
    claves: 0, //
    closedHat: -3.3,
    cowBell: -1.7,
    cymbal: -2.3,
    handClap: -1.2,
    hiTom: 0,
    rimShot: -0.5,
    midTom: 0.5,
    lowTom: 1,
    openHihat: -2.8,
    snareDrum: 1.5,
  };

  return {
    setInstrument: fxSetRotation,
  };
};

export const createBPMSelectorModel = (object: THREE.Object3D<THREE.Event>) => {
  const start = 2.55;
  const step = 0.515;
  const map = Object.fromEntries(BPM.map((bpm, k) => [bpm, start - step * k]));
  const fxSetBPM = createEffect((bpm: typeof BPM[number]) => {
    const angle = map[bpm];

    return object.rotation.set(
      0,
      0,
      angle === undefined ? map.bassDrum : angle
    );
  });

  return {
    setBPM: fxSetBPM,
  };
};

export const createModeSelectorModel = (
  object: THREE.Object3D<THREE.Event>
) => {
  const start = 2.75;
  const step = resolveAngleStep({ from: start, to: -0.1, steps: 6 });
  const map = Object.fromEntries(
    playerModes.map((mode, k) => [mode, start - step * k])
  );

  const fxSetMode = createEffect((mode: PlayerMode) => {
    const angle = map[mode];

    return object.rotation.set(
      0,
      0,
      angle === undefined ? map.bassDrum : angle
    );
  });

  return {
    setMode: fxSetMode,
  };
};

export const createTumblerModel = (object: THREE.Object3D<THREE.Event>) => {
  const highEnd = 0;
  const lowEnd = -30;

  const set = createEffect((isOn: boolean) => {
    return object.position.setY(isOn ? highEnd : lowEnd);
  });

  return { set };
};

export const createControls = (objects: THREE.Object3D[]) => {
  const padClicked = createEvent<number>();
  const padsHandlers = objects.map((_, k) => padClicked.prepend(() => k));
  return {
    padsHandlers,
    padClicked,
  };
};
