import { styled } from "styletron-react";

export const MainButton = styled("div", {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  borderRadius: "25px",
  width: "300px",
  height: "150px",
  margin: "0 auto",
  cursor: "pointer",
});

export const MainButtonWrapper = styled("div", {
  display: "grid",
  gridTemplateColumns: "repeat(2, 300px)",
  justifyContent: "center",
  gridTemplateRows: "repeat(2, 1fr)",
  gap: "50px 50px",
});
