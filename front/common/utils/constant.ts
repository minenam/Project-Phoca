interface Button {
  buttonName: string;
  buttonColor: string;
  link: string;
  backgroundImage: string;
}

export const MAIN_BUTTON: Button[] = [
  {
    buttonName: "단어장 만들기",
    buttonColor: "#AF93FF",
    link: "/word/upload",
    backgroundImage: "/images/monster_artist.png",
  },
  {
    buttonName: "단어장 보러가기",
    buttonColor: "#FEC70B",
    link: "/myPage",
    backgroundImage: "/images/traveling.png",
  },
  {
    buttonName: "그림퀴즈 하러가기",
    buttonColor: "#48CFC8",
    link: "/drawing",
    backgroundImage: "/images/playing_cards.png",
  },
  {
    buttonName: "단어퀴즈 하러가기",
    buttonColor: "#FE7394",
    link: "/wordQuiz",
    backgroundImage: "/images/popularity.png",
  },
];

export const GuideButton: { [key in string]: string } = {
  "단어장 만들기": "/word/upload",
  "단어장 보러가기": "/myPage",
  "그림퀴즈 하러가기": "/drawing",
  "단어퀴즈 하러가기": "/wordQuiz",
};

export const WORD_IMAGES: string[] = [
  "/images/contemplating.png",
  "/images/faq.png",
  "/images/monster_artist.png",
  "/images/playing_cards.png",
  "/images/popularity.png",
  "/images/updated.png",
];

export const IMAGE_EXTENSION = [".jpg", ".png", ".jpeg"];

export const HEADER_HEIGHT: string = "130px";
export const SIDEBAR_WIDTH: string = "400px";

export const WORD_NOTE_WIDTH: string = "650px";
export const WORD_NOTE_HEIGHT: string = "70vh";

export const URL_WITHOUT_NAVBAR: string[] = ["/login", "/register"];
export const URL_WITHOUT_SIDEBAR: string[] = [
  "/",
  "/login",
  "/register",
  "/network",
  "/guide",
  "/wordQuiz/game/[id]",
];
export const URL_WITHOUT_LOGIN_REQUIRED: string[] = [
  "/",
  "/guide",
  "/word/upload",
  "/word/results/[id]",
  "/drawing",
  "/login",
  "/register",
];

export const LEFT_WITH_SIDEBAR = "60%";
export const LEFT_WITHOUT_SIDEBAR = "50%";
