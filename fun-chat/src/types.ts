export interface IElementProps<K extends keyof HTMLElementTagNameMap> {
  tag: K;
  className?: string;
  content?: string;
}

export type TValidationRule = {
  sizeRegExp: RegExp;
  sizeError: string;
  letterRegExp: RegExp;
  letterError: string;
  charRegExp?: RegExp;
  charError?: string;
};

export interface IAuthFormValidation {
  input: HTMLInputElement;
  type: string;
  errorElement: HTMLDivElement;
}

export interface IUserProps {
  login: string;
  isLogined: boolean;
}

export interface IClickSubmitProps {
  e: Event;
  loginField: HTMLInputElement;
  passwordField: HTMLInputElement;
  loginError: HTMLDivElement;
  passwordError: HTMLDivElement;
}

export interface IMessageProps {
  id: string;
  from: string;
  to: string;
  text: string;
  datetime: number;
  status: {
    isDelivered: boolean;
    isReaded: boolean;
    isEdited: boolean;
  };
}

interface IMessageSendProps {
  message: {
    to: string;
    text: string;
  };
}

export interface IAuthStoreProps {
  login: string;
  password: string;
}

interface IAuthDataProps {
  user: {
    login: string;
    password: string;
  };
}

interface IEditMessageProps {
  message: {
    id: string;
    text: string;
  };
}

interface IMessageIdProps {
  message: {
    id: string;
  };
}

interface IUserLoginProps {
  user: {
    login: string;
  };
}

interface IAllUsersProps {
  users: IUserProps[];
}

interface IMessageHistoryProps {
  messages: IMessageProps[];
}

interface IMessageReadProps {
  id: string;
  status: {
    isReaded: boolean;
  };
}

interface IMessageDeleteProps {
  id: string;
  status: {
    isDeleted: boolean;
  };
}

interface IMessageEditProps {
  id: string;
  text: string;
  status: {
    isEdited: boolean;
  };
}

export type RequestType =
  | "USER_LOGIN"
  | "USER_LOGOUT"
  | "USER_ACTIVE"
  | "USER_INACTIVE"
  | "MSG_SEND"
  | "MSG_FROM_USER"
  | "MSG_READ"
  | "MSG_DELETE"
  | "MSG_EDIT"
  | "USER_EXTERNAL_LOGIN"
  | "USER_EXTERNAL_LOGOUT"
  | "MSG_DELIVER"
  | "ERROR";

export type ApiPayload<T extends RequestType> = T extends "USER_LOGIN" | "USER_LOGOUT"
  ? IAuthDataProps
  : T extends "MSG_SEND"
    ? IMessageSendProps
    : T extends "MSG_FROM_USER"
      ? IUserLoginProps
      : T extends "MSG_READ" | "MSG_DELETE"
        ? IMessageIdProps
        : T extends "MSG_EDIT"
          ? IEditMessageProps
          : null;

export type ApiResponse<T extends RequestType> = T extends "MSG_FROM_USER"
  ? IMessageHistoryProps
  : T extends "USER_ACTIVE" | "USER_INACTIVE"
    ? IAllUsersProps
    : T extends "MSG_SEND"
      ? IMessageProps
      : T extends "MSG_READ"
        ? IMessageReadProps
        : T extends "MSG_DELETE"
          ? IMessageDeleteProps
          : T extends "MSG_EDIT"
            ? IMessageEditProps
            : ApiPayload<T>;
