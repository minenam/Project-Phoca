import React, { useEffect, useRef, useState } from "react";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import { MAIN_BUTTON } from "../common/utils/constant";
import { useStyletron } from "styletron-react";
import {
  MainButton,
  MainButtonHoverWrapper,
  MainButtonWrapper,
  MainPhrase,
} from "../components/intro/Main.style";
import Link from "next/link";
import { userStore } from "../zustand/userStore";
import Modal from "../common/modal/Modal";
import LoginRequiredModal from "../common/loginRequiredModal/LoginRequiredModal";
import Seo from "../common/Seo";

const Home: NextPage = () => {
  const router = useRouter();
  const user = userStore();
  const [css] = useStyletron();
  const url = router.pathname;

  const btnRef = useRef<(HTMLDivElement | null)[]>([]);
  const [loginModalOpen, setLoginModalOpen] = useState(false);

  useEffect(() => {
    btnRef.current.forEach((btn: any) => {
      btn.addEventListener("mousemove", (e: MouseEvent) => {
        const size = parseInt(getComputedStyle(btn).width);
        const x = size * 0.3 * 0.7 + 0.7 * e.offsetX;
        const y = size * 0.3 * 0.7 + 0.7 * e.offsetY;

        btn.style.setProperty("--x", x.toString());
        btn.style.setProperty("--y", y.toString());
        btn.style.setProperty("--size", size.toString());
      });
    });
  }, [btnRef]);

  const loginModalCloseHandler = () => {
    setLoginModalOpen(false);
  };

  const buttonClickHandler = (
    e: React.MouseEvent<HTMLDivElement>,
    idx: number,
  ) => {
    if (
      (idx === 1 && user.user === null) ||
      (idx === 3 && user.user === null)
    ) {
      e.preventDefault();
      setLoginModalOpen(true);
    }
  };

  return (
    <div>
      <Seo title="메인페이지" />
      <MainPhrase>
        아이들 영어 교육, Phoca와 함께 주변 사물부터 시작해봐요.
      </MainPhrase>

      <MainButtonWrapper>
        <Link href={"/guide"} passHref>
          <MainButtonHoverWrapper $guide>
            <MainButton
              $guide
              ref={(ref) => (btnRef.current[0] = ref)}
              $backgroundImage="/images/faq.svg">
              학습가이드
            </MainButton>
          </MainButtonHoverWrapper>
        </Link>

        {MAIN_BUTTON.map((item, idx) => {
          return (
            <Link href={item.link} key={item.buttonName} passHref>
              <MainButtonHoverWrapper>
                <MainButton
                  ref={(ref) => (btnRef.current[idx + 1] = ref)}
                  className={css({ backgroundColor: item.buttonColor })}
                  $backgroundImage={item.backgroundImage}
                  onClick={(e) => buttonClickHandler(e, idx)}>
                  {item.buttonName}
                </MainButton>
              </MainButtonHoverWrapper>
            </Link>
          );
        })}
      </MainButtonWrapper>
      {loginModalOpen && (
        <Modal
          open={loginModalOpen}
          width="400px"
          onClose={loginModalCloseHandler}
          large={false}
          url={url}>
          <LoginRequiredModal onClose={loginModalCloseHandler} />
        </Modal>
      )}
    </div>
  );
};

export default Home;
