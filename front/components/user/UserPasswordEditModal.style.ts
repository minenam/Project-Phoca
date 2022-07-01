import { styled } from "styletron-react";

export const PasswordForm = styled("form", {
  marginTop: "1.2rem",
  display: "flex",
  flexDirection: "column",
});

export const PasswordInput = styled("input", {
  padding: "5px",
  border: "0.1px solid black",
  borderRadius: "10px",
  fontSize: "1.2rem",
  width: "60%",
  marginLeft: "5px",
});

export const PasswordWrapper = styled("div", {
  display: "flex",
  flexDirection: "column",
  width: "90%",
  alignItems: "center",
  padding: "1rem",
  marginBottom: "1.3rem",
});

export const InputWrapper = styled("div", {
  width: "90%",
  display: "flex",
  justifyContent: "flex-end",
  alignItems: "center",
  flexDirection: "row",
});
