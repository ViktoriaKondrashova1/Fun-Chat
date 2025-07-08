import { toggleMessageMenu } from "../../script/script";
import { IMessageProps } from "../../types";
import { convertDate, createElement } from "../../utils";
import { checkMark } from "../svgIcons/checkMark/checkMark";

import "./messageDisplay.scss";

export const message = (message: IMessageProps, isSendToUser: boolean): HTMLDivElement => {
  const className = isSendToUser ? "contact-message" : "user-message";

  const messageEl = createElement({ tag: "div", className: `message ${className}` });
  messageEl.setAttribute("id", message.id);
  const name = createElement({
    tag: "p",
    className: "contact-name",
    content: `${isSendToUser ? message.from : "you"}`,
  });
  const messageText = createElement({ tag: "p", className: "message-text" });
  messageText.innerHTML = message.text;
  const checkTimeWrap = createElement({ tag: "div", className: "check-time-wrap" });
  const time = createElement({ tag: "p", content: convertDate(message.datetime) });
  const edited = createElement({ tag: "p", className: "message-edited", content: "edited" });

  if (message.status.isEdited) {
    checkTimeWrap.appendChild(edited);
  }

  if (!isSendToUser && message.status.isDelivered) {
    const checkMarkEl = createElement({ tag: "div" });
    checkMarkEl.innerHTML = checkMark(message.status.isReaded);
    checkTimeWrap.appendChild(checkMarkEl);
  }

  messageText.style.paddingRight = "50px";

  messageEl.appendChild(name);
  messageEl.appendChild(messageText);
  checkTimeWrap.appendChild(time);
  messageEl.appendChild(checkTimeWrap);

  if (!isSendToUser)
    messageEl.addEventListener("click", () => toggleMessageMenu(messageEl, message));

  return messageEl;
};
