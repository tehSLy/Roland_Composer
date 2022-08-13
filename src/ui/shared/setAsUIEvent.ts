export const setAsUIEvent = <E extends Event>(event: E) => {
  event.uiEvent = true;
};
