import { attach, createEffect, createEvent, guard, restore } from "effector";
import * as THREE from "three";
import { Material, Mesh } from "three";

export const createIntersectionsManager = (config: {
  camera: THREE.Camera;
}) => {
  const mouseProjection = projectMouse(config.camera);

  const setIntersectable = createEvent<THREE.Object3D<THREE.Event>[]>();
  const $intersectable = restore(setIntersectable, []);

  const cloneMaterialCache = new Map<Mesh, Material>();
  const sourceMaterialCache = new Map<Mesh, Material>();

  let cachedObject: Mesh | null = null;

  const resolveIntersectionMaterial = (obj: Mesh) => {
    const cached = cloneMaterialCache.get(obj);
    if (cached) {
      return cached;
    }

    const multiplier = 10;
    const result = obj.material.clone();

    result.color.r = multiplier;
    result.color.g = multiplier;
    result.color.b = multiplier;

    sourceMaterialCache.set(obj, obj.material);
    cloneMaterialCache.set(obj, result);
    return result;
  };

  const resolveCachedMaterial = (obj: Mesh) => {
    return sourceMaterialCache.get(obj);
  };

  const fxHighlightElement = createEffect((obj: Mesh) => {
    // Intersection throttles at some point, so it doesn't drop intersections if move mouse too fast
    if(cachedObject && cachedObject !== obj){
      fxResetObjectMaterial();
    }
    const intersectionMaterial = resolveIntersectionMaterial(obj);
    obj.material = intersectionMaterial;
    cachedObject = obj;
  });

  const fxResetObjectMaterial = createEffect(() => {
    const cachedMaterial = resolveCachedMaterial(cachedObject!);
    cachedObject!.material = cachedMaterial!;
  });

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
    source: $intersectable,
    effect: createEffect((objects: THREE.Object3D<THREE.Event>[]) => {
      if (!objects.length) {
        return;
      }

      mouseProjection.alignWithMouse();
      const intersectionPoint =
        mouseProjection.getIntersectionPointWith(objects);

      if (intersectionPoint) {
        const obj = intersectionPoint.object as Mesh;
        intersected(intersectionPoint);
      } else {
        resetIntersected();
      }
    }),
  });

  guard(activeElement, {
    filter: Boolean,
    target: fxHighlightElement,
  });

  guard(activeElement, {
    filter: (v) => !v,
    target: fxResetObjectMaterial,
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
