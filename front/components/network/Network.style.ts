import { styled } from "styletron-react";

export const NetworkWrapper = styled(
  "div",
  (props: { $headerHeight?: string }) => ({
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    width: "87%",
    height: `calc(100vh - ${props.$headerHeight})`,
    margin: "0 auto",
  }),
);

export const SearchBarWrapper = styled("div", {
  display: "flex",
  width: "100%",
  justifyContent: "center",
  alignSelf: "center",
  marginTop: "3rem",
});

export const SearchBar = styled("input", {
  border: "none",
  width: "80%",
  height: "auto",
  fontSize: "16px",
  padding: "10px",
  marginRight: "3rem",
  borderRadius: "10px",
});

export const BackButton = styled("button", {
  cursor: "pointer",
  border: "none",
  width: "5rem",
  backgroundColor: "white",
  height: "auto",
  fontSize: "14px",
  padding: "10px",
  borderRadius: "10px",
  marginRight: "20rem",
});
