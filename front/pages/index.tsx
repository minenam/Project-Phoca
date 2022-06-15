import { Ref, useEffect, useRef } from "react";
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
  const [css] = useStyletron();
  const btnRef = useRef<(HTMLAnchorElement | null)[]>([]);

  useEffect(() => {
    console.log(btnRef);
    btnRef.current.forEach((btn: any) => {
      console.log("e", btn);
      btn.addEventListener("mousemove", (e: MouseEvent) => {
        console.log("event", e);
        const size = parseInt(getComputedStyle(btn).width);
        const x = size * 0.3 * 0.7 + 0.7 * e.offsetX;
        const y = size * 0.3 * 0.7 + 0.7 * e.offsetY;

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
