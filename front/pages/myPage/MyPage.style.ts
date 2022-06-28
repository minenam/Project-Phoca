import { styled } from "styletron-react";

export const MyPageWrapper = styled(
  "div",
  (props: { $sideBarWidth?: string }) => ({
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "center",
    marginLeft: props.$sideBarWidth,
    width: `calc(100vw - ${props.$sideBarWidth}px`,
    flexDirection: "column",
  }),
);

export const Browser = styled("a", {
  display: "flex",
  position: "relative",
  paddingTop: "1.2rem",
  justifyContent: "center",
  textAlign: "start",
  fontSize: "2.3rem",
  backgroundImage: "url(/note.png)",
  backgroundRepeat: "round",
  height: "450px",
  width: "450px",
  whiteSpace: "pre-wrap",
  alignItems: "center",
  cursor: "pointer",
  ":hover": {
    ":before": {
      position: "absolute",
      top: "2rem",
      right: "1.5rem",
      display: "block",
      width: "107px",
      height: "107px",
      backgroundSize: "contain",
      zIndex: 1,
      content: "''",
      backgroundImage: "url(/pencil.png)",
      backgroundRepeat: "no-repeat",
      backgroundPosition: "center",
    },
  },
});

export const UserInfoEdit = styled(
  "div",
  (props: { $sideBarWidth: string }) => ({
    display: "flex",
    cursor: "pointer",
    justifyContent: "flex-end",
    alignItems: "center",
    backgroundColor: "#FE8C55",
    height: "35px",
    width: `calc(100vw - ${props.$sideBarWidth})`,
    marginTop: "1.4rem",
    paddingRight: "1.5rem",
  }),
);

export const Wrapper = styled("div", {
  display: "flex",
  justifySelf: "flex-end",
  alignSelf: "flex-end",
});

export const UserInfoWrapper = styled("div", {
  display: "flex",
  flexDirection: "column",
  alignSelf: "center",
});

export const Avatar = styled("div", (props: { $modal?: boolean }) => ({
  borderRadius: "50%",
  width: "100px",
  height: "100px",
  marginTop: props.$modal ? "" : "1.5rem",
  border: "5px solid orange",
  zIndex: 2,
  overflow: "hidden",
}));

export const AvatarImage = styled("img", {
  padding: "10px",
  width: "100%",
  height: "100%",
  display: "block",
  margin: "0 auto",
  objectFit: "contain",
});

export const Triangle = styled("div", {
  width: "0px",
  height: "0px",
  position: "absolute",
  right: "7rem",
  top: "15rem",
  borderBottom: "30px solid #F4AA3B",
  borderLeft: "15px solid transparent",
  borderRight: "15px solid transparent",
  transform: "rotate(90deg)",
});

export const UserName = styled("p", {
  textAlign: "center",
  marginTop: "10px",
});

export const RoundedBox = styled("div", {
  backgroundColor: "#FFAA2A",
  textAlign: "center",
  padding: "10px",
  height: "2rem",
  width: "auto",
  borderRadius: "25px",
});

export const UserDetailWrapper = styled("div", {
  display: "flex",
  justifySelf: "flex-start",
  alignContent: "center",
  flexDirection: "row",
  marginLeft: "50px",
  marginTop: "20px",
});

export const UserInfoDetail = styled("p", {
  lineHeight: "2rem",
  marginLeft: "10px",
  textAlign: "center",
});

export const UserWrapper = styled("div", (props: { $box?: Boolean }) => ({
  display: "flex",
  width: "100%",
  justifyContent: props.$box ? "space-evenly" : "space-between",

  alignContent: "center",
  flexDirection: "row",
  marginTop: props.$box ? "4rem" : "",
}));

export const Branch = styled("img", {
  display: "felx",
  position: "relative",
  width: "20rem",
  alignItems: "center",
  justifySelf: "flex-end",
});

export const ImgWrapper = styled("div", {
  display: "flex",
  alignItems: "center",
  marginLeft: "50px",
  marginTop: "50px",
});

export const Seal = styled("img", {
  position: "absolute",
  width: "5rem",
  right: "1.2rem",
  top: "13rem",
  zIndex: 1,
});
