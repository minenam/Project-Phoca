import { styled } from "styletron-react";

export const SelectWordContainer = styled("div", {
  display: "grid",
  gridTemplateColumns: "1fr 2fr",
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

export const ListContainer = styled("div", (props: { $height: string }) => ({
  width: "90%",
  height: props.$height,
  backgroundColor: "#FFECD0",
  overflowY: "auto",
  "::-webkit-scrollbar": {
    backgroundColor: "#FFECD0",
  },
  "::-webkit-scrollbar-thumb": {
    backgroundColor: "#FFAA2A",
    borderRadius: "20px",
  },
  paddingTop: "1rem",
}));

export const ItemContainer = styled("div", {
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

export const WriteWordContainer = styled("form", {
  display: "flex",
  flexDirection: "column",
  marginTop: "3rem",
});

export const InfoTitle = styled("p", {
  fontSize: "1rem",
  marginLeft: "8rem",
  marginBottom: "0.3rem",
});

export const InfoLine = styled("div", {
  height: "2px",
  backgroundColor: "#FFAA2A",
  width: "50%",
});

export const InputContainer = styled("div", {
  backgroundColor: "#FFECD0",
  width: "70%",
  margin: "1rem auto",
  display: "flex",
});

export const Field = styled("div", {
  display: "flex",
  alignItems: "center",
  padding: "1rem 0.5rem",
  justifyContent: "center",
});

export const Label = styled("label", {
  marginRight: "1rem",
});

export const Input = styled("input", {
  border: "0.1px solid black",
  borderRadius: "10px",
  fontSize: "1.3rem",
  width: "70%",
});

export const BtnContainer = styled("div", {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
});

export const Button = styled("button", {
  border: 0,
  borderRadius: "20px",
  backgroundColor: "#fe8c55",
  padding: "0.5rem 1.5rem",
  margin: "1rem 1rem 1.5rem",
  fontSize: "1.2rem",
  cursor: "pointer",
});
