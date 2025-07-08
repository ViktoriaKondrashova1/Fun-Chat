import { createElement } from "../../utils";

import "./unreadMesComponent.scss";

export const unreadMesComponent = (count: number): HTMLDivElement => {
  const unreadEl = createElement({
    tag: "div",
    className: "unread-circle",
    content: `${count}`,
  });

  return unreadEl;
};
