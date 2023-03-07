import { createEffect, createEvent, createStore, sample } from "effector";
import { appModel } from "~/model";

export const copyShareUrlClicked = createEvent();

export const $shareInputValue = createStore("");

const copyShareInputValueFx = createEffect((shareURL: string) => {
  navigator.clipboard.writeText(shareURL);
});

sample({
  clock: appModel.uiModel.shareModal.open,
  target: appModel.getShareUrl,
});

sample({
  clock: appModel.getShareUrl.doneData,
  target: $shareInputValue,
});

sample({
  clock: copyShareUrlClicked,
  source: $shareInputValue,
  target: [copyShareInputValueFx, appModel.uiModel.shareModal.close],
});
