import { createElement } from "../../../utils";

import "./button.scss";

interface IButtonProps {
  onClick: (e: Event) => void;
  text: string;
  className?: string;
}

export const button = ({ className, text, onClick }: IButtonProps): HTMLButtonElement => {
  const button = createElement({
    tag: "button",
    content: text,
    className: className ? `button ${className}` : "button",
  });
  button.addEventListener("click", onClick);

  return button;
};
