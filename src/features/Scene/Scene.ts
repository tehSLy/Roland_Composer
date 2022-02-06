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
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  // renderer.toneMappingExposure = 1;
  renderer.outputEncoding = THREE.sRGBEncoding;
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
  camera.position.z = 5;

  const scene = new THREE.Scene();
  const lights = createLights();

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
  const ambient = new THREE.AmbientLight(0xffffff, 0.3); // soft white light
  const spotLight = new THREE.SpotLight(0xffffff, 0.5);
  spotLight.position.set(0, 0, 10);
  return { ambient, spotLight };
};
