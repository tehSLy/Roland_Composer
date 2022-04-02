import { attach, createEffect, createEvent, createStore, guard, restore } from "effector";
import * as THREE from "three";
import { Material, Mesh } from "three";

export const createIntersectionsManager = (config: {
  camera: THREE.Camera;
}) => {
  const start = createEvent();
  const stop = createEvent();
  const $isRunning = createStore(true);
  const mouseProjection = projectMouse(config.camera);

  const setIntersectable = createEvent<THREE.Object3D<THREE.Event>[]>();
  const $intersectable = restore(setIntersectable, []);

  const resetIntersected = createEvent();
  const intersected =
    createEvent<THREE.Intersection<THREE.Object3D<THREE.Event>>>();
  const activeElement = restore(
    intersected.map((intersection) => intersection.object),
    null
  ).reset(resetIntersected);

  const createMutation = <P>(
    cb: (state: THREE.Object3D[], arg: P) => THREE.Object3D[]
  ) => {
    const event = createEvent<P>();
    $intersectable.on(event, cb);

    return event;
  };

  const render = attach({
    source: {objects: $intersectable,isRunning: $isRunning},
    effect: ({objects, isRunning}) => {
      if(!isRunning){
        return;
      }
      if (!objects.length) {
        return;
      }

      mouseProjection.alignWithMouse();
      const intersectionPoint =
        mouseProjection.getIntersectionPointWith(objects);

      if (intersectionPoint) {
        intersected(intersectionPoint);
      } else {
        resetIntersected();
      }
    },
  });

  $isRunning.on(start, () => true).on(stop, () => false);

  return {
    render,
    activeElement,
    mouseProjection,
    setIntersectable,
    createMutation,
    isRunning: $isRunning
  };
};

export type IntersectionsManager = ReturnType<
  typeof createIntersectionsManager
>;

const projectMouse = (camera: THREE.Camera) => {
  const raycaster = new THREE.Raycaster();
  const mouse = new THREE.Vector2();

  document.addEventListener("mousemove", (event) => {
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
  });

  const alignWithMouse = () => raycaster.setFromCamera(mouse, camera);
  const getIntersectionWith = (objects: THREE.Object3D<THREE.Event>[]) =>
    raycaster.intersectObjects(objects);

  const getIntersectionPointWith = (objects: THREE.Object3D<THREE.Event>[]) => {
    const intersections = getIntersectionWith(objects);
    if (intersections[0]) {
      return intersections[0];
    }
    return null;
  };

  return {
    raycaster,
    alignWithMouse,
    getIntersectionWith,
    getIntersectionPointWith,
    mouse,
  };
};

const hightlightMaterial = new THREE.MeshBasicMaterial({ color: 0xffffaa });
