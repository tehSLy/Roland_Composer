import {
  combine,
  createEffect,
  createEvent,
  createStore,
  forward,
  restore,
  sample,
} from "effector";
import { Object3D } from "three";
import { createIntersectionsManager } from "../../features/Player/3DModel";
import "./style.module.scss";
import { createUI } from "./UI";

export const createHighlightHelper = ({ camera }) => {
  const mouseClicked = createEvent<any>();
  const item = createStore<Object3D | null>(null);
  const itemSelected = createEvent<Object3D | null>();

  const setElementsCache = createEvent<Object3D[]>();
  const $elementsCache = restore(setElementsCache, []);

  const { render, setIntersectable, activeElement } =
    createIntersectionsManager({ camera });

  const bindScene = (elems: any[]) => {
    const flatten = flattenRecursive(elems);
    setElementsCache(flatten);
    // setIntersectable(flatten);
  };

  const update = createEffect(() => {
    render();
  });

  document.addEventListener("click", mouseClicked);

  sample({
    clock: mouseClicked,
    source: activeElement,
    target: item,
    fn: (intersection) => intersection?.object || null,
  });

  sample({
    clock: mouseClicked,
    source: activeElement,
    target: itemSelected,
    fn: (intersection) => intersection?.object || null,
  });

  const { assignedControls } = createUI({
    activeElement: item,
    mouseClicked,
    itemSelected,
  });

  const $availableElements = combine(
    $elementsCache,
    assignedControls,
    (cache, assigned) => {
      const assignedNames = Object.values(assigned);
      const filtered = cache.filter((el) => !assignedNames.includes(el.name));
      
      return filtered;
    }
  );

  forward({ from: $availableElements, to: setIntersectable });

  return {
    bindScene,
    update,
  };
};

function flattenRecursive(elems: Object3D[] | Object3D) {
  let result: Object3D[] = [];
  if (elems instanceof Array) {
    result = result.concat(elems);

    for (const elem of elems) {
      result = result.concat(flattenRecursive(elem.children));
    }
  } else {
    result = result.concat(elems, flattenRecursive(elems.children));
  }

  return result;
}
