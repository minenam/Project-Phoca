import { styled } from "styletron-react";

export const ResultsContainer = styled("div", (props) => ({
  boxSizing: "content-box",
}));

export const ImageContainer = styled("div", (props) => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  height: "45%",
  marginTop: "2rem",
}));

export const WordContainer = styled("div", (props) => ({
  display: "grid",
  gridTemplateColumns: "1fr 1fr 1fr",
}));

export const IconContainer = styled("div", (props) => ({
  display: "flex",
  flexDirection: "column",
  marginTop: "1.5rem",
  marginLeft: "1rem",
}));

export const EngWord = styled("p", (props) => ({
  gridColumnStart: 2,
  fontSize: "5rem",
  fontWeight: 900,
  margin: 0,
}));

export const KorWord = styled("p", (props) => ({
  fontSize: "1.8rem",
  fontWeight: 700,
  margin: 0,
  textAlign: "center",
}));

export const TtsBtn = styled("div", (props) => ({
  fontSize: "2rem",
  cursor: "pointer",
}));

export const EditBtn = styled("div", (props) => ({
  fontSize: "2rem",
  cursor: "pointer",
}));

export const BtnContainer = styled("div", (props) => ({
  display: "flex",
  justifyContent: "space-evenly",
}));
export const Button = styled("button", (props) => ({
  width: "40%",
  height: "2.5rem",
  marginTop: "1rem",
  border: 0,
  backgroundColor: "#fe8c55",
  color: "white",
  fontSize: "1rem",
  fontWeight: "bold",
  cursor: "pointer",
}));
