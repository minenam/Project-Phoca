import { styled } from "styletron-react";

export const VocabularyWrapper = styled(
  "div",
  (props: { $sideBarWidth: string; $headerHeight?: string }) => ({
    display: "flex",
    alignItems: "center",
    height: `calc(100vh - ${props.$headerHeight})`,
    marginLeft: props.$sideBarWidth,
    width: `calc(100vw - ${props.$sideBarWidth})`,
    flexDirection: "column",
    padding: "20px",
  }),
);

export const HeadWrapper = styled("div", {
  display: "flex",
  flexDirection: "row",
  width: "100%",
  justifyContent: "start",
});

export const HeadUserWrapper = styled("div", {
  display: "flex",
  flexDirection: "column",
});

export const MainText = styled("p", {
  display: "flex",
  fontSize: "2rem",
  alignItems: "center",
  marginLeft: "1.6rem",
});

export const SwitchWrapper = styled("div", {
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-around",
  alignSelf: "end",
  marginTop: "2rem",
  marginRight: "4rem",
  width: "30%",
});

export const SwitchButtonText = styled("p", {
  fontSize: "1.5rem",
});

export const SwitchButtonInput = styled("input", {
  position: "absolute",
  left: "-9999px",
});

export const SwitchButton = styled("label", (props: { $checked: Boolean }) => ({
  position: "relative",
  display: "block",
  textAlign: "center",
  width: "60px",
  height: "16px",
  borderRadius: "8px",
  padding: 0,
  margin: "10px auto",
  cursor: "pointer",
  backgroundColor: "#ffaa2a",
  ":before": {
    position: "absolute",
    display: "block",
    width: "36px",
    height: "36px",
    fontFamily: "unicons",
    borderRadius: "50%",
    color: "#ffeba7",
    backgroundColor: "#102770",
    content: "'\u2190'",
    zIndex: 20,
    top: "-10px",
    left: "-10px",
    lineHeight: "2rem",
    textAlign: "center",
    fontSize: "24px",
    fontWeight: "bold",
    transition: "all 0.5s ease",
    transform: props.$checked ? "translateX(44px) rotate(180deg)" : "",
  },
}));

export const GridItem = styled(
  "div",
  (props: { $backgroundImage?: string }) => ({
    position: "relative",
    display: "flex",
    justifyContent: "flex-start",
    flexDirection: "column",
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255)",
    borderRadius: "25px",
    width: "17rem",
    height: "17rem",
    cursor: "pointer",
    margin: "25px auto",
    ":after": {
      position: "absolute",
      backgroundImage: `url(${props.$backgroundImage})`,
      backgroundSize: "cover",
      content: "''",
      top: "65px",
      left: "65px",
      right: "65px",
      bottom: "65px",
      opacity: "0.65",
    },
  }),
);

export const GridTextItem = styled("p", {
  display: "flex",
  zIndex: 2,
  justifyContent: "center",
  alignItems: "flex-end",
  height: "100%",
  fontSize: "1.5rem",
  paddingBottom: "1.5rem",
});

export const GridWrapper = styled(
  "div",
  (props: { $lapTop?: Boolean; $without?: Boolean }) => ({
    display: "flex",
    width: props.$lapTop ? "87%" : "97%",
    height: props.$without ? "5rem" : "",
    alignSelf: "flex-start",
    justifyContent: "center",
    borderRadius: "30px",
    marginTop: "20px",
    flexWrap: "wrap",
    backgroundColor: "#fedda6",
    scrollbarWidth: "thin",
    padding: "25px",
    overflowY: "auto",
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
  }),
);

export const BtnWrapper = styled("div", {
  zIndex: 2,
  display: "flex",
  width: "100%",
  flexDirection: "row",
  justifyContent: "flex-end",
  alignSelf: "start",
  marginTop: "1.2rem",
});

export const LockBtn = styled("div", {
  cursor: "pointer",
  marginRight: "1.2rem",
  fontSize: "1.6rem",
});
