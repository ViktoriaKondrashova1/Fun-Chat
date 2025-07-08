import { createElement } from "../../utils";

import "./errorMessage.scss";

export const errorMessage = (): HTMLDivElement => {
  const container = createElement({ tag: "div", className: "error-message" });

  return container;
};
