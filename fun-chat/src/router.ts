import { pageContainer } from "./components/pageContainer/pageContainer";
import { authPage } from "./pages/authPage/authPage";
import { mainPage } from "./pages/mainPage/mainPage";
import { aboutPage } from "./pages/aboutPage/aboutPage";
import { AUTH_PATH, MAIN_PATH, ABOUT_PATH } from "./constants";
import { getCurrentUser } from "./storage";

let currentPath = "";

const routes: { [key: string]: () => HTMLDivElement | Promise<HTMLDivElement> } = {
  [AUTH_PATH]: authPage,
  [MAIN_PATH]: mainPage,
  [ABOUT_PATH]: aboutPage,
};

export const getCurrentPath = (): string => currentPath;

export const setCurrentPath = (path: string): string => (currentPath = path);

export const updateContent = async (path: string, isPushState: boolean): Promise<void> => {
  if (path === AUTH_PATH && getCurrentUser()) {
    path = MAIN_PATH;
    isPushState = true;
  }

  if (path === MAIN_PATH && !getCurrentUser()) {
    path = AUTH_PATH;
    isPushState = true;
  }

  setCurrentPath(path);
  const page = routes[path];
  const container = pageContainer(await page());
  document.body.replaceChildren(container);

  if (isPushState) window.history.pushState({}, "", currentPath);
};

export const navigate = (path: string): void => {
  updateContent(path, true);
};
