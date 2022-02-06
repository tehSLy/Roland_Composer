import {
  attach,
  createEffect,
  createEvent,
  createStore,
  forward,
  guard,
  is,
  Store,
} from "effector";

type Config = {
  delay?: number | Store<number>;
};

const createInterface = () => {
  const start = createEvent();
  const stop = createEvent();
  const toggle = createEvent();
  const tick = createEvent();
  const $isRunning = createStore(false);

  $isRunning
    .on(start, () => true)
    .on(stop, () => false)
    .on(toggle, (is) => !is);

  return {
    start,
    stop,
    toggle,
    tick,
    $isRunning,
  };
};

export const createTicker = ({ delay = 100 }: Config) => {
  const { $isRunning, start, stop, tick, toggle } = createInterface();
  const $delay = is.store(delay) ? delay : createStore(delay);

  const fxTick = attach({
    source: $delay,
    effect: createEffect(
      (delay: number) => new Promise((rs) => setTimeout(rs, delay))
    ),
  });

  guard(fxTick.done, {
    filter: $isRunning,
    target: fxTick,
  });

  forward({ from: start, to: fxTick });
  forward({ from: fxTick, to: tick });

  return {
    start,
    stop,
    toggle,
    tick,
    isRunning: $isRunning,
  };
};

export const createAnimationFrameTicker = () => {
  const { $isRunning, start, stop, tick, toggle } = createInterface();

  $isRunning.watch(tick, (is) =>
    is ? requestAnimationFrame(tick as any) : null
  );

  forward({ from: start, to: tick });

  return {
    start,
    stop,
    toggle,
    tick,
    isRunning: $isRunning,
  };
};
