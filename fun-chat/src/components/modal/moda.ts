import { createElement } from "../../utils";

import "./modal.scss";

export const modal = (text: string): HTMLDivElement => {
  const modal = createElement({ tag: "div", className: "modal" });
  const modalContent = createElement({ tag: "div", className: "modal-content" });
  const closeButton = createElement({ tag: "div", className: "modal-close" });

  modalContent.textContent = text;

  closeButton.addEventListener("click", (): void => modal.remove());

  modal.appendChild(modalContent);
  modalContent.appendChild(closeButton);

  return modal;
};
