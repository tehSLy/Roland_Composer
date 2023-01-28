import {
  combine,
  createEffect,
  createStore,
  guard,
  sample,
  Store,
} from "effector";
import { Material, Mesh } from "three";
import { DragManager } from "./createDragManager";
import { IntersectionsManager } from "./createIntersectionManager";

type Config = {
  intersectionsManager: IntersectionsManager;
  dragManager: DragManager;
};

export const createObjectHighlightManager = ({
  intersectionsManager,
  dragManager,
}: Config) => {
  const cloneMaterialCache = new Map<Mesh, Material>();
  const sourceMaterialCache = new Map<Mesh, Material>();
  const overrideElement = createStore<Mesh | null>(null);
  const elementToHighlight = combine(
    intersectionsManager.activeElement,
    overrideElement,
    (active, override) => {
      return (override || active) as Mesh;
    },
  );

  let cachedObject: Mesh | null = null;

  const resolveIntersectionMaterial = (obj: Mesh) => {
    const cached = cloneMaterialCache.get(obj);
    if (cached) {
      return cached;
    }

    const multiplier = 10;
    const sourceMaterial = obj.material as Material;
    const resultMaterial = sourceMaterial.clone();

    //@ts-ignore
    resultMaterial.color.r = multiplier;
    //@ts-ignore
    resultMaterial.color.g = multiplier;
    //@ts-ignore
    resultMaterial.color.b = multiplier / 2;

    sourceMaterialCache.set(obj, obj.material as Material);
    cloneMaterialCache.set(obj, resultMaterial);
    return resultMaterial;
  };

  const resolveCachedMaterial = (obj: Mesh) => {
    return sourceMaterialCache.get(obj);
  };

  const fxHighlightElement = createEffect((obj: Mesh) => {
    // Intersection throttles at some point, so it doesn't drop intersections if move mouse too fast
    if (cachedObject && cachedObject !== obj) {
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

  guard(elementToHighlight, {
    filter: Boolean,
    target: fxHighlightElement,
  });

  guard(elementToHighlight, {
    filter: (v) => !v,
    target: fxResetObjectMaterial,
  });

  sample({
    source: intersectionsManager.activeElement as any as Store<Mesh>,
    clock: dragManager.onDragStart,
    target: overrideElement,
  });

  overrideElement.reset(dragManager.onDragEnd);

  return {
    highlightElement: fxHighlightElement,
    resetHighlight: fxResetObjectMaterial,
  };
};
