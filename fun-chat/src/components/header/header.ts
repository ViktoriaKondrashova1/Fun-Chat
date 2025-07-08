import { ABOUT_PATH, APP_NAME, AUTH_PATH, MAIN_PATH, USER_NAME } from "../../constants";
import { navigate } from "../../router";
import { clickLogOut, getHeaderElements } from "../../script/script";
import { getCurrentUser } from "../../storage";
import { createElement } from "../../utils";
import { appLogo } from "../svgIcons/appLogo/appLogo";
import { button } from "../buttons/button/button";

import "./header.scss";
import { backButton } from "../buttons/backButton/backButton";

export const header = (page: string): HTMLDivElement => {
  const user = getCurrentUser();

  const header = createElement({ tag: "div", className: "header" });
  const appContainer = createElement({ tag: "div", className: "header-wrap" });
  const userContainer = createElement({ tag: "div", className: "header-wrap" });
  const btnsContainer = createElement({ tag: "div", className: "header-wrap" });
  const logo = createElement({ tag: "div", className: "header-logo" });
  const appName = createElement({
    tag: "div",
    content: APP_NAME,
    className: "header-text",
  });
  const userName = createElement({
    tag: "div",
    className: "header-text",
    content: `${USER_NAME} ${user ? user.login : ""}`,
  });
  const aboutButton = button({ text: "About", onClick: () => navigate(ABOUT_PATH) });
  const logOutButton = button({ text: "Log out", onClick: () => clickLogOut() });
  const returnButton = user ? backButton(MAIN_PATH) : backButton(AUTH_PATH);

  logo.innerHTML = appLogo();

  appContainer.appendChild(logo);
  appContainer.appendChild(appName);
  userContainer.appendChild(userName);
  header.appendChild(appContainer);
  if (page ===  MAIN_PATH)  header.appendChild(userContainer);
  header.appendChild(btnsContainer);

  const btns = getHeaderElements(page, aboutButton, logOutButton, returnButton);

  if (btns.length > 0) {
    btns.map((btn) => btnsContainer.appendChild(btn));
  }

  return header;
};
