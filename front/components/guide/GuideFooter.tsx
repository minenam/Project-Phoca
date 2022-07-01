import {
  Footer,
  FooterBottom,
  FooterTop,
  FooterWrapper,
  TextWrapper,
} from "./Guide.style";

const GuideFooter = () => {
  return (
    <FooterWrapper>
      <Footer>
        <TextWrapper>
          <FooterBottom>© 2022, Devmon All rights reserved</FooterBottom>
          <FooterBottom>
            Logo, WordCard, BackgroundImage Designed by Freepik
          </FooterBottom>
        </TextWrapper>
        <TextWrapper>
          <FooterTop>엘리스 AI 트랙 4기</FooterTop>
          <FooterBottom>데이터 분석 웹 서비스 프로젝트</FooterBottom>
        </TextWrapper>
      </Footer>
    </FooterWrapper>
  );
};

export default GuideFooter;
