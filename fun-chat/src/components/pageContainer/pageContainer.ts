import { createElement } from "../../utils";
import { header } from "../header/header";
import { getCurrentPath } from "../../router";
import { footer } from "../footer/footer";

import "../../style.scss";

export const pageContainer = (content: HTMLDivElement): HTMLDivElement => {
  const page = getCurrentPath();

  const container = createElement({ tag: "div", className: "container" });

  container.appendChild(header(page));
  container.appendChild(content);
  container.appendChild(footer());

  return container;
};
