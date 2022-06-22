import { styled } from "styletron-react";

export const SelectBookContainer = styled("div", {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
});

export const Title = styled("h1", {
  fontSize: "2rem",
  margin: "1rem",
  textAlign: "center",
});

export const Label = styled("label", {
  marginLeft: "1rem",
});

export const AddBookBtn = styled("button", {
  border: 0,
  backgroundColor: "transparent",
  fontSize: "1.5rem",
  margin: "1rem",
  cursor: "pointer",
});

export const AddFormContainer = styled("div", {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
});

export const Input = styled("input", {
  border: "0.1px solid black",
  borderRadius: "10px",
  fontSize: "1.3rem",
  width: "50%",
});

export const IconButton = styled("button", {
  margin: "0.5rem",
  fontSize: "1.5rem",
  border: 0,
  backgroundColor: "transparent",
  cursor: "pointer",
});

export const Button = styled("button", {
  border: 0,
  fontSize: "1.2rem",
  padding: "0.3rem 0.7rem",
  borderRadius: "20px",
  backgroundColor: "#fe8c55",
  color: "#fff",
  cursor: "pointer",
});
