interface Button {
  buttonName: string;
  buttonColor: string;
  link: string;
  backgroundImage: string;
}

interface MockUP {
  voc_type: string;
  voc_name: string;
}

export const MAIN_BUTTON: Button[] = [
  {
    buttonName: "단어장 만들기",
    buttonColor: "#AF93FF",
    link: "/word/upload",
    backgroundImage: "/images/monster_artist.svg",
  },
  {
    buttonName: "단어장 보러가기",
    buttonColor: "#FEC70B",
    link: "/myPage",
    backgroundImage: "/images/traveling.svg",
  },
  {
    buttonName: "그림퀴즈 하러가기",
    buttonColor: "#48CFC8",
    link: "/drawing",
    backgroundImage: "/images/playing_cards.svg",
  },
  {
    buttonName: "단어퀴즈 하러가기",
    buttonColor: "#FE7394",
    link: "/wordQuiz",
    backgroundImage: "/images/popularity.svg",
  },
];

export const WORD_IMAGES: string[] = [
  "/images/contemplating.svg",
  "/images/faq.svg",
  "/images/monster_artist.svg",
  "/images/playing_cards.svg",
  "/images/popularity.svg",
  "/images/updated.svg",
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

export const LEFT_WITH_SIDEBAR = "60%";
export const LEFT_WITHOUT_SIDEBAR = "50%";
