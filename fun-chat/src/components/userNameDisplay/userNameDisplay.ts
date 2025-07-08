import { createElement } from "../../utils";
import icon from "../../assets/png/user.png";
import { IMessageProps, IUserProps } from "../../types";
import { selectUserDialogue } from "../../script/script";
import { unreadMesComponent } from "../unreadMesComponent/unreadMesComponent";

import "./userNameDisplay.scss";

export const userNameDisplay = async (
  user: IUserProps,
  messageHistory: IMessageProps[]
): Promise<HTMLDivElement> => {
  const displayContainer = createElement({ tag: "div", className: "user-display" });
  const userIcon = createElement({ tag: "img", className: "user-icon" });
  userIcon.src = icon;
  const nameText = createElement({
    tag: "div",
    className: "user-name-display",
    content: user.login,
  });
  const online = createElement({ tag: "div", className: "user-online" });

  displayContainer.appendChild(userIcon);
  displayContainer.appendChild(nameText);

  if (user.isLogined) displayContainer.appendChild(online);

  const unreadMessagesCount = messageHistory.filter(
    (mes) => !mes.status.isReaded && mes.from === user.login
  ).length;

  if (unreadMessagesCount > 0) {
    displayContainer.appendChild(unreadMesComponent(unreadMessagesCount));
  }

  displayContainer.addEventListener("click", () => selectUserDialogue(user));

  return displayContainer;
};
