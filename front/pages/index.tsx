import { Ref, useEffect, useRef, useState } from "react";
import type { NextPage } from "next";
import { MAIN_BUTTON } from "../common/utils/constant";
import { useStyletron } from "styletron-react";
import {
  MainButton,
  MainButtonHoverWrapper,
  MainButtonWrapper,
  MainPhrase,
} from "../components/intro/Main.style";
import Link from "next/link";
import { userStore } from "../zustand/store";

const Home: NextPage = () => {
  const [css] = useStyletron();
  const btnRef = useRef<(HTMLDivElement | null)[]>([]);

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

  return (
    <div>
      <MainPhrase>
        아이들 영여 교육, Phoca와 함께 주변 사물부터 시작해봐요.
      </MainPhrase>

      <MainButtonWrapper>
        <Link href={MAIN_BUTTON[0].link} passHref>
          <MainButtonHoverWrapper $guide>
            <MainButton $guide ref={(ref) => (btnRef.current[0] = ref)}>
              학습가이드
            </MainButton>
          </MainButtonHoverWrapper>
        </Link>

        {MAIN_BUTTON.map((item, idx) => {
          return (
            <Link href={item.link} key={idx} passHref>
              <MainButtonHoverWrapper>
                <MainButton
                  ref={(ref) => (btnRef.current[idx + 1] = ref)}
                  className={css({ backgroundColor: item.buttonColor })}>
                  {item.buttonName}
                </MainButton>
              </MainButtonHoverWrapper>
            </Link>
          );
        })}
      </MainButtonWrapper>
    </div>
  );
};

export default Home;
