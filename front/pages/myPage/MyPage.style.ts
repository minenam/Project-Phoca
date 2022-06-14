import { styled } from "styletron-react";

export const MyPageWrapper = styled(
  "div",
  (props: { $sideBarWidth?: string }) => ({
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "center",
    // height: `calc(100vh - ${HEADER_HEIGHT}px)`,
    marginLeft: props.$sideBarWidth,
    width: `calc(100vw - ${props.$sideBarWidth}px`,
    flexDirection: "column",
  }),
);

export const Browser = styled("a", {
  display: "flex",
  justifyContent: "center",
  position: "relative",
  textAlign: "center",
  fontSize: "1.8rem",
  backgroundImage: "url(/note.png)",
  backgroundRepeat: "round",
  height: "350px",
  width: "350px",
  whiteSpace: "pre-wrap",
  alignItems: "center",
  cursor: "pointer",
});

export const UserInfoEdit = styled(
  "div",
  (props: { $sideBarWidth: string }) => ({
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "center",
    backgroundColor: "#FE8C55",
    height: "35px",
    width: `calc(100vw - ${props.$sideBarWidth})`,
    marginTop: "1.2rem",
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

export const Avatar = styled("div", {
  borderRadius: "50%",
  width: "100px",
  height: "100px",
  marginTop: "1.5rem",
  border: "5px solid orange",
});

export const AvatarImage = styled("img", {
  width: "95%",
  height: "95%",
  display: "block",
  margin: "0 auto",
  objectFit: "contain",
});

export const Triangle = styled("div", {
  width: "0px",
  height: "0px",
  position: "absolute",
  right: "85px",
  top: "170px",
  borderBottom: "30px solid #F4AA3B",
  borderLeft: "15px solid transparent",
  borderRight: "15px solid transparent",
  transform: "rotate(90deg)",
});

export const UserName = styled("p", {
  textAlign: "center",
  marginTop: "10px",
});

export const EmailRoundedBox = styled("div", {
  backgroundColor: "#FFAA2A",
  textAlign: "center",
  lineHeight: "2rem",
  height: "2rem",
  width: "4.5rem",
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
  marginTop: props.$box ? "1.5rem" : "",
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
  top: "11rem",
  zIndex: 1,
});
