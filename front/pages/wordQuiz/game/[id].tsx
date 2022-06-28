import { useRouter } from "next/router";

const WordQuizGame = () => {
  const router = useRouter();
  return <div>${router.query.id}</div>;
};

export default WordQuizGame;
