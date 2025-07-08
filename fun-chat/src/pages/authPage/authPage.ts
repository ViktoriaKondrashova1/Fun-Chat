import { authForm } from "../../components/authForm/authForm";
import { createElement } from "../../utils";

import "./authPage.scss";

export const authPage = (): HTMLDivElement => {
  const authPage = createElement({ tag: "div", className: "auth" });
  const form = authForm();

  authPage.appendChild(form);

  return authPage;
};
