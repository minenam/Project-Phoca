import type { NextPage } from "next";
import { MAIN_BUTTON } from "../common/utils/uils";
import { useStyletron } from "styletron-react";
import { MainButton, MainButtonWrapper } from "../components/intro/Main.style";

const Home: NextPage = () => {
  const [css] = useStyletron();

  return (
    <div>
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
