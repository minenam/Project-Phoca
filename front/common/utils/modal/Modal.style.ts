import { styled } from "styletron-react";

export const Container = styled(
  "div",
  (props: { $isOpen: boolean; $width: string }) => ({
    position: "absolute",
    width: props.$width,
    top: "40%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    backgroundColor: "#fff",
    zIndex: 3,
    visibility: props.$isOpen ? "visible" : "hidden",
    animationDuration: "0.2s",
    animationTimingFunction: "ease-out",
    animationName: {
      from: {
        opacity: 0,
      },
      to: {
        opacity: 1,
      },
    },
  }),
);

export const ModalHeader = styled("div", {
  display: "flex",
});

export const Line = styled("div", {
  height: "10px",
  backgroundColor: "#FFAA2A",
  width: "100%",
  marginLeft: "1.2rem",
});

export const CloseBtn = styled("button", {
  zIndex: 4,
  border: "none",
  backgroundColor: "transparent",
  cursor: "pointer",
  fontSize: "1.2rem",
});
