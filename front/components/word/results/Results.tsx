import Link from "next/link";

function Results() {
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
