// @ts-nocheck
import { styled } from "styletron-react";

export const GameWrapper = styled(
  "div",
  (props: { $headerHeight: string }) => ({
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    height: `calc(100vh - ${props.$headerHeight})`,
    width: "100vw",
  }),
);

export const CardRootWrapper = styled("div", {
  display: "grid",
  gridTemplateRows: "repeat(2, 1fr)",
  gridTemplateColumns: "repeat(4, 1fr)",
  gap: "1.6rem",
  justifyContent: "center",
  alignItems: "center",
});

export const CardItem = styled(
  "div",
  (props: { $flip: boolean; $matched: boolean }) => ({
    position: "relative",
    cursor: "pointer",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    borderRadius: "25px",
    pointerEvents: props.$matched ? "none" : "",
    width: "150px",
    "--rotate-y": props.$flip | props.$matched ? "180deg" : "",
    height: "150px",
    transition: "150ms",
    transformStyle: "preserve-3d",
    transform:
      "perspective(1000px) rotateY(var(--rotate-y, 0)) translateY(var(--translate-y, 0))",
  }),
);

export const CardImageItem = styled("img", {
  backgroundColor: "white",
  borderRadius: "25px",
  width: "100%",
  height: "100%",
  position: "absolute",
  transform: "rotateY(180deg)",
  objectFit: "cover",
  backfaceVisibility: "hidden",
});

export const CardFront = styled("div", (props: { $front?: boolean }) => ({
  position: "absolute",
  padding: "1rem",
  width: "100%",
  height: "100%",
  backfaceVisibility: "hidden",
}));

export const Image = styled("img", {
  width: "100%",
  height: "100%",
});

export const CardBackText = styled("p", {
  position: "absolute",
  transform: "rotateY(180deg)",
  backfaceVisibility: "hidden",
});

export const GameBackHomeWrapper = styled("div", {
  display: "flex",
  width: "100%",
  justifyContent: "center",
  alignItems: "center",
});

export const GameReGameWrapper = styled("div", {
  display: "flex",
  width: "100%",
  justifyContent: "center",
  alignItems: "center",
});

export const GameEndButton = styled(
  "button",
  (props: { $backgroundColor: string; $buttonCss: boolean }) => ({
    position: "relative",
    display: "inlineBlock",
    cursor: "pointer",
    outline: "none",
    verticalAlign: "middle",
    textDecoration: "none",
    fontSize: "x-large",
    fontFamily: "inherit",
    backgroundColor: props.$backgroundColor,
    width: "25rem",
    height: "17rem",
    fontWeight: "600",
    color: "#382b22",
    textTransform: "uppercase",
    padding: "1.25em 2em",
    background: "#cde9fa",
    border: "2px solid #79ccf9",
    borderRadius: "0.75em",
    transformStyle: "preserve-3d",
    transition:
      "transform 150ms cubic-bezier(0, 0, 0.58, 1), background 150ms cubic-bezier(0, 0, 0.58, 1)",
    ":before": {
      position: "absolute",
      content: "''",
      width: "100%",
      height: "100%",
      top: "35px",
      left: 0,
      right: 0,
      bottom: 0,
      background: "#319cd6",
      borderRadius: "inherit",
      boxShadow: "0 0 0 2px #2480ad, 0 0.7em 0 0 #a5d8f2",
      transform: "translate3d(0, 0.75em, -1em)",
      transition:
        "transform 150ms cubic-bezier(0, 0, 0.58, 1), box-shadow 150ms cubic-bezier(0, 0, 0.58, 1)",
    },
    ":hover": {
      background: "skyblue",
      transform: "translate(0, 0.25em)",
      ":before": {
        boxShadow: "0 0 0 2px #2480ad, 0 0.5em 0 0 #a5d8f2",
        transform: "translate3d(0, 0.5em, -1em)",
      },
    },
    ":active": {
      background: "skyblue",
      transform: "translate(0em, 0.75em)",
      ":before": {
        boxShadow: "0 0 0 2px #2480ad, 0 0 #a5d8f2",
        transform: "translate3d(0, 0, -1em)",
      },
    },
  }),
);
