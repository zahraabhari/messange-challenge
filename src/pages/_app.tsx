import "../styles/globals.css";
import type { AppProps } from "next/app";
import { ThemeProvider } from "@mui/material";
import { theme } from "../constants/theme";
import { UserContextProvider } from "../context/UserContext";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={theme}>
        <UserContextProvider>
      <Component {...pageProps} />
        </UserContextProvider>
    </ThemeProvider>
  );
}

export default MyApp;
