import { styled } from "styletron-react";

export const TitleContainer = styled("div", {
  width: "100%",
  height: "10%",
  border: "1px solid red",
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
});

export const Title = styled("div", {
  width: "30%",
  padding: "0.5rem 1rem",
  backgroundColor: "#FFAA2A",
  borderRadius: "20px 0 0 20px",
  textAlign: "center",
  fontSize: "1.2rem",
  color: "#fff",
});

export const WordCard = styled("div", {
  backgroundColor: "#fff",
  margin: "0 0.5rem",
});
