import { PASSWORD } from "../../../constants";
import { authFormValidation } from "../../../script/script";
import { input } from "../input/input";

export const authInput = (type: string, errorElement: HTMLDivElement): HTMLInputElement => {
  const formInput = input({
    type: type === PASSWORD ? "password" : "text",
    placeholder: type,
    onInput: (e: Event) => {
      if (e.target instanceof HTMLInputElement) {
        authFormValidation({ input: e.target, type, errorElement });
      }
    },
  });

  formInput.setAttribute("autocomplete", "off");

  return formInput;
};
