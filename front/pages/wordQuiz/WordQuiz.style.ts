import { styled } from "styletron-react";

export const CardContainer = styled(
  "div",
  (props: { $headerHeight: string; $sidebarWidth: string }) => ({
    width: `calc(100vw - ${props.$sidebarWidth}-100px)`,
    height: `calc(100vh - ${props.$headerHeight})`,
    marginLeft: props.$sidebarWidth,
    display: "flex",
    justifyContent: "space-evenly",
    alignItems: "center",
  }),
);

export const Card = styled("div", {
  width: "45%",
  height: "85%",
  borderRadius: "50px",
  backgroundColor: "#fff",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "space-between",
});

export const Title = styled("h1", {
  fontSize: "2rem",
  textAlign: "center",
  lineHeight: "1.2",
});

export const BtnContainer = styled("div", {
  width: "100%",
  height: "30%",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
});

export const Button = styled("button", (props: { $small: boolean }) => ({
  width: "60%",
  padding: props.$small ? "1rem" : "2rem",
  border: 0,
  backgroundColor: "#FE8C55",
  borderRadius: "50px",
  fontSize: "2rem",
  color: "#fff",
  cursor: "pointer",
}));

export const SelectBtn = styled("button", {
  width: "60%",
  border: 0,
  backgroundColor: "#FE8C55",
  borderRadius: "20px",
  margin: "1rem",
  fontSize: "2rem",
  color: "#fff",
  cursor: "pointer",
});
