import { FC, SetStateAction, useEffect, useState } from "react";
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
import { HEADER_HEIGHT, WORD_IMAGES } from "../../common/utils/constant";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { userStore } from "../../zustand/userStore";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { useRouter } from "next/router";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { WordBook, BookMark } from "../../common/types/resultsType";
import { shuffle } from "../../common/utils/shuffle";
import { BookMarkProps } from "../../common/types/propsType";

const imageUrl = shuffle(WORD_IMAGES);

const getOthersWordbookList = async (
  userId?: string,
  searchKeyword?: string,
) => {
  try {
    const res = await fetch(
      searchKeyword
        ? `${process.env.NEXT_PUBLIC_SERVER_URL}/wordbook/search?keyword=${searchKeyword}`
        : `${process.env.NEXT_PUBLIC_SERVER_URL}/wordbook/${userId}`,
      {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("userToken")}`,
        },
      },
    );

    const result = await res.json();
    return result;
  } catch (e) {
    console.error(e);
  }
};

const getMyBookMarkList = async (userId?: string) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/bookmark/${userId}`,
      {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("userToken")}`,
        },
      },
    );

    const result = await res.json();
    let wordBookResult: string[] = [];
    result.map((item: BookMark) => wordBookResult?.push(item.wordbookId));
    return wordBookResult;
  } catch (e) {
    console.error(e);
  }
};

const NetworkListItem: FC = () => {
  const [searchKeyword, setSearchKeyword] = useState("");
  const [isStop, setIsStop] = useState(false);
  const [othersWordbookList, setOthersWordbookList] = useState([]);
  const [bookMarkList, setBookMarkList] = useState<
    SetStateAction<string>[] | undefined
  >([]);

  const isLapTop = useIsLapTop();
  const user = userStore((state) => state.user);
  const router = useRouter();
  const queryClient = useQueryClient();

  const { data } = useQuery(
    ["othersWordbookList", isStop, searchKeyword],
    () => getOthersWordbookList(user?.userId, searchKeyword && searchKeyword),
    {
      refetchOnWindowFocus: false,
      enabled: !!user?.userId,
    },
  );

  const bookMarkedData = useQuery(
    ["bookmarkList"],
    () => getMyBookMarkList(user?.userId),
    {
      refetchOnWindowFocus: false,
      enabled: !!user?.userId,
    },
  );

  const bookMarkHandler = async (props: BookMarkProps) => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/bookmark`,
        {
          method: bookMarkList?.includes(props.wordbookId) ? "DELETE" : "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${sessionStorage.getItem("userToken")}`,
          },
          body: JSON.stringify({
            userId: props.userId,
            wordbookId: props.wordbookId,
          }),
        },
      );
      const result = await res.json();
      return result;
    } catch (e) {
      console.error(e);
    }
  };

  const bookMarkMutation = useMutation(bookMarkHandler, {
    onSuccess: (data) => {
      return queryClient.invalidateQueries(["bookmarkList"]);
    },
    onError: (error) => {
      console.error("북마크 수정 실패", error);
    },
  });

  const backButtonHandler = () => {
    router.push("/myPage");
  };

  useEffect(() => {
    setOthersWordbookList(data);
    setBookMarkList(bookMarkedData?.data);
  }, [data, bookMarkedData]);

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

  const vocaClickHandler = (wordbookId: string) => {
    router.push({
      pathname: `/vocabulary/${wordbookId}`,
      query: { returnUrl: router.asPath },
    });
  };

  return (
    <NetworkWrapper $headerHeight={HEADER_HEIGHT}>
      <SearchBarWrapper>
        <BackButton onClick={backButtonHandler}>
          <AiOutlineArrowLeft />
        </BackButton>
        <SearchBar
          type="text"
          placeholder={"검색어를 입력해주세요"}
          onChange={textChangeHandler}
        />
      </SearchBarWrapper>
      <GridWrapper $lapTop={isLapTop}>
        {othersWordbookList != undefined && othersWordbookList?.length > 0 ? (
          othersWordbookList.map((item: WordBook, idx) => {
            return (
              <GridItem
                key={item.createDate}
                $backgroundImage={imageUrl[idx % imageUrl.length]}>
                <BtnWrapper>
                  {bookMarkList?.includes(item.wordbookId) ? (
                    <LockBtn
                      onClick={() =>
                        bookMarkMutation.mutate({
                          wordbookId: item.wordbookId,
                          userId: user?.userId,
                        })
                      }>
                      <AiFillHeart />
                    </LockBtn>
                  ) : (
                    <LockBtn
                      onClick={() =>
                        bookMarkMutation.mutate({
                          wordbookId: item.wordbookId,
                          userId: user?.userId,
                        })
                      }>
                      <AiOutlineHeart />
                    </LockBtn>
                  )}
                </BtnWrapper>
                <GridTextItem onClick={() => vocaClickHandler(item.wordbookId)}>
                  {item.wordbookName}
                </GridTextItem>
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
