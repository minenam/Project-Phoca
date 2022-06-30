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
  width: "35%",
  height: "100%",
});
export const MenuRoot = styled("ul", {
  listStyle: "none",
  display: "flex",
  height: "100%",
  width: "200px",
  flexDirection: "column",
});
export const MenuItemWrapper = styled("div", {});
export const MenuItem = styled("li", (props: { $onClicked: boolean }) => ({
  position: "relative",
  backgroundColor: "#FFCA7B",
  display: "flex",
  alignItems: "center",
  height: "85px",
  width: "100%",
  fontSize: "20px",
  cursor: "pointer",
  marginTop: "1.4rem",
  ":after": {
    content: '""',
    position: "absolute",
    top: props.$onClicked ? "25px" : "",
    right: props.$onClicked ? "-15px" : "",
    height: props.$onClicked ? "0px" : "",
    width: props.$onClicked ? "0px" : "",
    borderTop: props.$onClicked ? "solid 15px transparent" : "",
    borderLeft: props.$onClicked ? "solid 15px #FFCA7B" : "",
    borderBottom: props.$onClicked ? "solid 15px transparent" : "",
  },
}));
