import { styled } from "styletron-react";

export const VocabularyWrapper = styled(
  "div",
  (props: { $sideBarWidth: string; $headerHeight?: string }) => ({
    display: "flex",
    justifyContent: "center",
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
});

export const MainText = styled("p", {
  fontSize: "2rem",
  lineHeight: "2rem",
});
