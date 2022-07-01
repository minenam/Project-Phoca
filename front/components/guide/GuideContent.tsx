import { GuideContentProps } from "../../common/types/propsType";
import { GuideContentWrapper } from "./Guide.style";
import { MakeVoca } from "./MakeVoca";
import { LookVoca } from "./LookVoca";
import { ImageGame } from "./ImageGame";
import Seo from "../../common/Seo";
import { VocaGame } from "./VocaGame";

const GuideContent = ({ selected }: GuideContentProps) => {
  return (
    <GuideContentWrapper>
      <Seo title="학습가이드" />
      {selected === "단어장 만들기" && <MakeVoca />}
      {selected === "단어장 보러가기" && <LookVoca />}
      {selected === "그림퀴즈 하러가기" && <ImageGame />}
      {selected === "단어퀴즈 하러가기" && <VocaGame />}
    </GuideContentWrapper>
  );
};

export default GuideContent;
