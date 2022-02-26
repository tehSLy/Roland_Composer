import { attach, createEffect, Store } from "effector";
import { IntersectionsManager } from "./createIntersectionManager";

type Config = {
  intersectionsManager: IntersectionsManager;
};
export const createClickManager = ({ intersectionsManager }: Config) => {
  const clickHandlersMap = new Map();
  const onMouseClick = attach({
    source: intersectionsManager.activeElement as Store<
      THREE.Object3D<THREE.Event>
    >,
    effect: createEffect(
      (params: {
        activeElement: THREE.Object3D<THREE.Event>;
        event: MouseEvent;
      }) => {
        const handler = clickHandlersMap.get(params.activeElement);

        if (!handler) {
          return;
        }

        return handler(params.event);
      }
    ),
    mapParams: (event: MouseEvent, activeElement) => ({ event, activeElement }),
  });
  document.addEventListener("click", onMouseClick);

  return {
    register: <T>(obj: THREE.Object3D, handler: T) =>
      clickHandlersMap.set(obj, handler),
  };
};

export type ClickManager = ReturnType<typeof createClickManager>;
