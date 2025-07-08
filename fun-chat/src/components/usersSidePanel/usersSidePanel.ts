import { createElement } from "../../utils";
import { searchInput } from "../inputs/searchInput/searchInput";
import { usersContainer } from "../usersContainer/usersContainer";

import "./userSidePanel.scss";

export const userSidePanel = async (): Promise<HTMLDivElement> => {
  const sidePanel = createElement({ tag: "div", className: "side-panel" });
  const search = searchInput();
  const usersEL = usersContainer();

  sidePanel.appendChild(search);
  sidePanel.appendChild(await usersEL);

  return sidePanel;
};
