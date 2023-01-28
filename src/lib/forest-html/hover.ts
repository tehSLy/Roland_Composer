import { createEvent, Effect, Event as EffectorEvent, forward } from "effector";
import { spec } from "forest";

export const hover = <
  T extends
    | EffectorEvent<{ hovered: boolean; event: Event }>
    | Effect<{ hovered: boolean; event: Event }, any, any>,
>(
  handler?: T,
) => {
  const onHover = createEvent<{ hovered: boolean; event: Event }>();
  spec({
    handler: {
      mouseenter: onHover.prepend((event) => ({ event, hovered: true })),
      mouseleave: onHover.prepend((event) => ({ event, hovered: false })),
    },
  });
  if (handler) {
    forward({ from: onHover, to: handler });
  }

  return onHover;
};
