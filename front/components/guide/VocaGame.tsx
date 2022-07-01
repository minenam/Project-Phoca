import {
  GuideImageWrapper,
  GuideStrong,
  GuideText,
  GuidImage,
  ImageWrapper,
} from "./Guide.style";

export function VocaGame() {
  return (
    <>
      <ImageWrapper>
        <GuidImage src={"images/faq.svg"} alt="question mark" />
      </ImageWrapper>
      <GuideImageWrapper>
        <GuideText>
          단어장 내에 단어가 <GuideStrong>8개가</GuideStrong> 넘으신다구요?
        </GuideText>
        <GuideText>지금 바로 단어퀴즈 하러 가요! </GuideText>
        <GuideText>
          단어 퀴즈는{"  "}
          <GuideStrong>단어장에 등록한</GuideStrong> 사진과
        </GuideText>
        <GuideText>
          AI가 찾아준 단어로 <GuideStrong>카드 뒤집기 게임</GuideStrong>을 할 수
          있어요!
        </GuideText>
      </GuideImageWrapper>
      <ImageWrapper>
        <GuidImage src={"/images/popularity.svg"} alt="main mark" />
      </ImageWrapper>
      <GuideImageWrapper>
        <GuideText>단어장 암기가 필요하신가요?</GuideText>
        <GuideText>
          지금 <GuideStrong>단어장 외우기</GuideStrong>를 하러 가봐요
        </GuideText>
        <GuideText>단어장의 저장된 단어들을 한 장씩 보면서</GuideText>
        <GuideText>
          <GuideStrong>영단어</GuideStrong>와 <GuideStrong>뜻</GuideStrong>을
          외울 수 있어요!
        </GuideText>

        <GuideText>그럼 바로 단어퀴즈 하러 가볼까요?</GuideText>
      </GuideImageWrapper>
    </>
  );
}
