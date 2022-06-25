import { styled } from "styletron-react";

export const ConfirmButton = styled("button", {
  border: 0,
  borderRadius: "20px",
  backgroundColor: "#48cfc8",
  padding: "0.5rem 1.5rem",
  margin: "1rem 1rem 1.5rem",
  fontSize: "1.2rem",
  cursor: "pointer",
});

export const ModalWrapper = styled("div", {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  height: "15rem",
  padding: "25px",
});

export const ModalContent = styled("div", {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontSize: "1.6rem",
  marginBottom: "1.5rem",
});
