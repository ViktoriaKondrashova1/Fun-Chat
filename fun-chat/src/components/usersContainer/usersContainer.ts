import { NO_USERS } from "../../constants";
import { getAllUsersArray, getMessageHistory } from "../../script/script";
import { IUserProps } from "../../types";
import { createElement } from "../../utils";
import { userNameDisplay } from "../userNameDisplay/userNameDisplay";

export const usersContainer = async (users?: IUserProps[]): Promise<HTMLDivElement> => {
  const allUsers = users || (await getAllUsersArray());

  const usersContainer = createElement({ tag: "div", className: "users-container" });

  if (allUsers.length) {
    const userDisplays = await Promise.all(
      allUsers.map(async (user) => {
        const messageHistory = await getMessageHistory(user.login);
        return await userNameDisplay(user, messageHistory);
      })
    );

    userDisplays.forEach((userDisplay) => usersContainer.appendChild(userDisplay));
  } else {
    const noUsersEl = createElement({ tag: "div", className: "no-users", content: NO_USERS });
    usersContainer.appendChild(noUsersEl);
  }

  return usersContainer;
};
