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
