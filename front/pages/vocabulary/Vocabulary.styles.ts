import { styled } from "styletron-react";
import { sidebarWidth } from "../../common/utils/uils";
import { HEADER_HEIGHT, SIDEBAR_WIDTH } from "../myPage/MyPage.style";

export const VocabularyWrapper = styled("div", {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  height: `calc(100vh - ${HEADER_HEIGHT}px)`,
  marginLeft: `${SIDEBAR_WIDTH}px`,
  width: `calc(100vw - ${sidebarWidth}px`,
  flexDirection: "column",
});

export const HeadWrapper = styled("div", {
  display: "flex",
  flexDirection: "row",
});
