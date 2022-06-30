import { URL_WITHOUT_SIDEBAR } from "./constant";
import { LEFT_WITH_SIDEBAR, LEFT_WITHOUT_SIDEBAR } from "./constant";

export const isMiddle = (url: string) => {
  return URL_WITHOUT_SIDEBAR.includes(url)
    ? LEFT_WITHOUT_SIDEBAR
    : LEFT_WITH_SIDEBAR;
};
