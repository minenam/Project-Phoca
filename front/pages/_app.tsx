import "../styles/globals.css";
import "../styles/reset.css";
import type { AppProps } from "next/app";
import { Provider as StyletronProvider } from "styletron-react";
import { styletron } from "../styletron";
import { useRouter } from "next/router";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import NavBar from "../components/intro/NavBar";
import SideBar from "../components/sidebar/SideBar";

declare module "react-query/types/react/QueryClientProvider" {
  interface QueryClientProviderProps {
    children?: React.ReactNode;
  }
}

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const urlWithoutNavbar: string[] = ["/login", "/register"];
  const urlWithoutSidebar: string[] = ["/", "/login", "/register"];
  const queryClient = new QueryClient();

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
