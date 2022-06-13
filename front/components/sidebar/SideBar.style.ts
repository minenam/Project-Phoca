import { styled } from "styletron-react";

export const SideBarContainer = styled("div", {
  position: "absolute",
  zIndex: 2,
  display: "flex",
  flexDirection: "column",
});

export const SideBarBtn = styled("div", (props: { $headerHeight: string }) => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  width: "300px",
  height: `calc((100vh - ${props.$headerHeight}) / 4)`,
  borderRadius: "0 30px 30px 0/ 0 30px 30px 0",
  cursor: "pointer",
  transition: "0.5s",
  fontSize: "2rem",
  fontWeight: "bold",
  ":hover": {
    width: "400px",
  },
}));
