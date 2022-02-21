import { createEffect, forward } from "effector";
import * as THREE from "three";
import { createAnimationFrameTicker } from "../../lib/createTicker";
import { OrbitControls } from "../../lib/OrbitControls/OrbitControls";

export const createScene = () => {
  const renderer = new THREE.WebGLRenderer({
    antialias: true,
  });

  renderer.setClearColor(0xebe6da, 1);
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.toneMapping = THREE.LinearToneMapping;
  renderer.shadowMap.enabled;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap
  renderer.toneMappingExposure = 1;
  // renderer.outputEncoding = THREE.LogLuvEncoding;
  document.body.appendChild(renderer.domElement);
  const camera = new THREE.PerspectiveCamera(
    45,
    window.innerWidth / window.innerHeight,
    0.1,
    500
  );
  //@ts-ignore
  renderer.gammaOutput = true;
  const controls = new OrbitControls(camera, renderer.domElement);
  camera.lookAt(0, 0, 0);
  // camera.position.z = 0;
  camera.position.z = 2;

  const scene = new THREE.Scene();
  const lights = createLights();

  // const helper = new THREE.CameraHelper( lights.spotLight.shadow.camera );
  // scene.add( helper );

  scene.add(lights.ambient, lights.spotLight);

  const fxAnimate = createEffect(() => {
    renderer.render(scene, camera);    
    controls.update();
  });
  const ticker = createAnimationFrameTicker();
  forward({ from: ticker.tick, to: fxAnimate });

  return {
    renderer,
    scene,
    camera,
    ticker,
    cameraControls: controls
  };
};

const createLights = () => {
  const ambient = new THREE.AmbientLight(0xffffff, 0.4); // soft white light
  const spotLight = new THREE.SpotLight(0xffffff, 0.9);
  spotLight.castShadow = true
  spotLight.position.set(0, 1, 11);
  window.ss = spotLight
  spotLight.shadow.mapSize.width = 512; // default
  spotLight.shadow.mapSize.height = 512; // default
  spotLight.shadow.camera.near = 0.5; // default
  spotLight.shadow.camera.far = 500; // default
  return { ambient, spotLight };
};
