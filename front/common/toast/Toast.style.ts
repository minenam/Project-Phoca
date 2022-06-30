import { styled } from "styletron-react";

export const ToastMsg = styled(
  "div",
  (props: { $success: boolean; $left: string }) => ({
    position: "absolute",
    top: "10%",
    left: props.$left,
    width: "600px",
    marginLeft: "-300px",
    zIndex: 4,
    backgroundColor: props.$success ? "#edf7ed" : "#fdeded",
    fontSize: "1.5rem",
    textAlign: "center",
    padding: "1rem 5rem",
    borderRadius: "20px",
    lineHeight: "1.2",
  }),
);
