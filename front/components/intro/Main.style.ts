import { styled } from "styletron-react";

export const MainButton = styled(
  "a",
  (props: { $guide?: Boolean; $backgroundImage?: string }) => ({
    position: "relative",
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
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
    "--dx": "calc(var(--size) - var(--x))",
    "--dy": "calc(var(--size) - var(--y))",
    ":hover": {
      fontSize: 0,
      opacity: 1,
      border: "calc(2px + .85vw) solid rgba(255, 255, 255, .5)",
      transition: ".5s background-color ease, .2s border ease",
      borderRadius:
        "calc(var(--x) / var(--size) * 100%) calc(var(--dx) / var(--size) * 100%) calc(var(--dx) / var(--size) * 100%)  calc(var(--x) / var(--size) * 100%) / calc(var(--y) / var(--size) * 100%) calc(var(--y) / var(--size) * 100%) calc(var(--dy) / var(--size) * 100%) calc(var(--dy) / var(--size) * 100%)",
      ":before": {
        content: "''",
        backgroundImage: `url(${props.$backgroundImage})`,
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        backgroundSize: "80%",
        position: "absolute",
        top: "0px",
        right: "0px",
        bottom: "0px",
        left: "0px",
        opacity: "0.7",
      },
    },
  }),
);

export const MainButtonWrapper = styled("div", {
  display: "grid",
  gridTemplateColumns: "repeat(3, 300px)",
  gridTemplateRows: "repeat(2, 1fr)",
  justifyContent: "center",
  gap: "50px 50px",
});

export const MainPhrase = styled("p", {
  fontSize: "2rem",
  textAlign: "center",
  padding: "20px",
  marginTop: "15px",
  marginBottom: "15px",
});
