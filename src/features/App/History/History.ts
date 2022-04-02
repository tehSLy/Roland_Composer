import { createStore, Event, merge, Store } from "effector";
import { styled } from "foliage";
import { h, list, remap, spec } from "forest";
import { HistoryAction } from "./HistoryActionType";

type Config<T> = {
  actions: T;
};

export const History = <A extends Event<HistoryAction>[]>(actions: A) => {
  const actionTriggered = merge(actions) as Event<HistoryAction>;
  const $steps = createStore<HistoryAction[]>([]);

  $steps.on(actionTriggered, (state, action) => [...state, action]);

  Wrapper(() => {
    h("span", {
      text: "History:",
    });
    list($steps, ({ store }) => HistoryItem(store));
  });
};

const HistoryItem = (config: Store<HistoryAction>) => {
  const $type = remap(config, "type");
  const $value = remap(config, "value");

  ItemWrapper(() => {
    h("span", {
      text: $type,
    });
    h("span", {
      text: $value,
    });

    spec({
      data: {
        type: $type,
      },
    });
  });
};

const ItemWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;

  &[data-type="INSTRUMENT"] {
    color: #ffdf5b;
  }

  &[data-type="MODE"] {
    color: #6aff5b;
  }
`;

const Wrapper = styled.div`
  position: fixed;
  left: 0px;
  top: 0px;
  width: 15rem;
  background: rgba(0, 0, 0, 0.3);

  font-family: monospace;
`;
