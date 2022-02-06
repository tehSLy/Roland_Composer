import { attach, createEffect, createStore, StoreValue } from "effector";

type SoundLaunchParams = {
  name: string;
};

export const createSoundLoader = (config: {
  soundsURLs: Record<string, string>;
}) => {
  const fxResolveSounds = createEffect(() => {
    const result = Object.fromEntries(
      Object.keys(config.soundsURLs).map((key) => [
        key,
        new Audio(config.soundsURLs[key as keyof typeof config.soundsURLs]),
      ])
    );
    return result;
  });

  const $sounds = createStore<Record<string, HTMLAudioElement>>({});

  const fxPlaySound = attach({
    source: $sounds,
    effect: createEffect(
      (params: SoundLaunchParams & { sounds: StoreValue<typeof $sounds> }) => {
        const sound = params.sounds[params.name].play();
      }
    ),
    mapParams: (params: SoundLaunchParams, sounds) => ({ ...params, sounds }),
  });

  $sounds.on(fxResolveSounds.doneData, (_, sounds) => sounds);

  return {
    resolveSounds: fxResolveSounds,
    playSound: fxPlaySound,
    sounds: $sounds,
  };
};
