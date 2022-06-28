import { styled } from "styletron-react";

export const GuideWrapper = styled(
  "div",
  (props: { $headerHeight: string }) => ({
    display: "flex",
    flexDirection: "column",
    width: "100%",
    height: `calc(100vh - ${props.$headerHeight})`,
    justifyContent: "center",
    alignItems: "center",
  }),
);

export const ContentWrapper = styled("div", {
  display: "flex",
  justifyContent: "center",
  alignSelf: "flex-start",
});

export const Title = styled("p", {
  fontSize: "1.6rem",
  padding: "1.4rem",
});

export const MenuWrapper = styled("div", {
  display: "flex",
  justifyContent: "start",
  alignSelf: "flex-start",
  marginLeft: "1.4rem",
  width: "33.3333333%",
  height: "100%",
});
export const MenuRoot = styled("ul", {
  listStyle: "none",
  display: "flex",
  height: "100%",
  flexDirection: "column",
});

export const MenuItem = styled("li", (props: { $clicked?: boolean }) => ({
  backgroundColor: "orange",
  display: "flex",
  alignItems: "center",
  height: "85px",
  width: "100%",
  fontSize: "20px",
  cursor: "pointer",
  transition: "height 0.5 ease",
  marginTop: "1.4rem",
  clicked: {
    height: "250px",
    transition: "height 3.5 linear",
  },
}));
