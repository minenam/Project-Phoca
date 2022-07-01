import { styled } from "styletron-react";

export const DrawingContainer = styled("div", {
  width: "100%",
  height: "90%",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  textAlign: "center",
  boxSizing: "border-box",
});

export const Question = styled("h1", {
  fontSize: "3rem",
  margin: "1rem 0",
});

export const CanvasContainer = styled("div", {
  width: "100%",
  height: "100%",
  overflow: "hidden",
});

export const Canvas = styled("canvas", {
  backgroundColor: "#fff",
});

export const SubmitBtnContainer = styled("div", {
  width: "100%",
  height: "20%",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
});

export const SubmitBtn = styled("button", {
  border: 0,
  backgroundColor: "#fe8c55",
  fontSize: "1.5rem",
  color: "#fff",
  width: "30%",
  padding: "0.5rem",
  cursor: "pointer",
});

export const ResetBtnContainer = styled("div", {
  width: "90%",
});

export const ResetBtn = styled("button", {
  border: 0,
  backgroundColor: "#FFAA2A",
  color: "#fff",
  borderRadius: "20px",
  padding: "0.5rem 2rem",
  display: "flex",
  marginLeft: "auto",
  cursor: "pointer",
});

export const ResultContainer = styled("div", {
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
});

export const Title = styled("h1", {
  fontSize: "2rem",
  marginBottom: "2rem",
});

export const Description = styled("p", {
  fontSize: "1.5rem",
  marginBottom: "1rem",
  textAlign: "center",
});

export const ColorText = styled("p", {
  color: "#fe8c55",
  display: "inline-block",
});

export const ResultBtn = styled("button", {
  border: 0,
  borderRadius: "20px",
  backgroundColor: "#FFAA2A",
  fontSize: "1.5rem",
  color: "#fff",
  width: "30%",
  padding: "0.5rem",
  marginBottom: "1rem",
  cursor: "pointer",
});
