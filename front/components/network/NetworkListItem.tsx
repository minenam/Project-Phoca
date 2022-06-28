import { FC, useEffect, useState } from "react";
import {
  GridWrapper,
  GridItem,
  BtnWrapper,
  LockBtn,
  GridTextItem,
} from "../vocabulary/Vocabulary.styles";
import { useIsLapTop } from "../../common/utils/useIsLapTop";
import {
  BackButton,
  NetworkWrapper,
  SearchBar,
  SearchBarWrapper,
} from "./Network.style";
import { HEADER_HEIGHT } from "../../common/utils/constant";
import { useQuery } from "react-query";
import { userStore } from "../../zustand/userStore";
import { FaLock, FaShareSquare } from "react-icons/fa";
import { MdPublic } from "react-icons/md";
import { BiArrowBack } from "react-icons/bi";
import { useRouter } from "next/router";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";

interface othersWordbook {
  wordbookId: string;
  wordbookName: string;
  secured: boolean;
  createDate: string;
  userId: string;
}

const getOthersWordbookList = async (userId?: string) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/wordbook/${userId}`,
    {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("userToken")}`,
      },
    },
  );

  const result = await res.json();
  return result;
};

const NetworkListItem: FC = () => {
  const [searchKeyword, setSearchKeyword] = useState("");
  const [isStop, setIsStop] = useState(false);
  const [othersWordbookList, setOthersWordbookList] = useState([]);
  const isLapTop = useIsLapTop();
  const user = userStore((state) => state.user);
  const router = useRouter();

  const { data } = useQuery(["othersWordbookList", isStop], () =>
    getOthersWordbookList(user?.userId),
  );

  const backButtonHandler = () => {
    router.push("/myPage");
  };

  useEffect(() => {
    setOthersWordbookList(data);
  }, [data]);

  useEffect(() => {
    const timerId = setTimeout(() => {
      setIsStop(true);
    }, 300);

    return () => {
      setIsStop(false);
      clearTimeout(timerId);
    };
  }, [searchKeyword]);

  const textChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchKeyword(e.target.value);
    setIsStop(true);
  };

  return (
    <NetworkWrapper $headerHeight={HEADER_HEIGHT}>
      <SearchBarWrapper>
        <BackButton onClick={backButtonHandler}>
          <BiArrowBack />
        </BackButton>
        <SearchBar
          type="text"
          placeholder={"검색어를 입력해주세요"}
          onChange={textChangeHandler}
        />
      </SearchBarWrapper>
      <GridWrapper $lapTop={isLapTop}>
        {othersWordbookList != undefined && othersWordbookList?.length > 0 ? (
          othersWordbookList.map((item: othersWordbook) => {
            return (
              <GridItem key={item.createDate}>
                <BtnWrapper>
                  <LockBtn>{item.secured ? <FaLock /> : <MdPublic />}</LockBtn>
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
    </NetworkWrapper>
  );
};

export default NetworkListItem;
