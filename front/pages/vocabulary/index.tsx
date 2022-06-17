import { NextPage } from "next";
import {
  VocabularyWrapper,
  GridWrapper,
  GridItem,
  LockBtn,
  BtnWrapper,
  GridTextItem,
} from "./Vocabulary.styles";
import { Avatar, AvatarImage, UserName } from "../myPage/MyPage.style";
import { HEADER_HEIGHT, SIDEBAR_WIDTH } from "../../common/utils/constant";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { FaLock, FaLockOpen, FaShareSquare } from "react-icons/fa";
import BookMarkHeader from "./BookMarkHeader";

const Vocabulary: NextPage = () => {
  const router = useRouter();

  const sideBarWidth = parseInt(SIDEBAR_WIDTH.substring(0, 3)) + 100;
  const headerHeight = parseInt(HEADER_HEIGHT.substring(0, 3)) + 30;

  return (
    <VocabularyWrapper
      $sideBarWidth={`${sideBarWidth}px`}
      $headerHeight={`${headerHeight}px`}>
      <BookMarkHeader />
      <GridWrapper>
        <GridItem>
          <BtnWrapper>
            <LockBtn>
              <FaLockOpen />
            </LockBtn>
            <LockBtn>
              <FaShareSquare />
            </LockBtn>
          </BtnWrapper>
          <GridTextItem>test</GridTextItem>
        </GridItem>
        <GridItem>
          <BtnWrapper>
            <LockBtn>
              <FaLock />
            </LockBtn>
            <LockBtn>
              <FaShareSquare />
            </LockBtn>
          </BtnWrapper>
          <GridTextItem>test</GridTextItem>
        </GridItem>
        <GridItem>
          <BtnWrapper>
            <LockBtn>
              <FaLock />
            </LockBtn>
            <LockBtn>
              <FaShareSquare />
            </LockBtn>
          </BtnWrapper>
          <GridTextItem>test</GridTextItem>
        </GridItem>
        <GridItem>
          <BtnWrapper>
            <LockBtn>
              <FaLock />
            </LockBtn>
            <LockBtn>
              <FaShareSquare />
            </LockBtn>
          </BtnWrapper>
          <GridTextItem>test</GridTextItem>
        </GridItem>
        <GridItem>
          <BtnWrapper>
            <LockBtn>
              <FaLock />
            </LockBtn>
            <LockBtn>
              <FaShareSquare />
            </LockBtn>
          </BtnWrapper>
          <GridTextItem>test</GridTextItem>
        </GridItem>
        <GridItem>
          <BtnWrapper>
            <LockBtn>
              <FaLock />
            </LockBtn>
            <LockBtn>
              <FaShareSquare />
            </LockBtn>
          </BtnWrapper>
          <GridTextItem>test</GridTextItem>
        </GridItem>
        <GridItem>
          <BtnWrapper>
            <LockBtn>
              <FaLock />
            </LockBtn>
            <LockBtn>
              <FaShareSquare />
            </LockBtn>
          </BtnWrapper>
          <GridTextItem>test</GridTextItem>
        </GridItem>
        <GridItem>
          <BtnWrapper>
            <LockBtn>
              <FaLock />
            </LockBtn>
            <LockBtn>
              <FaShareSquare />
            </LockBtn>
          </BtnWrapper>
          <GridTextItem>test</GridTextItem>
        </GridItem>
        <GridItem>
          <BtnWrapper>
            <LockBtn>
              <FaLock />
            </LockBtn>
            <LockBtn>
              <FaShareSquare />
            </LockBtn>
          </BtnWrapper>
          <GridTextItem>test</GridTextItem>
        </GridItem>
        <GridItem>
          <BtnWrapper>
            <LockBtn>
              <FaLock />
            </LockBtn>
            <LockBtn>
              <FaShareSquare />
            </LockBtn>
          </BtnWrapper>
          <GridTextItem>test</GridTextItem>
        </GridItem>
      </GridWrapper>
    </VocabularyWrapper>
  );
};

export default Vocabulary;
