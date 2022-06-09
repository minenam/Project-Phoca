import { styled } from "styletron-react";

export const MainButton = styled("div", (props: { $guide?: Boolean }) => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  borderRadius: "25px",
  width: "300px",
  height: props.$guide ? "100%" : "150px",
  gridRowStart: props.$guide && 1,
  gridRowEnd: props.$guide && 3,
  margin: "0 auto",
  backgroundColor: props.$guide && "#88C72E",
  cursor: "pointer",
}));

export const MainButtonWrapper = styled("div", {
  display: "grid",
  gridTemplateColumns: "repeat(3, 300px)",
  gridTemplateRows: "repeat(2, 1fr)",
  justifyContent: "center",
  gap: "50px 50px",
});
