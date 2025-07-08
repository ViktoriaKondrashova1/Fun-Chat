import { AUTH_PAGE_TITLE, LOGIN, PASSWORD } from "../../constants";
import { createElement } from "../../utils";
import { authSubmitButton } from "../buttons/authSubmitButton/authSubmitButton";
import { errorMessage } from "../errorMessage/errorMessage";
import { authInput } from "../inputs/authInput/authInput";

import "./authForm.scss";

export const authForm = (): HTMLFormElement => {
  const form = createElement({ tag: "form", className: "auth-form" });
  const title = createElement({ tag: "h3", content: AUTH_PAGE_TITLE });
  const loginError = errorMessage();
  const passwordError = errorMessage();
  const loginField = authInput(LOGIN, loginError);
  const passwordField = authInput(PASSWORD, passwordError);
  const submitButton = authSubmitButton({ loginField, passwordField, loginError, passwordError });

  form.appendChild(title);
  form.appendChild(loginField);
  form.appendChild(loginError);
  form.appendChild(passwordField);
  form.appendChild(passwordError);
  form.appendChild(submitButton);

  return form;
};
