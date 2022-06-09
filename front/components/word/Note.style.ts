import { styled } from "styletron-react";

const sidebarWidth = "300px";
const headerHeight = "100px";

export const NoteContainer = styled("div", (props) => ({
  width: `calc(100vw - ${sidebarWidth})`,
  height: `calc(100vh-${headerHeight})`,
  marginTop: headerHeight,
  marginLeft: sidebarWidth,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  boxSizing: "border-box",
}));

export const NoteBackground = styled("div", (props) => ({
  width: "650px",
  height: "70vh",
  backgroundColor: "#FEDDA6",
}));

export const NoteHeader = styled("div", (props) => ({
  width: "100%",
  height: "10%",
  zIndex: 3,
  backgroundColor: "#FE8C55",
}));
