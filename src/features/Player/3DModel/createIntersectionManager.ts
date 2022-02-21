import { attach, createEffect, createEvent, restore } from "effector";
import * as THREE from "three";

export const createIntersectionsManager = (config: {
  camera: THREE.Camera;
}) => {
  const mouseProjection = projectMouse(config.camera);

  const setIntersectable = createEvent<THREE.Object3D<THREE.Event>[]>();
  const $intersectable = restore(setIntersectable, []);

  let cachedObject: THREE.Object3D<THREE.Event> | null = null;
  let cachedMaterial: any = null;

  const applyCachedResources = () => {
    if (!cachedObject) {
      return;
    }

    cachedObject.material = cachedMaterial;
  };
  const resetIntersected = createEvent();
  const intersected =
    createEvent<THREE.Intersection<THREE.Object3D<THREE.Event>>>();
  const activeElement = restore(intersected, null).reset(resetIntersected);

  const createMutation = <P>(
    cb: (state: THREE.Object3D[], arg: P) => THREE.Object3D[]
  ) => {
    const event = createEvent<P>();
    $intersectable.on(event, cb);

    return event;
  };

  const render = attach({
    source: $intersectable,
    effect: createEffect((objects: THREE.Object3D<THREE.Event>[]) => {
      if (!objects.length) {
        return;
      }

      mouseProjection.alignWithMouse();
      const intersectionPoint =
        mouseProjection.getIntersectionPointWith(objects);

      if (intersectionPoint) {
        applyCachedResources();
        cachedObject = intersectionPoint.object;
        cachedMaterial = intersectionPoint.object.material;
        intersectionPoint.object.material = hightlightMaterial;
        intersected(intersectionPoint);
      } else {
        applyCachedResources();
        resetIntersected();
      }
    }),
  });

  return {
    render,
    activeElement,
    mouseProjection,
    setIntersectable,
    createMutation,
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
