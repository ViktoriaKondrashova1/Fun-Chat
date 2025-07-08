import { createElement } from "../../../utils";

import "./input.scss";

interface IInputProps {
  type: string;
  onInput: (e: Event) => void;
  className?: string;
  placeholder?: string;
}

export const input = ({ type, onInput, className, placeholder }: IInputProps): HTMLInputElement => {
  const input = createElement({
    tag: "input",
    className: className ? `input ${className}` : "input",
  });

  input.type = type;
  input.addEventListener("input", onInput);
  placeholder && (input.placeholder = placeholder);

  return input;
};
