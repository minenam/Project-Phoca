import Image from "next/image";
import Link from "next/link";
import { useMediaQuery } from "react-responsive";
import { HEADER_HEIGHT, SIDEBAR_WIDTH } from "../../common/utils/constant";
import {
  CardContainer,
  Card,
  Title,
  BtnContainer,
  Button,
} from "./WordQuiz.style";

function WordQuiz() {
  const small = useMediaQuery({ query: "(max-width : 1651px)" });
  return (
    <CardContainer $headerHeight={HEADER_HEIGHT} $sidebarWidth={SIDEBAR_WIDTH}>
      <Card>
        <Image
          src="/images/playing_cards_yellow.svg"
          alt="cardgame"
          width={400}
          height={400}
        />
        <Title>
          재밌는 게임으로 <br /> 영어단어를 외우고 싶다면?
        </Title>
        <BtnContainer>
          <Link href="/wordQuiz/game">
            <Button $small={small}>단어 짝 맞추기 게임</Button>
          </Link>
        </BtnContainer>
      </Card>
      <Card>
        <Image
          src="/images/Memorizing.svg"
          alt="memorizing"
          width={400}
          height={400}
        />
        <Title>
          직접 만든 단어장의 <br /> 단어들을 외우고 싶다면?
        </Title>
        <BtnContainer>
          <Link href="/wordQuiz/voca">
            <Button $small={small}>단어장 외우기</Button>
          </Link>
        </BtnContainer>
      </Card>
    </CardContainer>
  );
}

export default WordQuiz;
