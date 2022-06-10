import "../styles/globals.css";
import "../styles/reset.css";
import type { AppProps } from "next/app";
import { Provider as StyletronProvider } from "styletron-react";
import { styletron } from "../styletron";
import { useRouter } from "next/router";
import NavBar from "../components/intro/NavBar";
import SideBar from "../components/sidebar/SideBar";

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const urlWithoutSidebar: string[] = ["/", "/login", "register"];

  return (
    <StyletronProvider value={styletron}>
      <NavBar />
      {urlWithoutSidebar.indexOf(router.pathname) === -1 && <SideBar />}
      <Component {...pageProps} />
    </StyletronProvider>
  );
}

export default MyApp;
