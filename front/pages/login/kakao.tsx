import { useRouter } from "next/router";
import { useEffect } from "react";
import { useMutation } from "react-query";

const kakaoLoginHandler = async (code: string) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/auth/kakao/login`,
    {
      method: "POST",
      body: JSON.stringify(code),
    },
  );
  if (!res.ok) {
    throw new Error("카카오 로그인 에러");
  }
  const result = await res.json();
  return result;
};

function Kakao() {
  const router = useRouter();
  const code = router.query.code as string;

  const kakaoLoginMutation = useMutation(kakaoLoginHandler, {
    onSuccess: (data, variables) => {
      console.log("kakao login 성공: ", data);
    },
    onError: (err) => {
      console.log(err);
    },
  });

  useEffect(() => {
    kakaoLoginMutation.mutate(code);
  }, []);
  return <div>Kakao</div>;
}

export default Kakao;
