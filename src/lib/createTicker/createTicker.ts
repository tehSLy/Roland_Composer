import {
  attach,
  createEffect,
  createEvent,
  createStore,
  forward,
  guard,
  is,
  split,
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
  const $delay = is.store(delay)
    ? (delay as Store<number>)
    : (createStore(delay) as Store<number>);

  const fxTick = attach({
    source: $delay,
    effect: createEffect(
      (delay: number) => new Promise((rs) => setTimeout(rs, delay)),
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
    is ? requestAnimationFrame(tick as any) : null,
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

type AdjustableTickerMode = "rAF" | "delay";

type AdjustableTickerConfig = {
  delay?: number | Store<number>;
  mode?: AdjustableTickerMode | Store<AdjustableTickerMode>;
};

export const createAdjustableTicker = ({
  delay,
  mode,
}: AdjustableTickerConfig) => {
  const delayTicker = createTicker({ delay });
  const rafTicker = createAnimationFrameTicker();
  const $mode = mode
    ? typeof mode === "string"
      ? createStore(mode)
      : mode
    : createStore<AdjustableTickerMode>("rAF");

  const { $isRunning, start, stop, tick, toggle } = createInterface();

  split({
    source: start,
    match: $mode,
    cases: {
      rAF: rafTicker.start,
      delay: delayTicker.start,
    },
  });

  // restart ticker upon mode change
  forward({ from: $mode, to: [stop, start] });

  forward({ from: stop, to: [delayTicker.stop, rafTicker.stop] });

  return {
    isRunning: $isRunning,
    start,
    stop,
    tick,
    toggle,
  };
};
