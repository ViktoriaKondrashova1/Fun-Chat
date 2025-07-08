import { GITHUB_LINK_TEXT, GITHUB_LINK_URL, RS_LINK_URL } from "../../constants";
import { createElement } from "../../utils";
import { rsLogo } from "../svgIcons/rsLogoSvg/rsLogoSvg";

import "./footer.scss";

export const footer = (): HTMLElement => {
  const footerEl = createElement({ tag: "footer", className: "footer" });
  const rsSchoolEl = createElement({ tag: "a", className: "footer-img" });
  const gitHubLink = createElement({
    tag: "a",
    className: "footer-link",
    content: GITHUB_LINK_TEXT,
  });
  const creationYear = createElement({ tag: "div", content: "2025" });
  const rsLogoIcon = rsLogo();

  rsSchoolEl.href = RS_LINK_URL;
  rsSchoolEl.setAttribute("target", "_blank");

  gitHubLink.href = GITHUB_LINK_URL;
  gitHubLink.setAttribute("target", "_blank");

  rsSchoolEl.innerHTML = rsLogoIcon;
  footerEl.appendChild(rsSchoolEl);
  footerEl.appendChild(gitHubLink);
  footerEl.appendChild(creationYear);

  return footerEl;
};
