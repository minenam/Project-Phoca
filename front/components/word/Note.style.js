import { styled } from "styletron-react";

export const NoteContainer = styled("div", (props) => ({
  width: "100%",
  height: "100vh",
  border: "1px solid red",
  display: "flex",
  alignItems: "center",
}));

export const NoteBackground = styled("div", (props) => ({
  width: "30%",
  height: "60%",
  backgroundColor: "#FEDDA6",
  margin: "auto",
}));

export const NoteHeader = styled("div", (props) => ({
  width: "100%",
  height: "10%",
  zIndex: 3,
  backgroundColor: "#FE8C55",
  position: "relative",
}));
