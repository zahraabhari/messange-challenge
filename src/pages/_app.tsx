import "../styles/globals.css";
import type { AppProps } from "next/app";
import { ThemeProvider } from "@mui/material";
import { theme } from "../constants/theme";
import { UserContextProvider } from "../context/UserContext";
import { DataContextProvider } from "../context/DataContext";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={theme}>
      <DataContextProvider>
        <UserContextProvider>
          <Component {...pageProps} />
        </UserContextProvider>
      </DataContextProvider>
    </ThemeProvider>
  );
}

export default MyApp;
