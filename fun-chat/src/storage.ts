import { IAuthStoreProps } from "./types";

export const getCurrentUser = (): IAuthStoreProps | undefined => {
  const user = sessionStorage.getItem("user");
  return user ? JSON.parse(user) : undefined;
};

export const setCurrentsUser = (user: IAuthStoreProps): void => {
  sessionStorage.setItem("user", JSON.stringify(user));
};

export const removeCurrentsUser = (): void => {
  sessionStorage.removeItem("user");
};
