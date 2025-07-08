import { createElement } from "../../utils";

export const dialogueText = (text: string): HTMLDivElement => {
  const dialogueTextEl = createElement({ tag: "div", className: "dialogue-window-text" });

  dialogueTextEl.textContent = text;

  return dialogueTextEl;
};
