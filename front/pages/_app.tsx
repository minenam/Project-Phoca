import "../styles/globals.css";
import "../styles/reset.css";

import type { AppProps } from "next/app";
import { useRouter } from "next/router";
import { Provider as StyletronProvider } from "styletron-react";
import { styletron } from "../common/utils/styletron";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { useEffect } from "react";
import { userStore, UserProperties } from "../zustand/userStore";

import NavBar from "../components/intro/NavBar";
import SideBar from "../components/sidebar/SideBar";
import {
  URL_WITHOUT_NAVBAR,
  URL_WITHOUT_SIDEBAR,
  URL_WITHOUT_LOGIN_REQUIRED,
} from "../common/utils/constant";

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
          router.push({
            pathname: "/login",
            query: { returnUrl: router.asPath },
          });
        }
      }
    }
    if (sessionStorage.getItem("userToken")) {
      getUser();
    }
  }, []);

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
