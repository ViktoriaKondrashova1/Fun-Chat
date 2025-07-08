import { dialogueHeader } from "../components/dialogueHeader/dialogueHeader";
import { dialogueWindow } from "../components/dialogueWindow/dialogueWindow";
import { messageEditor } from "../components/messageEditor/messageEditor";
import { messageMenu } from "../components/messageMenu/messageMenu";
import { modal } from "../components/modal/moda";
import { userNameDisplay } from "../components/userNameDisplay/userNameDisplay";
import { usersContainer } from "../components/usersContainer/usersContainer";
import {
  ABOUT_PATH,
  AUTH_PATH,
  EMPTY_ERR,
  LOGIN,
  MAIN_PATH,
  REQUEST_TYPES,
  VALIDATION_RULES,
} from "../constants";
import { navigate } from "../router";
import { getServerResponse } from "../socket";
import { getCurrentUser, setCurrentsUser } from "../storage";
import { IAuthFormValidation, IClickSubmitProps, IMessageProps, IUserProps } from "../types";
import { scrollElement } from "../utils";

let editingMessage: IMessageProps | null = null;

export const authFormValidation = ({ input, type, errorElement }: IAuthFormValidation): void => {
  const rules = type === LOGIN ? VALIDATION_RULES.login : VALIDATION_RULES.password;

  if (!rules.sizeRegExp.test(input.value)) {
    errorElement.textContent = rules.sizeError;
    return;
  }

  if (!rules.letterRegExp.test(input.value)) {
    errorElement.textContent = rules.letterError;
    return;
  }

  if (rules.charRegExp && !rules.charRegExp.test(input.value)) {
    errorElement.textContent = rules.charError || "";
    return;
  }

  errorElement.textContent = "";
};

export const getHeaderElements = (
  page: string,
  ...btns: HTMLButtonElement[]
): HTMLButtonElement[] => {
  const [aboutButton, logOutButton, returnButton] = btns;

  switch (page) {
    case MAIN_PATH:
      return [aboutButton, logOutButton];
    case ABOUT_PATH:
      const user = getCurrentUser();
      return user ? [returnButton, logOutButton] : [returnButton];
    case AUTH_PATH:
      return [aboutButton];
    default:
      return [];
  }
};

const emptyFormValidation = (
  loginField: HTMLInputElement,
  passwordField: HTMLInputElement
): string => {
  return !loginField.value || !passwordField.value ? EMPTY_ERR : "";
};

export const showErrorModal = (error: string): void => {
  const errModal = modal(`Error: ${error}.`);
  document.body.appendChild(errModal);
};

export const clickAuthSubmit = async ({
  e,
  loginField,
  passwordField,
  loginError,
  passwordError,
}: IClickSubmitProps): Promise<void> => {
  e.preventDefault();

  const error = emptyFormValidation(loginField, passwordField);
  const login = loginField.value;
  const password = passwordField.value;

  if (error) passwordError.textContent = error;

  if (!loginError.textContent && !passwordError.textContent) {
    getServerResponse(REQUEST_TYPES.userLogin, { user: { login, password } }).then(
      async (): Promise<void> => {
        setCurrentsUser({ login, password });
        navigate(MAIN_PATH);
      }
    );
  }
};

export const clickLogOut = async (): Promise<void> => {
  const currentUser = getCurrentUser();

  if (currentUser) {
    getServerResponse(REQUEST_TYPES.userLogout, {
      user: {
        login: currentUser.login,
        password: currentUser.password,
      },
    }).then((): void => navigate(AUTH_PATH));
  }

  sessionStorage.clear();
};

export const filterUsersArray = (users: IUserProps[]): IUserProps[] => {
  const currentUser = getCurrentUser();

  if (currentUser) {
    return users.filter((user: IUserProps) => user.login != currentUser.login);
  }

  return [];
};

export const updateMessageInput = (user: IUserProps): void => {
  const messageInputEl = document.querySelector(".editor");

  const newMessageInputEl = messageEditor(user);

  if (messageInputEl) messageInputEl.replaceWith(newMessageInputEl);
};

export const updateAllUsersPanel = async (users?: IUserProps[]): Promise<void> => {
  const usersSidePanel = document.querySelector(".users-container");

  const newUsersSidePanel = users ? usersContainer(users) : usersContainer();

  usersSidePanel?.replaceWith(await newUsersSidePanel);
};

export const getAllUsersArray = async (): Promise<IUserProps[]> => {
  const responses = await Promise.all([
    getServerResponse(REQUEST_TYPES.activeUsers, null),
    getServerResponse(REQUEST_TYPES.inactiveUsers, null),
  ]);

  return filterUsersArray(
    responses.flatMap((response) => (response && "users" in response ? response.users : []))
  );
};

export const searchUser = async (value: string): Promise<void> => {
  const allUsers = await getAllUsersArray();

  const searchQuery = value.trim().toLowerCase();

  const filteredUsers = allUsers.filter((user) => user.login.toLowerCase().includes(searchQuery));

  updateAllUsersPanel(filteredUsers);
};

