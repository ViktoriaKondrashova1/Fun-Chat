import { searchUser } from "../../../script/script";
import { input } from "../input/input";

export const searchInput = (): HTMLInputElement => {
  const searchInput = input({
    type: "Search",
    onInput: (e: Event): void => {
      if (e.target instanceof HTMLInputElement) {
        searchUser(e.target.value);
      }
    },
    placeholder: "Search...",
  });

  return searchInput;
};
