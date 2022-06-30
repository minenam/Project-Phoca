import {
  GuideImageWrapper,
  GuideStrong,
  GuideText,
  GuidImage,
  ImageWrapper,
} from "./Guide.style";

export function MakeVoca() {
  return (
    <>
      <GuidImage src={"images/faq.svg"} alt="question mark" />

      <GuideImageWrapper>
        <GuideText>
          우선 단어장으로 만들고 싶은{" "}
          <GuideStrong $fontColor="#fe8c55">사진을</GuideStrong> 넣어주세요!
        </GuideText>
        <GuideText>사진을 넣은 뒤에는 AI가 단어를 찾아줍니다!</GuideText>
        <GuideText>
          AI가 찾아준 단어가 맞지 않을 때는 AI가 찾은 다른 단어들 중에서 골라
        </GuideText>
        <GuideText>
          바꿔주거나{" "}
          <GuideStrong $fontColor="#fe8c55">원하는 단어로</GuideStrong> 바꾸어서
          만들 수 있어요!
        </GuideText>
      </GuideImageWrapper>

      <GuidImage src={"/images/monster_artist.svg"} alt="main mark" />

      <GuideImageWrapper>
        <GuideText>
          AI의 도움을 받아{" "}
          <GuideStrong $fontColor="#fe8c55">나만의 사진으로</GuideStrong> 나만의
          단어장을 만들어봐요!
        </GuideText>
        <GuideText>
          단어를 만들어 준 뒤에는 원하는 단어장에 넣어주세요!
        </GuideText>
        <GuideText>
          단어장을 <GuideStrong $fontColor="#fe8c55">새로 만들어</GuideStrong>{" "}
          넣어줄 수도 있고,
        </GuideText>
        <GuideText>이미 있는 단어장에 넣어줄 수도 있어요!</GuideText>
      </GuideImageWrapper>
    </>
  );
}
