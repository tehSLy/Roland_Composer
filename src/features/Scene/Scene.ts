import { createEffect, createEvent, forward } from "effector";
import throttle from "lodash.throttle";
import * as THREE from "three";
import { createAnimationFrameTicker } from "../../lib/createTicker/createTicker";
import { OrbitControls } from "../../lib/OrbitControls/OrbitControls";
import { clearColor } from "../shared";

export const createScene = () => {
  const renderer = new THREE.WebGLRenderer({
    antialias: true,
  });

  renderer.setClearColor(clearColor, 1);
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.toneMapping = THREE.LinearToneMapping;
  renderer.shadowMap.enabled;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  renderer.toneMappingExposure = 1;
  const camera = new THREE.PerspectiveCamera(
    45,
    window.innerWidth / window.innerHeight,
    0.1,
    500,
  );
  renderer.outputEncoding = THREE.sRGBEncoding;
  const controls = new OrbitControls(camera, renderer.domElement);
  camera.lookAt(0, 0, 0);
  camera.position.z = 2;

  const scene = new THREE.Scene();
  const lights = createLights();

  scene.add(lights.ambient, lights.spotLight);

  const fxAnimate = createEffect(() => {
    renderer.render(scene, camera);
  });

  const setRenderDelay = createEvent();
  const setMode = createEvent();

  const ticker = createAnimationFrameTicker();

  const fxBindElement = createEffect((el: HTMLElement) =>
    el.appendChild(renderer.domElement),
  );

  const fxSceneAdd = createEffect(scene.add.bind(scene));

  forward({ from: ticker.tick, to: fxAnimate });

  window.addEventListener("resize", throttle(onWindowResize, 100), false);

  function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize(window.innerWidth, window.innerHeight);
  }

  return {
    renderer,
    scene,
    camera,
    ticker,
    cameraControls: controls,
    setRenderDelay,
    setMode,
    bindElement: fxBindElement,
    add: fxSceneAdd,
  };
};

const createLights = () => {
  const ambient = new THREE.AmbientLight(0xffffff, 0.4); // soft white light
  const spotLight = new THREE.SpotLight(0xffffff, 0.9);
  spotLight.castShadow = true;
  spotLight.position.set(0, 1, 11);
  spotLight.shadow.mapSize.width = 512; // default
  spotLight.shadow.mapSize.height = 512; // default
  spotLight.shadow.camera.near = 0.5; // default
  spotLight.shadow.camera.far = 500; // default
  return { ambient, spotLight };
};
