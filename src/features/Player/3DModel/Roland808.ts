import { createEffect, restore } from "effector";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import model from "../../../../assets/models/Roland/808_hires4real.glb";
import { degreesToRadians } from "../../../lib/radiansToDegrees/radiansToDegrees";
const loader = new GLTFLoader();

export const createRoland3DModel = () => {
  const fxLoadModel = createEffect(async () => {
    const gltf = await loader.loadAsync(model);
    gltf.scene.scale.set(0.005, 0.005, 0.005);
    // gltf.scene.position.set(0, 0, 3);
    gltf.scene.rotation.set(degreesToRadians(45), degreesToRadians(90), 0);
    const rootMesh = gltf.scene.children[0];
    // rootMesh.material.map.encoding = THREE.RGBM16Encoding;
    window.ff = gltf.scene;
    return gltf;
  });
  const $model = restore(fxLoadModel, null);

  return {
    loadModel: fxLoadModel,
    model: $model,
    controls: {},
  };
};
