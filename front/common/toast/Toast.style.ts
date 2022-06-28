import { styled } from "styletron-react";

export const ToastMsg = styled("div", (props: { $success: boolean }) => ({
  position: "absolute",
  top: "10%",
  left: "50%",
  width: "600px",
  marginLeft: "-300px",
  zIndex: 4,
  backgroundColor: props.$success ? "#edf7ed" : "#fdeded",
  fontSize: "1.5rem",
  textAlign: "center",
  padding: "1rem 5rem",
  borderRadius: "20px",
}));
