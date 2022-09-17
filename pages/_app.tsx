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

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={theme}>
      <Component {...pageProps} />
      <Box className="backgroundContainer">
        <Box className="ellipseOne"></Box>
        <Box className="ellipseTwo"></Box>
      </Box>
    </ChakraProvider>
  );
}

export default MyApp;
