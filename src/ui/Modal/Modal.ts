import { createEvent, Event, sample } from "effector";
import { h, node, spec, StoreOrData } from "forest";
import { storeOrDataToStore } from "../../lib/storeOrDataToStore";
import { basicTextStyle } from "../shared/styles/basicTextStyle";
import { ModalModel } from "./createModalModel";

export type ModalButtonConfig = {
  label: StoreOrData<string>;
  disabled: StoreOrData<boolean>;
  visible: StoreOrData<boolean>;
};

export function Modal(config: {
  header?(): void;
  title: StoreOrData<string>;
  body: StoreOrData<string> | (() => void);
  buttons: ModalButtonConfig[];
  closeOnClickOutside?: StoreOrData<boolean>;
  model: ModalModel;
}) {
  const { close, isOpen: $open } = config.model;
  const closeOnClickOutside = storeOrDataToStore(
    config.closeOnClickOutside,
    true
  );
  const clicked = createEvent<MouseEvent>();
  const modalContent =
    typeof config.body === "function"
      ? config.body
      : () =>
          spec({
            text: storeOrDataToStore(config.body as string, ""),
          });

  sample({
    source: closeOnClickOutside,
    clock: clicked,
    filter: (v) => v,
    target: close,
  });

  ModalBackdrop({
    visible: $open,
  });

  h("div", {
    fn() {
      basicTextStyle({
        class: "fixed z-10 inset-0 overflow-y-auto",
      });

      spec({
        visible: $open,
      });

      h("div", {
        visible: $open,
        attr: {
          class:
            "flex items-end sm:items-center justify-center min-h-full text-center sm:p-0",
        },
        fn() {
          node((el) => {
            el.onclick = (e: MouseEvent) => e.target === el && clicked(e);
          });

          h("div", {
            attr: {
              class:
                "relative bg-neutral-600 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:max-w-lg sm:w-full",
            },
            fn() {
              ModalHeader({
                title: config.title,
                onClose: close,
              });
              ModalContent({
                content: modalContent,
              });
            },
          });
        },
      });
    },
  });
}

function ModalBackdrop(config?: { visible?: StoreOrData<boolean> }) {
  h("div", {
    attr: {
      class: "fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity",
    },
    visible: storeOrDataToStore(config?.visible, false),
  });
}

function ModalHeader(config: {
  title: StoreOrData<string>;
  onClose?: Event<MouseEvent>;
}) {
  h("div", () => {
    spec({
      attr: {
        class: "flex flex-row justify-between",
      },
    });
    h("p", {
      text: config.title,
      fn() {
        basicTextStyle({
          class: "p-1 font-bold",
        });
      },
    });
    h("button", {
      text: "×",
      attr: {
        class:
          "w-8 flex items-center justify-center hover:bg-red-800 hover:text-gray-100",
      },
      fn() {
        if (config.onClose) {
          spec({
            handler: {
              click: config.onClose,
            },
          });
        }
      },
    });
  });
}

function ModalContent({ content }: { content: () => void }) {
  h("div", () => {
    spec({
      attr: {
        class: "px-1",
      },
    });
    content();
  });
}
