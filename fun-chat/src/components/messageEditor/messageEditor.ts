import { IUserProps } from "./../../types";
import { createElement } from "../../utils";
import { button } from "../buttons/button/button";
import { messageInput } from "../inputs/messageInput/messageInput";
import { handleSendMessage } from "../../script/script";

import "./messageEditor.scss";

export const messageEditor = (user?: IUserProps): HTMLDivElement => {
  const messageEditor = createElement({ tag: "div", className: "editor" });
  const input = user ? messageInput((): void => handleEvent()) : messageInput();
  const sendButton = button({
    text: "",
    className: "send-button",
    onClick: (): void => handleEvent(),
  });
  const arrow = createElement({ tag: "div" });

  if (!user) {
    input.disabled = true;
    sendButton.disabled = true;
  }

  sendButton.appendChild(arrow);
  messageEditor.appendChild(input);
  messageEditor.appendChild(sendButton);

  const handleEvent = (): void => {
    if (user && input.value.trim()) {
      handleSendMessage(input.value, user);
      input.value = "";
    }
  };

  return messageEditor;
};
