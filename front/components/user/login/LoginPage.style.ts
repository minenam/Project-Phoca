import { styled } from "styletron-react";

export const Form = styled("form", {
  display: "flex",
  flexDirection: "column",
  height: "50%",
});

export const ContentContainer = styled("div", {
  height: "100%",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
});

export const Field = styled("div", {
  display: "grid",
  gridTemplateColumns: "0.7fr 2.3fr",
  margin: "1rem 3rem",
});

export const Label = styled("label", {
  fontSize: "1.5rem",
});

export const Input = styled("input", {
  border: "0",
  borderBottom: "3px solid black",
  backgroundColor: "transparent",
  height: "30px",
  fontSize: "1.5rem",
  ":focus": {
    borderBottom: "3px solid #FFAA2A",
    outline: "none",
  },
});

export const BtnContainer = styled("div", {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
});

export const Button = styled("button", {
  backgroundColor: "#FFAA2A",
  border: 0,
  borderRadius: "10px",
  width: "150px",
  height: "40px",
  fontSize: "1rem",
  fontWeight: "bold",
  color: "#fff",
  marginRight: "1rem",
  cursor: "pointer",
});
