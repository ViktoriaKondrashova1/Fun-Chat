import { createElement } from "../../../utils";

import "./messageInput.scss";

export const messageInput = (onKeyDown?: () => void): HTMLTextAreaElement => {
  const messageInput = createElement({ tag: "textarea", className: "message-input" });
  messageInput.placeholder = "Write a message...";

  onKeyDown &&
    messageInput.addEventListener("keydown", (e: KeyboardEvent) => {
      if (e.key === "Enter") {
        e.preventDefault();
        onKeyDown();
      }
    });

  return messageInput;
};
