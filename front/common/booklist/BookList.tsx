import { useEffect, Dispatch, SetStateAction } from "react";
import { useQuery } from "react-query";
import { userStore } from "@zustand/userStore";

import { AiFillLock } from "react-icons/ai";
import { MdPublic } from "react-icons/md";
import {
  SelectBookContainer,
  Title,
  ListContainer,
  ItemContainer,
  Label,
} from "./BookList.style";

export interface Wordbook {
  wordbookId: string;
  wordbookName: string;
  secured: boolean;
}

interface ListProps {
  title: string;
  height: string;
  wordbookList: Wordbook[];
  selectedWordbookId: string;
  setWordbookList: Dispatch<SetStateAction<Wordbook[]>>;
  setSelectedWordbookId: Dispatch<SetStateAction<string>>;
}

// 해당 유저의 단어장 리스트를 가져옴
const getWordbookList = async (userId: string | undefined) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/wordbook/user/${userId}`,
    {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("userToken")}`,
      },
    },
  );

  const result = await res.json();

  if (result.statusCode >= 400) {
    throw new Error(result.message);
  }

  return result;
};

function BookList({
  title,
  height,
  wordbookList,
  selectedWordbookId,
  setWordbookList,
  setSelectedWordbookId,
}: ListProps) {
  const user = userStore((state) => state.user);

  const { data } = useQuery("wordbookList", () =>
    getWordbookList(user?.userId),
  );

  // 기존 리스트에서 단어장을 선택할 수 있는 checkbox 핸들러
  const checkboxClickHandler = (e: React.FormEvent<HTMLInputElement>) => {
    const { value } = e.currentTarget;
    const selected = wordbookList.filter((item, idx) => idx === Number(value));

    if (selected) {
      setSelectedWordbookId(selected[0].wordbookId);
    }
  };

  useEffect(() => {
    setWordbookList(data);

    if (data && data.length > 0) {
      setSelectedWordbookId(data[0].wordbookId);
    }
  }, [data]);

  return (
    <SelectBookContainer>
      <Title>{title}</Title>
      <ListContainer $height={height}>
        {wordbookList?.map((item, idx) => (
          <ItemContainer key={`${item.wordbookName}${idx}`}>
            <input
              type="checkbox"
              name="word"
              value={idx}
              checked={item.wordbookId === selectedWordbookId}
              onChange={checkboxClickHandler}
            />
            <Label>{item.wordbookName}</Label>
            <Label>{item.secured ? <AiFillLock /> : <MdPublic />}</Label>
          </ItemContainer>
        ))}
      </ListContainer>
    </SelectBookContainer>
  );
}

export default BookList;
