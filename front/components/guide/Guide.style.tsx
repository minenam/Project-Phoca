import { styled } from "styletron-react";

export const GuideWrapper = styled(
  "div",
  (props: { $headerHeight: string }) => ({
    width: "100vw",
    height: `calc(100vh - ${props.$headerHeight})`,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  }),
);

export const GuideMenuWrapper = styled("div", {
  display: "flex",
  flexDirection: "column",
});

export const ContentWrapper = styled("div", {
  display: "flex",
  justifyContent: "center",
  alignSelf: "flex-start",
});

export const Title = styled("p", {
  textAlign: "center",
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

export const MenuItem = styled("li", (props: { $onClicked: boolean }) => ({
  position: "relative",
  backgroundColor: "#FFCA7B",
  display: "flex",
  height: "85px",
  justifyContent: "center",
  alignItems: "center",
  width: "200px",
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

export const GuideContentWrapper = styled("div", {
  display: "grid",
  width: "95%",
  height: "80%",
  backgroundColor: "#fedda6",
  borderRadius: "25px",
  overflowY: "auto",
  marginRight: "20px",
  marginLeft: "2.5rem",
  gridTemplateColumns: "1.2fr 2fr",
  gridTemplateRows: "1fr 1fr",
  gap: "1.6rem",
  scrollbarWidth: "thin",
  justifyContent: "center",
  alignItems: "center",
  "::-webkit-scrollbar": {
    backgroundColor: "#FFECD0",
  },
  "::-webkit-scrollbar-thumb": {
    backgroundColor: "#FFAA2A",
    borderRadius: "20px",
  },
  "::-webkit-scrollbar-track": {
    backgroundColor: "darkgray",
    borderRadius: "20px",
  },
});

export const GuideImageWrapper = styled("div", {});

export const ImageWrapper = styled("div", {
  display: "flex",
  width: "100%",
  justifyContent: "center",
  alignItems: "center",
  objectFit: "cover",
});
export const GuidImage = styled("img", {
  padding: "20px",
  width: "400px",
  height: "400px",
});

export const Hr = styled("div", {
  width: "3px",
  marginLeft: "2.5rem",
  borderRadius: "10px",
  height: "80%",
  backgroundColor: "gray",
});

export const GuideText = styled("p", {
  fontSize: "1.4rem",
  padding: "10px",
});
export const GuideStrong = styled("p", {
  display: "inline-block",
  fontSize: "1.7rem",
  color: "#fe8c55",
});

export const TextContentWrapper = styled("div", {
  marginLeft: "20px",
  height: "100%",
  width: "100%",
  display: "flex",
  justifyContent: "space-evenly",
  alignItems: "start",
  flexDirection: "column",
});

export const MainText = styled("p", {
  fontSize: "2rem",
  padding: "10px",
  MarginBottom: "2.5rem",
});
