import { styled } from "styletron-react";

export const SelectWordContainer = styled("div", {
  display: "grid",
  gridTemplateColumns: "1fr 2fr",
  height: "60%",
});

export const TitleContainer = styled("div", {
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
});

export const Title = styled("h1", {
  fontSize: "3rem",
  textAlign: "center",
  fontFamily: "sans-serif",
  fontWeight: "bold",
});

export const Line = styled("div", {
  backgroundColor: "#FFAA2A",
  height: "5px",
  width: "45%",
  margin: "0.7rem auto",
});

export const ImageContainer = styled("div", {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  height: "200px",
  marginTop: "1rem",
});

export const ThumbImage = styled("img", {
  width: "80%",
  height: "80%",
  objectFit: "contain",
});

export const WordListContainer = styled("div", {
  width: "90%",
  backgroundColor: "#FFECD0",
  overflowY: "auto",
  "::-webkit-scrollbar": {
    backgroundColor: "#FFECD0",
  },
  "::-webkit-scrollbar-thumb": {
    backgroundColor: "#FFAA2A",
    borderRadius: "20px",
  },
  paddingTop: "2rem",
});

export const WordContainer = styled("div", {
  display: "flex",
  alignItems: "center",
  width: "80%",
  margin: "0.3rem auto 1rem",
  padding: "0.7rem 0.3rem",
  backgroundColor: "#fff",
  borderRadius: "10px",
});

export const EngWord = styled("p", {
  fontSize: "1.5rem",
  marginLeft: "1rem",
});

export const KorWord = styled("p", {
  fontSize: "1rem",
  marginLeft: "auto",
  marginRight: "0.5rem",
  color: "#7d7d7d",
});
