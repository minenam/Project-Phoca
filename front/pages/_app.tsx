import "../styles/globals.css";
import "../styles/reset.css";

import type { AppProps } from "next/app";
import { useRouter } from "next/router";
import { Provider as StyletronProvider } from "styletron-react";
import { styletron } from "@utils/styletron";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { useEffect } from "react";
import { userStore, UserProperties } from "@zustand/userStore";

import NavBar from "@introComp/NavBar";
import SideBar from "@sidebarComp/SideBar";
import {
  URL_WITHOUT_NAVBAR,
  URL_WITHOUT_SIDEBAR,
  URL_WITHOUT_LOGIN_REQUIRED,
} from "@utils/constant";

declare module "react-query/types/react/QueryClientProvider" {
  interface QueryClientProviderProps {
    children?: React.ReactNode;
  }
}

interface ResponseType {
  statusCode: number;
  message: string;
  data: UserProperties;
  token: string;
}

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const queryClient = new QueryClient();

  // 유저 정보 userStore에 저장
  useEffect(() => {
    async function getUser() {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_SERVER_URL}/user/current`,
          {
            headers: {
              Authorization: `Bearer ${sessionStorage.getItem("userToken")}`,
            },
          },
        );

        const result: ResponseType = await res.json();
        if (result.statusCode !== 200) {
          throw new Error(result.message);
        }

        userStore.setState({ user: result.data });
      } catch (err) {
        if (!URL_WITHOUT_LOGIN_REQUIRED.includes(router.pathname)) {
          sessionStorage.removeItem("userToken");
          userStore.setState({ user: null });
          router.push({
            pathname: "/login",
            query: {
              returnUrl: router.asPath,
              message:
                "로그인 시 발급받은 토큰이 만료되었습니다. 다시 로그인해 주세요.",
            },
          });
        }
      }
    }
    if (sessionStorage.getItem("userToken")) {
      getUser();
    }
  }, [router]);

  return (
    <StyletronProvider value={styletron}>
      <QueryClientProvider client={queryClient}>
        {!URL_WITHOUT_NAVBAR.includes(router.pathname) && <NavBar />}
        {!URL_WITHOUT_SIDEBAR.includes(router.pathname) && <SideBar />}
        <Component {...pageProps} />
        <ReactQueryDevtools initialIsOpen={false} position="bottom-right" />
      </QueryClientProvider>
    </StyletronProvider>
  );
}

export default MyApp;
