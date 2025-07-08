import { deleteMessage, editMessage } from "../../script/script";
import { IMessageProps } from "../../types";
import { createElement } from "../../utils";
import { deleteSvg } from "../svgIcons/deleteSvg/deleteSvg";
import { editSvg } from "../svgIcons/editSvg/editSvg";

import "./messageMenu.scss";

export const messageMenu = (message: IMessageProps): HTMLDivElement => {
  const menu = createElement({ tag: "div", className: "message-menu" });

  const editEl = createElement({ tag: "div", className: "menu-icon" });
  editEl.innerHTML = editSvg();
  const deleteEl = createElement({ tag: "div", className: "menu-icon" });
  deleteEl.innerHTML = deleteSvg();

  menu.appendChild(editEl);
  menu.appendChild(deleteEl);

  deleteEl.addEventListener("click", () => deleteMessage(message));
  editEl.addEventListener("click", () => editMessage(message));

  return menu;
};
