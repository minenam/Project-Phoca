import Link from "next/link";
import { useState } from "react";
import { useStyletron } from "styletron-react";
import { MAIN_BUTTON, HEADER_HEIGHT } from "../../common/utils/constant";
import Modal from "../../common/modal/Modal";
import LoginRequiredModal from "../../common/loginRequiredModal/LoginRequiredModal";
import { SideBarContainer, SideBarBtn } from "./SideBar.style";

function SideBar() {
  const [css] = useStyletron();

  const [loginModalOpen, setLoginModalOpen] = useState(false); // 로그인 페이지로 연결 여부

  const sidebarBtnClickHandler = (
    e: React.MouseEvent<HTMLDivElement>,
    link: string,
  ) => {
    const userToken = sessionStorage.getItem("userToken");

    if (
      (!userToken && link === "/myPage") ||
      (!userToken && link === "/wordQuiz")
    ) {
      e.preventDefault();
      setLoginModalOpen(true);
    }
  };

  const loginModalCloseHandler = () => {
    setLoginModalOpen(false);
  };

  return (
    <>
      <SideBarContainer>
        {MAIN_BUTTON.map((item, idx) => (
          <Link href={item.link} key={item.buttonName}>
            <SideBarBtn
              className={css({
                backgroundColor: item.buttonColor,
              })}
              $headerHeight={HEADER_HEIGHT}
              onClick={(e) => sidebarBtnClickHandler(e, item.link)}>
              {item.buttonName}
            </SideBarBtn>
          </Link>
        ))}
      </SideBarContainer>
      {loginModalOpen && (
        <Modal
          open={loginModalOpen}
          width="400px"
          onClose={loginModalCloseHandler}
          large={false}>
          <LoginRequiredModal onClose={loginModalCloseHandler} />
        </Modal>
      )}
    </>
  );
}

export default SideBar;
