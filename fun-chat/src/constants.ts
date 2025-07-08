import { RequestType, TValidationRule } from "./types";

export const AUTH_PATH = "/auth";

export const MAIN_PATH = "/main";

export const ABOUT_PATH = "/about";

export const AUTH_PAGE_TITLE = "LOG IN";

export const ABOUT_PAGE_TITLE = "About Fun Chat";

export const ABOUT_PAGE_FIRST_P =
  "Fun Chat is a real-time messaging application designed for seamless communication between users. Built using the WebSocket protocol, it ensures instant message delivery while maintaining privacy and security. The app allows users to exchange messages efficiently, with features that prevent unauthorized deletion or indefinite storage of chat history. With an intuitive interface and responsive design, Fun Chat provides a smooth user experience.";

export const ABOUT_PAGE_SECOND_P =
  "This project was created as part of a learning experience to refine technical skills in front-end development while exploring the fundamentals of real-time communication.";

export const ABOUT_PAGE_THIRD_P = "Developer: ";

export const ABOUT_PAGE_LINK = "viktoriakondrashova1";

export const ABOUT_PAGE_FOURTH_P = "No accounts. No tracking. Just chat.";

export const LOGIN = "Login";

export const PASSWORD = "Password";

const LOGIN_SIZE_REG_EXP = /^.{4,10}$/;

const PUSSWORD_SIZE_REG_EXP = /^.{4,8}$/;

const LETTER_REG_EXP = /^[a-zA-Z0-9]+$/;

const PUSSWORD_CHAR_REG_EXP = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z]).*$/;

const LOGIN_SIZE_ERR = "Login should be more than 3 chars and not exceed 10 chars";

const LOGIN_LETTER_ERR = "Login should consist only of latin letters and numbers";

export const PASSWORD_SIZE_ERR = "Password should be more than 3 chars and not exceed 8 chars";

export const PASSWORD_LETTER_ERR = "Password should consist only of latin letters and numbers";

export const PASSWORD_NOT_VALID =
  "Password should innclude at least one number, one capital letter and one lowercase letter";

export const EMPTY_ERR = "Please, fill in the field";

export const VALIDATION_RULES: { login: TValidationRule; password: TValidationRule } = {
  login: {
    sizeRegExp: LOGIN_SIZE_REG_EXP,
    sizeError: LOGIN_SIZE_ERR,
    letterRegExp: LETTER_REG_EXP,
    letterError: LOGIN_LETTER_ERR,
  },
  password: {
    sizeRegExp: PUSSWORD_SIZE_REG_EXP,
    sizeError: PASSWORD_SIZE_ERR,
    letterRegExp: LETTER_REG_EXP,
    letterError: PASSWORD_LETTER_ERR,
    charRegExp: PUSSWORD_CHAR_REG_EXP,
    charError: PASSWORD_NOT_VALID,
  },
};

export const REQUEST_TYPES: Record<string, RequestType> = {
  userLogin: "USER_LOGIN",
  userLogout: "USER_LOGOUT",
  externalLogin: "USER_EXTERNAL_LOGIN",
  externalLogout: "USER_EXTERNAL_LOGOUT",
  activeUsers: "USER_ACTIVE",
  inactiveUsers: "USER_INACTIVE",
  sendMes: "MSG_SEND",
  mesHistory: "MSG_FROM_USER",
  delivStat: "MSG_DELIVER",
  readStat: "MSG_READ",
  deleteStat: "MSG_DELETE",
  editStat: "MSG_EDIT",
  error: "ERROR",
};

export const USER_NAME = "User:";

export const APP_NAME = "FUN CHAT";

export const ONLINE_STATUS = "Online";

export const OFFLIME_STATUS = "Offline";

export const SERVER_URL = "ws://localhost:4000";

export const CONNECTION_ERR = "WebSocket connection error...";

export const RECONNECTION_ATTAMPT_TEXT = "Connection lost. Trying to reconnect...";

export const DILOGUE_WINDOW_TEXT = "Select someone to chat with...";

export const EMPTY_DIALOGUE_TEXT = "This is the start of your dialogue with";

export const NO_USERS = "There are no users in the list";

export const GITHUB_LINK_TEXT = "by viktoriakondrashova1";

export const GITHUB_LINK_URL = "https://github.com/ViktoriaKondrashova1";

export const RS_LINK_URL = "https://rs.school/";

export const SEPARATOR_TEXT = "Unread messages";
