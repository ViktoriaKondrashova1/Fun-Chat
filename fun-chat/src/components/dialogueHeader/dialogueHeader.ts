import { OFFLIME_STATUS, ONLINE_STATUS } from "../../constants";
import { createElement } from "../../utils";
import icon from "../../assets/png/user.png";
import { IUserProps } from "../../types";

import "./dialogueHeader.scss";

export const dialogueHeader = (user?: IUserProps): HTMLDivElement => {
  const dialogueHeader = createElement({ tag: "div", className: "dialogue-header" });

  if (user) {
    const userWrap = createElement({ tag: "div", className: "header-user-wrap" });
    const userIcon = createElement({ tag: "img", className: "header-icon" });
    const contactName = createElement({ tag: "div" });
    const status = createElement({ tag: "div" });
    const online = createElement({ tag: "div", className: "header-user-online" });

    userIcon.src = icon;
    contactName.textContent = user.login;

    if (user.isLogined) {
      status.className = "online-status";
      status.textContent = ONLINE_STATUS;
      userWrap.appendChild(online);
    } else {
      status.className = "offline-status";
      status.textContent = OFFLIME_STATUS;
    }

    userWrap.appendChild(userIcon);
    userWrap.appendChild(contactName);
    dialogueHeader.appendChild(userWrap);
    dialogueHeader.appendChild(status);
  }

  return dialogueHeader;
};
