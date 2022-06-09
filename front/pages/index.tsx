import type { NextPage } from "next";
import NavBar from "../components/intro/NavBar";
import { MAIN_BUTTON } from "../common/utils/uils";
import css from "styled-jsx/css";
import { useStyletron } from "styletron-react";
import { MainButton, MainButtonWrapper } from "../components/intro/Main.style";

const Home: NextPage = () => {
  const [css] = useStyletron();

  return (
    <div>
      <NavBar />
      <MainButtonWrapper>
        {MAIN_BUTTON.map((item, idx) => {
          return (
            <MainButton
              key={idx}
              className={css({ backgroundColor: item.buttonColor })}>
              {item.buttonName}
            </MainButton>
          );
        })}
      </MainButtonWrapper>
    </div>
  );
};

export default Home;
