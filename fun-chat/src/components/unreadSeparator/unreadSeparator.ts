import { SEPARATOR_TEXT } from "../../constants";
import { createElement } from "../../utils";

import "./unreadSeparator.scss";

export const unreadSeparator = (): HTMLDivElement => {
  const separator = createElement({ tag: "div", className: "separator" });
  const separatorText = createElement({ tag: "div", className: "separator-text", content: SEPARATOR_TEXT });

  separator.appendChild(separatorText);

  return separator;
};
