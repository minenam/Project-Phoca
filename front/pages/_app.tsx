import "../styles/globals.css";
import "../styles/reset.css";
import type { AppProps } from "next/app";
import { Provider as StyletronProvider } from "styletron-react";
import { styletron } from "../common/utils/styletron";
import { useRouter } from "next/router";
import NavBar from "../components/intro/NavBar";
import SideBar from "../components/sidebar/SideBar";

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();
  return (
    <StyletronProvider value={styletron}>
      <NavBar />
      {router.pathname !== "/" && <SideBar />}
      <Component {...pageProps} />
    </StyletronProvider>
  );
}

export default MyApp;
