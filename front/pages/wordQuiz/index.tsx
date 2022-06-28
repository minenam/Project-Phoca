import Image from "next/image";
import { useRouter } from "next/router";
import { useState } from "react";
import { useMediaQuery } from "react-responsive";
import { HEADER_HEIGHT, SIDEBAR_WIDTH } from "../../common/utils/constant";
import Modal from "../../common/modal/Modal";
import BookList, { Wordbook } from "../../common/booklist/BookList";
import {
  CardContainer,
  Card,
  Title,
  BtnContainer,
  Button,
  SelectBtn,
} from "./WordQuiz.style";

interface Card {
  title: string;
  src: string;
  alt: string;
  buttonName: string;
  link: string;
}

const card: Card[] = [
  {
    title: "재밌는 게임으로 \n영어단어를 외우고 싶다면?",
    src: "/images/playing_cards_yellow.svg",
    alt: "play-game",
    buttonName: "단어 짝 맞추기 게임",
    link: "/wordQuiz/game",
  },
  {
    title: "직접 만든 단어장의 \n단어들을 외우고 싶다면?",
    src: "/images/Memorizing.svg",
    alt: "memorize-voca",
    buttonName: "단어장 외우기",
    link: "/wordQuiz/voca",
  },
];

function WordQuiz() {
  const small = useMediaQuery({ query: "(max-width : 1651px)" });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [wordbookList, setWordbookList] = useState<Wordbook[]>([]); // 단어장 리스트를 저장
  const [selectedWordbookId, setSelectedWordbookId] = useState(""); // 선택된 단어장 Id를 저장

  const btnClickHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    setIsModalOpen(true);
  };

  const modalCloseHandler = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <CardContainer
        $headerHeight={HEADER_HEIGHT}
        $sidebarWidth={SIDEBAR_WIDTH}>
        {card.map((item, idx) => (
          <Card key={idx}>
            <Image src={item.src} alt={item.alt} width={400} height={400} />
            <Title>{item.title}</Title>
            <BtnContainer>
              <Button $small={small} onClick={btnClickHandler}>
                {item.buttonName}
              </Button>
            </BtnContainer>
          </Card>
        ))}
      </CardContainer>
      {isModalOpen && (
        <Modal
          open={isModalOpen}
          width="400px"
          onClose={modalCloseHandler}
          large={false}>
          <BookList
            title="단어장 선택"
            height="300px"
            wordbookList={wordbookList}
            selectedWordbookId={selectedWordbookId}
            setWordbookList={setWordbookList}
            setSelectedWordbookId={setSelectedWordbookId}
          />
          <BtnContainer>
            <SelectBtn>선택하기</SelectBtn>
          </BtnContainer>
        </Modal>
      )}
    </>
  );
}

export default WordQuiz;
