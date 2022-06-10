import { styled } from "styletron-react";

export const MainButton = styled("div", (props: { $guide?: Boolean }) => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  borderRadius: "25px",
  width: "300px",
  margin: "0 auto",
  cursor: "pointer",
  fontFamily: "Nanum Gothic Coding, monospace",
  fontWeight: "bold",
  fontSize: "1.5rem",
  height: props.$guide ? "100%" : "300px",
  gridRowStart: props.$guide && 1,
  gridRowEnd: props.$guide && 3,
  backgroundColor: props.$guide && "#88C72E",
  ":hover": {
    opacity: 1,
    border: "calc(2px + .85vw) solid rgba(255, 255, 255, .5)",
    transition: ".5s background-color ease,    .2s border ease",
    borderRadius:
      "calc(var(--x) / var(--size) * 100%) calc(var(--dx) / var(--size) * 100%) calc(var(--dx) / var(--size) * 100%)  calc(var(--x) / var(--size) * 100%) / calc(var(--y) / var(--size) * 100%) calc(var(--y) / var(--size) * 100%) calc(var(--dy) / var(--size) * 100%) calc(var(--dy) / var(--size) * 100%)",
  },
}));

export const MainButtonWrapper = styled("div", {
  display: "grid",
  gridTemplateColumns: "repeat(3, 300px)",
  gridTemplateRows: "repeat(2, 1fr)",
  justifyContent: "center",
  gap: "50px 50px",
});

export const MainPhrase = styled("p", {
  fontFamily: "Nanum Gothic Coding, monospace",
  fontSize: "2rem",
  textAlign: "center",
  padding: "20px",
});
