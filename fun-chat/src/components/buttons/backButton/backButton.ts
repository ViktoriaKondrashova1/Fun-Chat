import { navigate } from "../../../router";
import { button } from "../button/button";

export const backButton = (backPath: string): HTMLButtonElement => {
  return button({ text: "Back", onClick: () => navigate(backPath) });
};
