import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect } from "react";

function Results() {
  const router = useRouter();

  useEffect(() => {
    console.log(router);
  }, []);

  return (
    <div>
      Results
      <Link href="/word/upload">
        <a>
          <button>업로드 페이지 이동</button>
        </a>
      </Link>
    </div>
  );
}

export default Results;
