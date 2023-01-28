import {
  attach,
  combine,
  createEffect,
  createEvent,
  createStore,
  Event,
  guard,
  restore,
  sample,
  Store,
} from "effector";
import { h, list, remap, spec, using } from "forest";
import { Object3D } from "three";
import { $controlsNames } from "./controls";
import { parseControls } from "./parseControls";

const lsKey = "controls_mapping";

export function createUI({
  activeElement,
  itemSelected,
}: {
  activeElement: Store<Object3D | null>;
  mouseClicked: Event<any>;
  itemSelected: Event<Object3D | null>;
}) {
  const root = document.createElement("div");
  root.className = "ui-wrapper";
  document.body.append(root);

  root.addEventListener("click", (e) => {
    e.preventDefault();
    e.stopImmediatePropagation();
  });

  const setCached = createEvent<Object3D | null>();
  const $cachedObject = restore(setCached, null);
  const assignCurrent = createEvent();

  const resetAssigned = createEvent();
  const assignControl = createEvent<{ key: string; targetId: string | null }>();
  const $assignedControls = createStore<Record<string, string | null>>({});
  const setCurrentControl = createEvent<string>();
  const $currentControl = restore(
    setCurrentControl,
    $controlsNames.getState()[0],
  );
  const $availableControls = combine(
    $controlsNames,
    $assignedControls,
    (controls, assigned) => {
      const result: string[] = [];
      for (const control of controls) {
        if (!assigned[control]) {
          result.push(control);
        }
      }

      return result;
    },
  );

  const fxSave = attach({
    source: $assignedControls,
    effect: (mapping: any) =>
      localStorage.setItem(lsKey, JSON.stringify(mapping)),
  });

  const fxLoad = createEffect(() => {
    const data = localStorage.getItem(lsKey);
    if (!data) {
      return {};
    }

    return JSON.parse(data);
  });

  using(root, () => {
    ControlsSelect({
      controls: $availableControls,
      current: $currentControl,
      onChange: setCurrentControl,
    });
    SelectedElement({ activeElement });
    ButtonsBlock({
      reset: resetAssigned,
      save: fxSave.prepend(() => null),
      load: fxLoad.prepend(() => null),
    });
    AssignedControls({
      controls: $assignedControls,
      deleteControl: assignControl.prepend((key) => ({ key, targetId: null })),
    });
  });

  window.foo = () => parseControls($assignedControls.getState());

  $assignedControls
    .on(assignControl, (assigned, { key, targetId }) => ({
      ...assigned,
      [key]: targetId,
    }))
    .on(fxLoad.doneData, (_, data) => data)
    .reset(resetAssigned);

  $cachedObject.reset(assignCurrent);

  const currentControlAssigned = sample({
    source: {
      key: $currentControl,
      targetId: activeElement.map((el) => el?.name || ""),
    },
    clock: assignCurrent,
    fn: (params) => params,
    target: assignControl,
  });

  sample({
    source: $availableControls,
    clock: currentControlAssigned,
    fn: (controls) => controls[0],
    target: setCurrentControl,
  });

  const elementClicked = sample(
    $cachedObject,
    itemSelected,
    (prev, current) => ({ current, prev }),
  );

  guard(elementClicked, {
    filter: ({ current, prev }) => (current && prev ? current === prev : false),
    target: assignCurrent,
  });

  guard(elementClicked, {
    filter: ({ current, prev }) => current !== prev,
    target: setCached.prepend(({ current }) => current),
  });

  return {
    assignControl,
    assignedControls: $assignedControls,
  };
}

const ControlsSelect = ({
  controls,
  current,
  onChange,
}: {
  controls: Store<string[]>;
  current: Store<string>;
  onChange: Event<string>;
}) => {
  h("select", () => {
    spec({
      handler: { change: onChange.prepend((e) => e.target?.value) },
    });

    const controlsParsed = combine(controls, current, (entries, curr) => {
      const result = entries.map((el) => ({
        value: el,
        isCurrent: el === curr,
      }));
      return result;
    });

    list(
      {
        source: controlsParsed,
        key: "value",
      },
      ({ store }) => {
        h("option", {
          text: remap(store, "value"),
        });
      },
    );
  });
};

const AssignedControls = ({
  controls,
  deleteControl,
}: {
  controls: Store<Record<string, string | null>>;
  deleteControl: Event<string>;
}) => {
  const parsedControls = controls.map((record) =>
    Object.entries(record)
      .map(([k, v]) => ({ key: k, value: v }))
      .filter(({ value }) => !!value),
  );

  h("div", () => {
    list(parsedControls, ({ store }) => {
      const click = createEvent<any>();
      sample({
        source: store,
        clock: click,
        fn: ({ key }) => key,
        target: deleteControl,
      });
      h("p", () => {
        spec({
          attr: {
            class: "assigned-controls-row",
          },
        });
        h("span", {
          text: store.map(({ key, value }) => `${key}: ${value}`),
        });
        h("button", {
          text: "delete",
          handler: {
            click,
          },
        });
      });
    });
  });
};

const SelectedElement = ({
  activeElement,
}: {
  activeElement: Store<Object3D | null>;
}) => {
  h("div", {
    text: activeElement.map((el) => `Selected: ${el?.name || "none"}`),
    attr: {
      class: "selected-item-wrapper",
    },
    data: {
      active: activeElement.map(Boolean),
    },
  });
};

const ButtonsBlock = ({
  load,
  reset,
  save,
}: {
  reset: Event<any>;
  save: Event<any>;
  load: Event<any>;
}) => {
  h("div", () => {
    spec({
      attr: {
        class: "buttons-block",
      },
    });
    h("button", {
      text: "Reset assigned",
      handler: { click: reset },
    });
    h("button", {
      text: "Save assigned",
      handler: { click: save },
    });
    h("button", {
      text: "Load assigned",
      handler: { click: load },
    });
  });
};
