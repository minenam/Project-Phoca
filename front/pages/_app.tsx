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
  const urlWithoutNavbar: string[] = ["/login", "/register"];
  const urlWithoutSidebar: string[] = ["/", "/login", "/register", "/network"];
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

        if (!res.ok) {
          throw new Error("토큰 만료");
        }

        const result: ResponseType = await res.json();
        userStore.setState({ user: result.data });
      } catch (err) {
        console.log(err);
      }
    }
    if (sessionStorage.getItem("userToken")) {
      getUser();
    }
  }, []);

  return (
    <StyletronProvider value={styletron}>
      <QueryClientProvider client={queryClient}>
        {!urlWithoutNavbar.includes(router.pathname) && <NavBar />}
        {!urlWithoutSidebar.includes(router.pathname) && <SideBar />}
        <Component {...pageProps} />
        <ReactQueryDevtools initialIsOpen={false} position="bottom-right" />
      </QueryClientProvider>
    </StyletronProvider>
  );
}

export default MyApp;
