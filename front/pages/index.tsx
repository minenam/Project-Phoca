import { useEffect, useRef } from "react";
import type { NextPage } from "next";
import { MAIN_BUTTON } from "../common/utils/constant";
import { useStyletron } from "styletron-react";
import {
  MainButton,
  MainButtonWrapper,
  MainPhrase,
} from "../components/intro/Main.style";
import Link from "next/link";

const Home: NextPage = () => {
  // const [hoverRef, hoverd] = useHover();
  const [css] = useStyletron();
  const btnRef = useRef<(HTMLAnchorElement | null)[]>([]);

  useEffect(() => {
    console.log(btnRef);
    btnRef.current.forEach((btn: any, index) => {
      btn.addEventListener("mousemove", (e: MouseEvent) => {
        const size = parseInt(getComputedStyle(btn).width);
        const x = size * 0.3 * 0.7 + 0.7 * e.offsetX;
        const y =
          index == 0
            ? size * 0.2 * 0.4 + 0.4 * e.offsetY
            : size * 0.3 * 0.7 + 0.7 * e.offsetY;

        btn.style.setProperty("--x", x.toString());
        btn.style.setProperty("--y", y.toString());
        btn.style.setProperty("--size", size.toString());
      });
    });
  }, []);

  return (
    <div>
      <MainPhrase>메인 문구 들어갈 자리입니다.</MainPhrase>
      <MainButtonWrapper>
        <Link href={"/guide"} passHref>
          <MainButton
            $guide
            $backgroundImage="/faq.svg"
            ref={(ref) => (btnRef.current[0] = ref)}>
            학습가이드
          </MainButton>
        </Link>

        {MAIN_BUTTON.map((item, idx) => {
          console.log("item.", item.backgroundImage);
          return (
            <Link href={item.link} key={idx} passHref>
              <MainButton
                ref={(ref) => (btnRef.current[idx + 1] = ref)}
                className={css({ backgroundColor: item.buttonColor })}
                $backgroundImage={item.backgroundImage}>
                {item.buttonName}
              </MainButton>
            </Link>
          );
        })}
      </MainButtonWrapper>
    </div>
  );
};

export default Home;
