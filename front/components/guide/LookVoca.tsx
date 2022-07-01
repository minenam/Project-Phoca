import {
  GuideImageWrapper,
  GuideStrong,
  GuideText,
  GuidImage,
  ImageWrapper,
} from "./Guide.style";

export function LookVoca() {
  return (
    <>
      <ImageWrapper>
        <GuidImage src={"images/faq.svg"} alt="question mark" />
      </ImageWrapper>
      <GuideImageWrapper>
        <GuideText>
          처음 단어장 보러가기 페이지로 들어오면 단어장 만들기에서 만들었던{" "}
          <GuideStrong>내 단어장 수</GuideStrong>와,
        </GuideText>
        <GuideText>단어장 보러가기 페이지 아래쪽에 있는</GuideText>
        <GuideText>
          단어장 둘러보기 페이지에서 북마크한{" "}
          <GuideStrong>북마크단어장</GuideStrong>의 개수가 나와 있어요!
        </GuideText>
        <GuideText>
          <GuideStrong>회원 정보 수정</GuideStrong>을 할 수 있어요!
        </GuideText>
      </GuideImageWrapper>
      <ImageWrapper>
        <GuidImage src={"/images/traveling.svg"} alt="main mark" />
      </ImageWrapper>
      <GuideImageWrapper>
        <GuideText>내 단어장 페이지에서는 </GuideText>
        <GuideText>
          내가 작성한 <GuideStrong>단어장</GuideStrong>들이 나와있어요!
        </GuideText>
        <GuideText>단어장 둘러보기 페이지에서는 </GuideText>
        <GuideText>
          <GuideStrong>다른 사람의 단어장</GuideStrong>이 나와있어요!
        </GuideText>
      </GuideImageWrapper>
    </>
  );
}
