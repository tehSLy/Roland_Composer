import { Modal, ModalModel } from "../../ui/Modal";

export function AboutModal({ model }: { model: ModalModel }) {
  return Modal({
    body: "Roland TR-808 Rhythm Composer",
    buttons: [],
    title: "About",
    model,
  });
}
