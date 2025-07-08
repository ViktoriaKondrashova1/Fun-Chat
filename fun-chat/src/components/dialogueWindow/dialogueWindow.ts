import { DILOGUE_WINDOW_TEXT, EMPTY_DIALOGUE_TEXT } from "../../constants";
import { IUserProps } from "../../types";
import { createElement } from "../../utils";
import { message } from "../messageDisplay/messageDisplay";
import { dialogueText } from "../dialogueText/dialogueText";
import { unreadSeparator } from "../unreadSeparator/unreadSeparator";
import { changeReadMesStatus, getMessageHistory } from "../../script/script";

import "./dialogueWindow.scss";

export const dialogueWindow = async (user?: IUserProps): Promise<HTMLDivElement> => {
  const dialogueWindow = createElement({ tag: "div", className: "dialogue-window" });
  let separator: HTMLDivElement | null = null;
  let separatorAdded = false;
  let isProgrammaticScroll = false;

  if (user) {
    const messages = await getMessageHistory(user.login);

    if (messages.length > 0) {
      messages.forEach((mes) => {
        if (mes.from === user.login && !mes.status.isReaded && !separatorAdded) {
          separator = unreadSeparator();
          dialogueWindow.appendChild(separator);
          separatorAdded = true;
        }
        dialogueWindow.appendChild(message(mes, mes.from === user.login));
      });

      if (separatorAdded && separator) {
        isProgrammaticScroll = true;
        setTimeout(() => {
          separator!.scrollIntoView({ behavior: "auto", block: "center" });
          isProgrammaticScroll = false;
        }, 100);
      }
    } else {
      dialogueWindow.appendChild(dialogueText(`${EMPTY_DIALOGUE_TEXT} ${user.login}`));
    }

    const handleScroll = (): void => {
      if (!isProgrammaticScroll && separatorAdded) {
        changeReadMesStatus(messages, user);
        separatorAdded = false;
      }
    };

    dialogueWindow.addEventListener("wheel", handleScroll, { passive: true });
    dialogueWindow.addEventListener("click", handleScroll);
  } else {
    dialogueWindow.appendChild(dialogueText(DILOGUE_WINDOW_TEXT));
  }

  return dialogueWindow;
};
