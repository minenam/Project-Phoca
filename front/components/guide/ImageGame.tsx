import {
  GuideImageWrapper,
  GuideStrong,
  GuideText,
  GuidImage,
  ImageWrapper,
} from "./Guide.style";

export function ImageGame() {
  return (
    <>
      <ImageWrapper>
        <GuidImage src={"/images/playing_cards.png"} alt="question mark" />
      </ImageWrapper>

      <GuideImageWrapper>
        <GuideText>랜덤으로 주어지는 단어를 보고</GuideText>
        <GuideText>
          <GuideStrong> 그림</GuideStrong>을 직접 그려보세요!
        </GuideText>
        <GuideText>AI가 당신의 그림을 보고 영단어를 예상해 볼 거예요</GuideText>
        <GuideText>답이 틀려도 너무 슬퍼하지 마세요!</GuideText>
        <GuideText>아직 많은 단어들이 남아있으니까요!</GuideText>
      </GuideImageWrapper>
    </>
  );
}
