import { clickAuthSubmit } from "../../../script/script";
import { button } from "../button/button";

interface ISubmitButtonProps {
  loginField: HTMLInputElement;
  passwordField: HTMLInputElement;
  loginError: HTMLDivElement;
  passwordError: HTMLDivElement;
}

export const authSubmitButton = ({
  loginField,
  passwordField,
  loginError,
  passwordError,
}: ISubmitButtonProps): HTMLButtonElement => {
  return button({
    text: "Submit",
    onClick: (e: Event): Promise<void> =>
      clickAuthSubmit({ e, loginField, passwordField, loginError, passwordError }),
  });
};
