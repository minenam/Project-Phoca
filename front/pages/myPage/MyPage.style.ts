import { styled } from "styletron-react";
import { headerHeight, sidebarWidth } from "../../common/utils/uils";

const SIDEBAR_WIDTH = parseInt(sidebarWidth.substring(0, 3)) + 100;
const HEADER_HEIGHT = parseInt(headerHeight.substring(0, 3)) + 30;
export const MyPageWrapper = styled("div", {
  display: "flex",
  justifyContent: "flex-end",
  alignItems: "center",
  // height: `calc(100vh - ${HEADER_HEIGHT}px)`,
  flexDirection: "column",
});

export const Browser = styled("div", (props: { $myWord?: Boolean }) => ({
  display: "flex",
  justifyContent: "center",
  position: "relative",
  textAlign: "center",
  fontSize: "1.8rem",
  backgroundImage: "url(/note.png)",
  backgroundRepeat: "round",
  height: "350px",
  width: "350px",
  whiteSpace: "pre-wrap",
  alignItems: "center",
  cursor: "pointer",
}));

export const UserInfoEdit = styled("div", {
  display: "flex",
  justifyContent: "flex-end",
  alignItems: "center",
  backgroundColor: "#FE8C55",
  height: "35px",
  width: `calc(100vw - ${SIDEBAR_WIDTH}px)`,
});

export const Wrapper = styled("div", {
  display: "flex",
  justifySelf: "flex-end",
  alignSelf: "flex-end",
});

export const UserInfo = styled("div", {
  display: "flex",
  flexDirection: "row",
  alignSelf: "flex-end",
});

export const Avatar = styled("div", {
  borderRadius: "50%",
  width: "100px",
  height: "100px",
  marginTop: "1.5rem",
  border: "5px solid orange",
});

export const AvatarImage = styled("img", {
  width: "100%",
  height: "100%",
  obejectFit: "contain",
});

export const Triangle = styled("div", {
  width: "0px",
  height: "0px",
  position: "absolute",
  right: "85px",
  top: "170px",
  borderBottom: "30px solid #F4AA3B",
  borderLeft: "15px solid transparent",
  borderRight: "15px solid transparent",
  transform: "rotate(90deg)",
});
