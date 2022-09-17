import { Box, VStack, Text } from "@chakra-ui/react";
import Head from "next/head";
import styles from "@styles/Home.module.css";
import withTransition from "@components/withTransition";
import { useState } from "react";
import { useRouter } from "next/router";
import EthereumLogo from "@components/EthereumLogo";
import Navbar from "@components/Navbar";
import Searchbar from "@components/Searchbar";

function Home() {
  const [isGraphView, setIsGraphView] = useState(false);
  const router = useRouter();

  function handleNavigation() {
    router.push("/address/0x0000000000000000000000000000000000000000");
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>Telescope: Ethereum Transaction Explorer</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar />
      <VStack className={styles.titleContainer}>
        <Text className={styles.title}>TELESCOPE</Text>
        <Text className={styles.subtitle}>Ethereum Transaction Explorer</Text>
        <Searchbar
          handleSwitchChange={() => {
            setIsGraphView(!isGraphView);
          }}
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
