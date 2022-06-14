interface Button {
  buttonName: string;
  buttonColor: string;
  link: string;
}

export const MAIN_BUTTON: Button[] = [
  {
    buttonName: "단어장 만들기",
    buttonColor: "#AF93FF",
    link: "/makeWord",
  },
  {
    buttonName: "단어장 보러가기",
    buttonColor: "#FEC70B",
    link: "/myPage",
  },
  {
    buttonName: "그림퀴즈 하러가기",
    buttonColor: "#48CFC8",
    link: "/imageQuiz",
  },
  {
    buttonName: "단어퀴즈 하러가기",
    buttonColor: "#FE7394",
    link: "/wordQuiz",
  },
];

export const HEADER_HEIGHT: string = "100px";
export const SIDEBAR_WIDTH: string = "300px";