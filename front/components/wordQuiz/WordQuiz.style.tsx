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

export const CardItem = styled("div", {
  cursor: "pointer",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  backgroundColor: "white",
  borderRadius: "25px",
  width: "150px",
  height: "150px",
});

export const CardImageItem = styled("img", {
  backgroundColor: "white",
  borderRadius: "25px",
  width: "150px",
});
