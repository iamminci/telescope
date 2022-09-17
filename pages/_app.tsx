import "../styles/globals.css";
import type { AppProps } from "next/app";
import { Box, ChakraProvider, extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
  styles: {
    global: (props: any) => ({
      body: {
        fontFamily: "Bai Jamjuree",
        lineHeight: "base",
      },
    }),
  },
});

function MyApp({ Component, pageProps, router }: AppProps) {
  return (
    <ChakraProvider theme={theme}>
      <Component {...pageProps} key={router.route} />
    </ChakraProvider>
  );
}

export default MyApp;
