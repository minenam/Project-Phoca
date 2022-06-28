import { styled } from "styletron-react";

export const Container = styled(
  "div",
  (props: { $isOpen: boolean; $width: string; $large: boolean }) => ({
    position: "absolute",
    width: props.$width,
    top: props.$large ? "45%" : "50%",
    left: "60%",
    transform: props.$large ? "translate(-60%, -35%)" : "translate(-60%, -50%)",
    backgroundColor: "#fff",
    zIndex: 3,
    visibility: props.$isOpen ? "visible" : "hidden",
    transition: "visibility 0.15s ease-out",
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

export const Background = styled("div", (props: { $isOpen: boolean }) => ({
  top: 0,
  right: 0,
  bottom: 0,
  left: 0,
  position: "fixed",
  backgroundColor: "rgba(0,0,0,0.5)",
  visibility: props.$isOpen ? "visible" : "hidden",
  zIndex: 3,
  transition: "visibility 0.15s ease-out",
}));
