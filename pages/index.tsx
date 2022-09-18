import { Box, VStack, Text } from "@chakra-ui/react";
import Head from "next/head";
import styles from "@styles/Home.module.css";
import withTransition from "@components/withTransition";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import EthereumLogo from "@components/EthereumLogo";
import Searchbar from "@components/Searchbar";

function Home() {
  const [isGraphView, setIsGraphView] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const router = useRouter();

  const [width, setWidth] = useState<number>(window.innerWidth);

  function handleWindowSizeChange() {
    setWidth(window.innerWidth);
  }

  useEffect(() => {
    window.addEventListener("resize", handleWindowSizeChange);
    return () => {
      window.removeEventListener("resize", handleWindowSizeChange);
    };
  }, []);

  const isMobile = width <= 768;

  function handleInputChange(e: any) {
    console.log("e:", e.target.value);
    setInputValue(e.target.value);
  }

  function handleNavigation(e: any) {
    e.preventDefault();
    router.push(`/address/${inputValue}`);
  }

  if (isMobile) {
    return (
      <div className={styles.container}>
        <Head>
          <title>Telescope: Ethereum Transaction Explorer</title>
          <meta name="description" content="Generated by create next app" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <VStack className={styles.titleContainer}>
          <Text className={styles.mobileText}>
            This application is only supported on desktop at the moment. Thanks
            for understanding.
          </Text>
        </VStack>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>Telescope: Ethereum Transaction Explorer</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <VStack className={styles.titleContainer}>
        <Text className={styles.title}>TELESCOPE</Text>
        <Text className={styles.subtitle}>Ethereum Transaction Explorer</Text>
        <Searchbar
          handleSwitchChange={() => {
            setIsGraphView(!isGraphView);
          }}
          handleInputChange={handleInputChange}
          handleNavigation={handleNavigation}
          isGraphView={isGraphView}
          isNavbar={false}
        />
      </VStack>
      <Box className={styles.ellipseOne}></Box>
      <Box className={styles.ellipseTwo}></Box>
      <EthereumLogo />
    </div>
  );
}

export default withTransition(Home);
