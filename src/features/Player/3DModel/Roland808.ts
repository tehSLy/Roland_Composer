import { createEffect, createStore, restore } from "effector";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import model from "url:../../../../assets/models/Roland/808_hires4real.glb";
import { degreesToRadians } from "../../../lib/radiansToDegrees/radiansToDegrees";

export const createRoland3DModel = () => {
  const loader = new GLTFLoader();
  const $isLoaded = createStore(false);
  const fxLoadModel = createEffect(async () => {
    const gltf = await loader.loadAsync(model);
    gltf.scene.scale.set(0.005, 0.005, 0.005);
    gltf.scene.rotation.set(degreesToRadians(45), degreesToRadians(90), 0);
    return gltf;
  });
  const $model = restore(fxLoadModel, null);

  $isLoaded.on(fxLoadModel.done, () => true);

  return {
    loadModel: fxLoadModel,
    model: $model,
    controls: {},
    isLoaded: $isLoaded,
  };
};
