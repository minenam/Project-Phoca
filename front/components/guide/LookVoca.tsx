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
      <GuidImage src={"images/faq.svg"} alt="question mark" />
      <GuideImageWrapper>
        <GuideText>
          처음 단어장 보러가기 페이지로 들어오면 단어장 만들기에서 만들었던
          <GuideStrong $fontColor="#fe8c55">내 단어장 수</GuideStrong>와,
        </GuideText>
        <GuideText>단어장 보러가기 페이지 아래쪽에 있는</GuideText>
        <GuideText>
          단어장 둘러보기 페이지에서 북마크한
          <GuideStrong $fontColor="#fe8c55">북마크단어장</GuideStrong>의 개수가
          나와 있어요!
        </GuideText>
        <GuideText>
          <GuideStrong $fontColor="#fe8c55">회원 정보</GuideStrong>수정을 할 수
          있어요!
        </GuideText>
      </GuideImageWrapper>

      <GuidImage src={"/images/traveling.svg"} alt="main mark" />
      <GuideImageWrapper>
        <GuideText>내 단어장 페이지에서는</GuideText>
        <GuideText>
          내가 작성한<GuideStrong $fontColor="#fe8c55">단어장</GuideStrong>들이
          나와있어요!
        </GuideText>
        <GuideText>또 회원정보 수정 탭을 클릭하면</GuideText>
        <GuideText>
          <GuideStrong $fontColor="#fe8c55">회원 정보</GuideStrong>수정을 할 수
          있어요!
        </GuideText>
        <GuideText>단어장 둘러보기 페이지에서는 </GuideText>
        <GuideText>
          <GuideStrong $fontColor="#fe8c55">다른 사람의 단어장</GuideStrong>이
          나와있어요!
        </GuideText>
      </GuideImageWrapper>
    </>
  );
}
