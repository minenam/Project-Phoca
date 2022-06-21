import { styled } from "styletron-react";
import { headerHeight } from "../../common/utils/uils";

export const SideBarContainer = styled("div", (props) => ({
  position: "absolute",
  zIndex: 100,
  display: "flex",
  flexDirection: "column",
}));

export const SideBarBtn = styled("div", (props) => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  width: "300px",
  height: `calc((100vh - ${headerHeight}) / 4)`,
  borderRadius: "0 30px 30px 0/ 0 30px 30px 0",
  cursor: "pointer",
  transition: "0.5s",
  fontSize: "2rem",
  fontWeight: "bold",
  ":hover": {
    width: "400px",
  },
}));
