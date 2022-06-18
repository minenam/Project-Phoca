import { FC, useEffect, useState } from "react";
import { useIsLapTop } from "../../common/utils/useIsLapTop";
import {
  BtnWrapper,
  GridItem,
  GridTextItem,
  GridWrapper,
  LockBtn,
} from "./Vocabulary.styles";
import { MdPublic } from "react-icons/md";
import { FaLock, FaShareSquare } from "react-icons/fa";
import { MOCKUP_DATA } from "../../common/utils/constant";
import { useRouter } from "next/router";

const VocabularyItem: FC = () => {
  const [vocaList, setVocaList] = useState([]);
  const router = useRouter();
  const isLapTop = useIsLapTop();

  useEffect(() => {
    //라우터 따라서 요청 보내는 거 바꾸기
  }, []);

  return (
    <GridWrapper $lapTop={isLapTop}>
      {MOCKUP_DATA.map((item) => {
        return (
          <GridItem>
            <BtnWrapper>
              <LockBtn>
                <MdPublic />
              </LockBtn>
              <LockBtn>
                <FaShareSquare />
              </LockBtn>
            </BtnWrapper>
            <GridTextItem>{item.voc_name}</GridTextItem>
          </GridItem>
        );
      })}
    </GridWrapper>
  );
};

export default VocabularyItem;
