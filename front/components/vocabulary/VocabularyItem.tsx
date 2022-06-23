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
interface wordBook {
  wordbookName: string;
  security: string;
  userId: string;
  wordbookId: string;
  createDate: string;
}
interface itemProps {
  listItem: wordBook[] | undefined;
}
const VocabularyItem: FC<itemProps> = ({ listItem }) => {
  const router = useRouter();
  const isLapTop = useIsLapTop();

  return (
    <GridWrapper $lapTop={isLapTop}>
      {listItem != undefined && listItem?.length > 0 ? (
        listItem.map((item) => {
          return (
            <GridItem key={item.createDate}>
              <BtnWrapper>
                <LockBtn>{item.security ? <FaLock /> : <MdPublic />}</LockBtn>
                <LockBtn>
                  <FaShareSquare />
                </LockBtn>
              </BtnWrapper>
              <GridTextItem>{item.wordbookName}</GridTextItem>
            </GridItem>
          );
        })
      ) : (
        <GridWrapper $without>단어장이 아직 없습니다</GridWrapper>
      )}
    </GridWrapper>
  );
};

export default VocabularyItem;
