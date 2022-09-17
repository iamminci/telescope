import { Search2Icon } from "@chakra-ui/icons";
import { Box, VStack, Text, HStack, Input, Switch } from "@chakra-ui/react";
import type { NextPage } from "next";
import Head from "next/head";
import styles from "../styles/Home.module.css";

const Home: NextPage = () => {
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
        <HStack className={styles.searchbar}>
          <Search2Icon color="white" />
          <Input
            className={styles.searchInput}
            placeholder="Search by Address /Txn Hash / Block / Token / ENS"
          />
          <HStack className={styles.switchContainer}>
            <Switch
              colorScheme="orange"
              onChange={() => {}}
              className={styles.forceSwitch}
            />
            <Text className={styles.graphViewLabel}>Graph View</Text>
          </HStack>
        </HStack>
      </VStack>
      <Box className={styles.ellipseOne}></Box>
      <Box className={styles.ellipseTwo}></Box>
    </div>
  );
};

export default Home;
