import { useRouter } from "next/router";
import { useEffect } from "react";
import { useQuery } from "react-query";
import { userStore } from "../../zustand/userStore";

const getCurrentUser = async (token: string) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/user/current`,
    {
      headers: { Authorization: `Bearer ${token}` },
    },
  );
  const result = await res.json();
  return result;
};

function Kakao() {
  const router = useRouter();
  const token = router.query.token as string;

  const { data, isSuccess } = useQuery(
    "currentUser",
    () => getCurrentUser(token),
    {
      enabled: !!token,
    },
  );

  useEffect(() => {
    if (!!token) {
      sessionStorage.setItem("userToken", token);
    }
  }, [router, token]);

  useEffect(() => {
    if (isSuccess) {
      userStore.setState({ user: data.data });
      router.push("/");
    }
  }, [data, isSuccess, router]);
  return <div>Kakao</div>;
}

export default Kakao;
