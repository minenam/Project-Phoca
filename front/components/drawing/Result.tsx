import {
  ResultContainer,
  Title,
  Description,
  ColorText,
  ResultBtn,
} from "./Drawing.style";

interface ResultProps {
  result: boolean;
  engWord: string | undefined;
  korWord: string | undefined;
  predicted: string;
  onClose: () => void;
}

function Result(props: ResultProps) {
  const { result, engWord, korWord, predicted, onClose } = props;

  return (
    <ResultContainer>
      <Title>{result ? "정답!" : "아쉬워요"}</Title>
      <Description>
        문제로 주어진 단어 :{" "}
        <ColorText>
          {engWord}({korWord})
        </ColorText>
      </Description>
      <Description>
        AI가 예측한 단어 : <ColorText>{predicted}</ColorText>
      </Description>
      <ResultBtn onClick={() => onClose()}>확인</ResultBtn>
    </ResultContainer>
  );
}

export default Result;
