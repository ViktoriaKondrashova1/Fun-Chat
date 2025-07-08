import { pageContainer } from "./components/pageContainer/pageContainer";
import { getCurrentPath, setCurrentPath, updateContent } from "./router";
import { ABOUT_PATH, AUTH_PATH, MAIN_PATH } from "./constants";
import { authPage } from "./pages/authPage/authPage";

import "./style.scss";

const initApp = async (): Promise<void> => {
  document.body.appendChild(pageContainer(authPage()));

  const savedPath = window.location.pathname;

  if ([AUTH_PATH, MAIN_PATH, ABOUT_PATH].includes(savedPath)) {
    await updateContent(savedPath, false);
  } else {
    await updateContent(AUTH_PATH, true);
  }
};

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initApp);
} else {
  initApp();
}

window.addEventListener("popstate", () => {
  if (getCurrentPath() !== globalThis.location.pathname) {
    setCurrentPath(globalThis.location.pathname);
    updateContent(getCurrentPath(), false);
  }
});
