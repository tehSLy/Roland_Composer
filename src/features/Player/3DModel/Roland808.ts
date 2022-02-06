import { createEffect, restore } from "effector";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import model from "../../../../assets/models/Roland/Roland808.glb";
import * as THREE from "three";

const loader = new GLTFLoader();

export const createRoland3DModel = () => {
  const fxLoadModel = createEffect(async () => {
    const gltf = await loader.loadAsync(model);
    gltf.scene.scale.set(0.001, 0.001, 0.001);
    gltf.scene.rotation.set(0.8, 0, 0);
    const rootMesh = gltf.scene.children[0].children[0].children[0].children[0].children[0].children[0];
    rootMesh.material.map.encoding = THREE.LinearEncoding;
    return gltf;
  });
  const $model = restore(fxLoadModel, null);

  return {
    loadModel: fxLoadModel,
    model: $model,
    controls: {},
  };
};
