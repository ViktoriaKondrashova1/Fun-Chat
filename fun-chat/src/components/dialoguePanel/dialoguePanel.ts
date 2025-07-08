import { createElement } from "../../utils";
import { dialogueHeader } from "../dialogueHeader/dialogueHeader";
import { dialogueWindow } from "../dialogueWindow/dialogueWindow";
import { messageEditor } from "../messageEditor/messageEditor";

import "./dialoguePanel.scss";

export const dialoguePanel = async (): Promise<HTMLDivElement> => {
  const dialoguePanel = createElement({ tag: "div", className: "dialogue-panel" });
  const header = dialogueHeader();
  const window = dialogueWindow();
  const editor = messageEditor();

  dialoguePanel.appendChild(header);
  dialoguePanel.appendChild(await window);
  dialoguePanel.appendChild(editor);

  return dialoguePanel;
};
