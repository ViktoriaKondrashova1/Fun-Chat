import { IElementProps } from "./types";

export const createElement = <K extends keyof HTMLElementTagNameMap>({
  tag,
  className,
  content,
}: IElementProps<K>): HTMLElementTagNameMap[K] => {
  const element = document.createElement(tag);
  className && (element.className = className);
  content && (element.textContent = content);

  return element;
};

export const convertDate = (timestamp: number): string => {
  const date = new Date(timestamp);
  const formattedTime = `${date.getHours()}:${date.getMinutes().toString().padStart(2, "0")}`;

  return formattedTime;
};

export const scrollElement = (container: HTMLDivElement): void => {
  container.scrollTo({
    top: container.scrollHeight,
    behavior: "auto",
  });
};

export const getUniqueId = (): string => {
  return `${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
};

export const delay = async (ml: number): Promise<void> => {
  await new Promise((resolve) => setTimeout(resolve, ml));
};
