import { CONNECTION_ERR, SERVER_URL, REQUEST_TYPES, RECONNECTION_ATTAMPT_TEXT } from "./constants";
import {
  showErrorModal,
  updateAllUsersPanel,
  getMessageFromUser,
  updateMessageHistory,
  updateDialogueHeaderIfOpened,
} from "./script/script";
import { getCurrentUser } from "./storage";
import { RequestType, ApiPayload, ApiResponse } from "./types";
import { delay, getUniqueId } from "./utils";

let socket: WebSocket;
let socketReady = false;
const messageQueue: Array<() => void> = [];

const initializeSocket = (): Promise<void> => {
  return new Promise((resolve) => {
    socket = new WebSocket(SERVER_URL);

    socket.addEventListener("open", async () => {
      socketReady = true;

      const user = getCurrentUser();

      if (user) {
        getServerResponse(REQUEST_TYPES.userLogin, {
          user: { login: user.login, password: user.password },
        });
      }

      messageQueue.forEach((send) => send());
      messageQueue.length = 0;
      resolve();
    });

    socket.addEventListener("error", () => {
      showErrorModal(CONNECTION_ERR);
    });

    socket.addEventListener("close", () => {
      showErrorModal(RECONNECTION_ATTAMPT_TEXT);
      socketReady = false;
      attemptReconnect();
    });
  });
};

const attemptReconnect = (): void => {
  setTimeout(() => {
    initializeSocket();
  }, 3000);
};

initializeSocket().then((): void => setupServerMessageHandlers());

const sendWhenReady = (message: Object): void => {
  if (socketReady) {
    socket.send(JSON.stringify(message));
  } else {
    messageQueue.push(() => socket.send(JSON.stringify(message)));
  }
};

const setupServerMessageHandlers = (): void => {
  socket.addEventListener("message", async (e: MessageEvent) => {
    const response = JSON.parse(e.data);

    switch (response.type) {
      case REQUEST_TYPES.externalLogin:
        await delay(500);
        await updateMessageHistory(response.payload.user);
        await updateAllUsersPanel();
        await updateDialogueHeaderIfOpened(response.payload.user);
        break;
      case REQUEST_TYPES.externalLogout:
        await updateAllUsersPanel();
        await updateDialogueHeaderIfOpened(response.payload.user);
        break;
      case REQUEST_TYPES.sendMes:
        const cuurrentUser = getCurrentUser();
        if (cuurrentUser && response.payload.message.from !== cuurrentUser.login) {
          await getMessageFromUser(response.payload.message);
          await updateMessageHistory({ login: response.payload.message.from, isLogined: true });
        }
        break;
      case REQUEST_TYPES.readStat:
        await updateMessageHistory();
        break;
      case REQUEST_TYPES.deleteStat:
        await updateMessageHistory();
        await updateAllUsersPanel();
        break;
      case REQUEST_TYPES.editStat:
        await updateMessageHistory();
        break;
    }
  });
};

const sendRequestToServer = <T extends RequestType>(type: T, payload: ApiPayload<T>): string => {
  const id = getUniqueId();

  const request = { id, type, payload };

  sendWhenReady(request);

  return id;
};

const handleServerResponse = <T extends RequestType>(
  type: T,
  id: string
): Promise<ApiPayload<T>> => {
  return new Promise((resolve, reject) => {
    const onMessage = (e: MessageEvent): void => {
      const response = JSON.parse(e.data);

      if (response.id !== id) return;

      if (response.type === type) {
        resolve(response.payload);
      } else if (response.type === REQUEST_TYPES.error) {
        showErrorModal(response.payload.error);
        reject(new Error(response.payload.error));
      }
    };

    socket.addEventListener("message", onMessage);
  });
};

export const getServerResponse = <T extends RequestType>(
  type: T,
  payload: ApiPayload<T>
): Promise<ApiResponse<T>> => {
  const requestId = sendRequestToServer(type, payload);
  return handleServerResponse(type, requestId) as Promise<ApiResponse<T>>;
};
