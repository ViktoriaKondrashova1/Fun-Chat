import {
  ABOUT_PAGE_TITLE,
  ABOUT_PAGE_FIRST_P,
  ABOUT_PAGE_SECOND_P,
  ABOUT_PAGE_THIRD_P,
  ABOUT_PAGE_FOURTH_P,
  ABOUT_PAGE_LINK,
  GITHUB_LINK_URL,
} from "../../constants";
import { createElement } from "../../utils";

import "./aboutPage.scss";

export const aboutPage = (): HTMLDivElement => {
  const aboutPage = createElement({ tag: "div", className: "about" });
  const appName = createElement({ tag: "h2", className: "about-title", content: ABOUT_PAGE_TITLE });
  const firstParagraph = createElement({
    tag: "p",
    content: ABOUT_PAGE_FIRST_P,
  });
  const secondParagraph = createElement({
    tag: "p",
    content: ABOUT_PAGE_SECOND_P,
  });
  const thirdParagraph = createElement({
    tag: "p",
    content: ABOUT_PAGE_THIRD_P,
  });
  const githubLink = createElement({ tag: "a", className: "about-link", content: ABOUT_PAGE_LINK });
  const fourthParagraph = createElement({
    tag: "p",
    content: ABOUT_PAGE_FOURTH_P,
  });

  githubLink.href = GITHUB_LINK_URL;
  githubLink.setAttribute("target", "_blank");

  aboutPage.appendChild(appName);
  aboutPage.appendChild(firstParagraph);
  aboutPage.appendChild(secondParagraph);
  aboutPage.appendChild(thirdParagraph);
  thirdParagraph.appendChild(githubLink);
  aboutPage.appendChild(fourthParagraph);

  return aboutPage;
};