export const getMessageFromUser = async (message: IMessageProps): Promise<void> => {
  const dialogueUserEl = document.querySelector(".header-user-wrap");
  const unreadEl = document.querySelector(".unread-circle");
  const openedUserDialogue = dialogueUserEl?.textContent;

  if (message.from === openedUserDialogue) {
    if (!unreadEl) {
      getServerResponse(REQUEST_TYPES.readStat, { message: { id: message.id } });
    }
    updateUserDisplay({ login: message.from, isLogined: true });
  } else {
    const userDisplay = document.querySelectorAll(".user-name-display");
    for (const userEl of userDisplay) {
      if (message.from === userEl.textContent) {
        updateUserDisplay({ login: message.from, isLogined: true });
      }
    }
  }
};

export const toggleMessageMenu = (container: HTMLDivElement, message: IMessageProps): void => {
  const existingMenu = container.querySelector(".message-menu");

  if (existingMenu) {
    existingMenu.remove();
  } else {
    container.appendChild(messageMenu(message));
  }
};

export const deleteMessage = (message: IMessageProps): void => {
  getServerResponse(REQUEST_TYPES.deleteStat, { message: { id: message.id } });
  updateMessageHistory();
};

export const editMessage = (message: IMessageProps): void => {
  const messageInput = document.querySelector(".message-input");

  if (messageInput && messageInput instanceof HTMLTextAreaElement) {
    messageInput.value = message.text;
    messageInput.focus();
    editingMessage = message;
  }
};

export const getMessageHistory = async (login: string): Promise<IMessageProps[]> => {
  const response = await getServerResponse(REQUEST_TYPES.mesHistory, { user: { login } });
  return response && "messages" in response ? response.messages : [];
};

export const handleSendMessage = async (text: string, user: IUserProps): Promise<void> => {
  const messages = await getMessageHistory(user.login);

  if (editingMessage) {
    getServerResponse(REQUEST_TYPES.editStat, { message: { id: editingMessage.id, text } });
    updateMessageHistory(user);
    editingMessage = null;
  } else {
    getServerResponse(REQUEST_TYPES.sendMes, { message: { to: user.login, text: text.trim() } });
    changeReadMesStatus(messages, user);
  }
};

export const changeReadMesStatus = (messages: IMessageProps[], user: IUserProps): void => {
  const anotherUserMessages = messages.filter((mes) => mes.from === user.login);
  const unreadMessages = anotherUserMessages.filter((mes) => !mes.status.isReaded);
  unreadMessages.forEach((mes) => {
    getServerResponse(REQUEST_TYPES.readStat, { message: { id: mes.id } });
  });
  updateMessageHistory(user);
  updateUserDisplay(user);
};

export const selectUserDialogue = async (user: IUserProps): Promise<void> => {
  await Promise.all([
    updateDialogueHeader(user),
    updateMessageHistory(user),
    updateMessageInput(user),
  ]);
};

export const updateMessageHistory = async (user?: IUserProps): Promise<void> => {
  const dialogueUserEl = document.querySelector(".header-user-wrap");
  const dialogueEl = document.querySelector(".dialogue-window");

  const openedUserDialogue = dialogueUserEl?.textContent;

  if (user && openedUserDialogue === user.login) {
    const newDialogueEl = await dialogueWindow(user);

    dialogueEl?.replaceWith(newDialogueEl);

    scrollElement(newDialogueEl);
  } else {
    if (openedUserDialogue) {
      const newDialogueEl = await dialogueWindow({ login: openedUserDialogue, isLogined: true });

      dialogueEl?.replaceWith(newDialogueEl);

      scrollElement(newDialogueEl);
    }
  }
};

export const updateUserDisplay = async (user: IUserProps): Promise<void> => {
  const userDisplayEl = document.querySelectorAll(".user-display");
  for (const parentEl of userDisplayEl) {
    const childEl = parentEl.querySelector(".user-name-display");

    if (childEl?.textContent === user.login) {
      const messageHistory = await getMessageHistory(user.login);
      const newUserDisplayEl = await userNameDisplay(user, messageHistory);
      parentEl.replaceWith(newUserDisplayEl);
    }
  }
};

export const updateDialogueHeader = async (user: IUserProps): Promise<void> => {
  const headerEl = document.querySelector(".dialogue-header");

  const newHeaderEl = dialogueHeader(user);

  if (headerEl) headerEl.replaceWith(newHeaderEl);
};

export const updateDialogueHeaderIfOpened = async (user: IUserProps): Promise<void> => {
  const headerEl = document.querySelector(".dialogue-header");
  const dialogueUserEl = document.querySelector(".header-user-wrap");
  const openedUserDialogue = dialogueUserEl?.textContent;

  if (openedUserDialogue) {
    const newHeaderEl = dialogueHeader(user);

    if (headerEl) headerEl.replaceWith(newHeaderEl);
  }
};
