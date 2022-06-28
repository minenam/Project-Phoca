import Image from "next/image";
import { useRouter } from "next/router";
import { useState } from "react";
import { useQuery } from "react-query";
import { useMediaQuery } from "react-responsive";
import { HEADER_HEIGHT, SIDEBAR_WIDTH } from "../../common/utils/constant";
import Modal from "../../common/modal/Modal";
import BookList, { Wordbook } from "../../common/booklist/BookList";
import Toast from "../../common/toast/Toast";
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
  buttonName: string;
  link: string;
}

interface WordbookInfo {
  wordCount: number;
  wordbookId: string;
  wordbookName: string;
  secured: boolean;
  createDate: string;
  userId: string;
}

const card: { [key in string]: Card } = {
  "play-game": {
    title: "재밌는 게임으로 \n영어단어를 외우고 싶다면?",
    src: "/images/playing_cards_yellow.svg",
    buttonName: "단어 짝 맞추기 게임",
    link: "/wordQuiz/game",
  },
  "memorize-voca": {
    title: "직접 만든 단어장의 \n단어들을 외우고 싶다면?",
    src: "/images/Memorizing.svg",
    buttonName: "단어장 외우기",
    link: "/wordQuiz/voca",
  },
};

const getWordsCount = async (wordbookId: string) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/wordbook/single/${wordbookId}`,
    {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("userToken")}`,
      },
    },
  );
  const result: WordbookInfo = await res.json();
  return result;
};

function WordQuiz() {
  const router = useRouter();
  const small = useMediaQuery({ query: "(max-width : 1651px)" });

  const [isModalOpen, setIsModalOpen] = useState(false); // 단어장 목록 모달 open 여부
  const [selectedBtn, setSelectedBtn] = useState(""); // 선택된 버튼의 key 저장
  const [wordbookList, setWordbookList] = useState<Wordbook[]>([]); // 단어장 리스트를 저장
  const [selectedWordbookId, setSelectedWordbookId] = useState(""); // 선택된 단어장 Id를 저장
  const [errorMsg, setErrorMsg] = useState(""); // 에러 발생 시 메세지 저장

  const { data } = useQuery(
    ["getWordsCount", selectedWordbookId],
    () => getWordsCount(selectedWordbookId),
    {
      enabled: selectedWordbookId.length > 0,
    },
  );

  const btnClickHandler = (key: string) => {
    setSelectedBtn(key);
    setIsModalOpen(true);
  };

  const selectBtnClickHandler = () => {
    const { wordCount } = data as WordbookInfo;

    if (
      (selectedBtn === "memorize-voca" && wordCount > 0) ||
      (selectedBtn === "play-game" && wordCount > 8)
    ) {
      router.push(`${card[selectedBtn].link}/${selectedWordbookId}`);
    } else {
      setErrorMsg("단어장에 저장된 단어 수가 적어 선택할 수 없습니다.");
    }
  };

  const modalCloseHandler = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <CardContainer
        $headerHeight={HEADER_HEIGHT}
        $sidebarWidth={SIDEBAR_WIDTH}>
        {Object.entries(card).map(([key, value]) => (
          <Card key={key}>
            <Image src={value.src} alt={key} width={400} height={400} />
            <Title>{value.title}</Title>
            <BtnContainer>
              <Button $small={small} onClick={() => btnClickHandler(key)}>
                {value.buttonName}
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
            <SelectBtn onClick={selectBtnClickHandler}>선택하기</SelectBtn>
          </BtnContainer>
        </Modal>
      )}
      {errorMsg.length > 0 && (
        <Toast success={false} message={errorMsg} setErrorMsg={setErrorMsg} />
      )}
    </>
  );
}

export default WordQuiz;
