import { styled } from "styletron-react";

export const VocabularyWrapper = styled(
  "div",
  (props: { $sideBarWidth: string; $headerHeight?: string }) => ({
    display: "flex",
    alignItems: "center",
    height: `calc(100vh - ${props.$headerHeight})`,
    marginLeft: props.$sideBarWidth,
    width: `calc(100vw - ${props.$sideBarWidth}px`,
    flexDirection: "column",
  }),
);

export const HeadWrapper = styled("div", {
  display: "flex",
  flexDirection: "row",
  width: "100%",
  justifyContent: "start",
});

export const MainText = styled("p", {
  display: "flex",
  fontSize: "2rem",
  alignItems: "center",
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
  backgroundColor: "#ffeba7",
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
    lineHeight: "30px",
    textAlign: "center",
    fontSize: "24px",
    fontWeight: "bold",
    transition: "all 0.5s ease",
    transform: props.$checked ? "translateX(44px) rotate(-180deg)" : "",
  },
}));
