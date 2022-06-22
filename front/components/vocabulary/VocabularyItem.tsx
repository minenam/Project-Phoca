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
  const router = useRouter();
  const isLapTop = useIsLapTop();

  return (
    <GridWrapper $lapTop={isLapTop}>
      {MOCKUP_DATA.map((item) => {
        return (
          <GridItem key={item.voc_name}>
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
