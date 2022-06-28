import { styled } from "styletron-react";

export const TitleContainer = styled("div", {
  width: "100%",
  height: "10%",
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

export const WordCardContainer = styled("div", {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  width: "100%",
  height: "60%",
});

export const WordCard = styled("div", {
  backgroundColor: "#fff",
  width: "80%",
  height: "100%",
  borderRadius: "30px",
  display: "flex",
  flexDirection: "column",
});

export const TtsBtn = styled("button", {
  fontSize: "2rem",
  border: 0,
  backgroundColor: "transparent",
  margin: "0.5rem 1rem 0 auto",
  cursor: "pointer",
});

export const TextContainer = styled("div", {
  display: "flex",
  flexDirection: "column",
  height: "100%",
  justifyContent: "center",
  marginTop: "-2rem",
});

export const EngWord = styled("h1", {
  fontSize: "7rem",
  textAlign: "center",
});

export const KorWord = styled("p", {
  fontSize: "2rem",
  color: "gray",
  textAlign: "center",
  marginTop: "0.5rem",
});

export const PageBtnContainer = styled("div", {
  height: "20%",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  fontSize: "2rem",
});

export const LeftBtn = styled("button", {
  width: 0,
  height: 0,
  backgroundColor: "transparent",
  borderTop: "30px solid transparent",
  borderBottom: "30px solid transparent",
  borderLeft: "50px solid transparent",
  borderRight: "50px solid #FFAA2A",
  marginRight: "1rem",
});

export const RightBtn = styled("button", {
  width: 0,
  height: 0,
  backgroundColor: "transparent",
  borderTop: "30px solid transparent",
  borderBottom: "30px solid transparent",
  borderLeft: "50px solid #FFAA2A",
  borderRight: "50px solid transparent",
  marginLeft: "1rem",
});
