import { useRouter } from "next/router";

function Kakao() {
  const router = useRouter();
  console.log(router);
  return <div>Kakao</div>;
}

export default Kakao;
