import { dialoguePanel } from "../../components/dialoguePanel/dialoguePanel";
import { userSidePanel } from "../../components/usersSidePanel/usersSidePanel";
import { createElement } from "../../utils";

import "./mainPage.scss";

export const mainPage = async (): Promise<HTMLDivElement> => {
  const mainPage = createElement({ tag: "div", className: "main" });
  const sidePanel = userSidePanel();
  const dialogue = dialoguePanel();

  mainPage.appendChild(await sidePanel);
  mainPage.appendChild(await dialogue);

  return mainPage;
};
