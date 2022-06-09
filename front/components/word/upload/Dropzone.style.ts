import { styled } from "styletron-react";

export const Title = styled("h1", (props) => ({
  fontSize: "1.5rem",
  textAlign: "center",
  margin: "2rem auto",
}));

export const DropContainer = styled("div", (props) => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  height: "50%",
  color: "#FE8C55",
  fontSize: "5rem",
  border: "6px dashed #FE8C55",
  margin: "auto 3rem",
  cursor: "pointer",
}));

export const SubmitBtn = styled("button", (props) => ({
  display: "block",
  margin: "5% auto",
  width: "85%",
  height: "10%",
  fontSize: "1.5rem",
  fontWeight: "600",
  backgroundColor: "#FE8C55",
  color: "#fff",
  border: "none",
  cursor: "pointer",
}));

export const ImageContainer = styled("div", (props) => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  height: "50%",
}));

export const ThumbImage = styled("img", (props) => ({
  width: "100%",
  height: "100%",
  objectFit: "contain",
}));
