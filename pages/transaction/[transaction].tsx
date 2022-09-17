import {
  Box,
  VStack,
  Text,
  Image,
  HStack,
  Switch,
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
} from "@chakra-ui/react";
import EthereumLogo from "@components/EthereumLogo";
import Navbar from "@components/Navbar";
import withTransition from "@components/withTransition";
import styles from "@styles/Transaction.module.css";
import PieChart from "@components/PieChart";
import { useState } from "react";

const dummyData = [
  { date: "Sep 14, 2022", count: 2 },
  { date: "Sep 13, 2022", count: 3 },
  { date: "Sep 10, 2022", count: 1 },
  { date: "Sep 9, 2022", count: 4 },
  { date: "Sep 7, 2022", count: 1 },
];

function Address() {
  const [showZeroValueTxns, setShowZeroValueTxns] = useState(false);

  function handleSwitchChange() {
    setShowZeroValueTxns(!showZeroValueTxns);
  }

  return (
    <div className={styles.container}>
      <Navbar />
      <VStack className={styles.contentContainer}>
        <HStack className={styles.titleContainer}>
          <Text className={styles.header}>Transaction</Text>
          <Text className={styles.address}>
            0x29e6b5173a1009f8213ac5238f749a8e8a898b752d9221e6543342898caeadfb
          </Text>
        </HStack>
        <Box className={styles.titleDivider} />
        <VStack w="100%" h="100%" margin="0 !important">
          <VStack className={styles.overviewContainer}>
            <HStack className={styles.overviewHeaderContainer}>
              <HStack className={styles.overviewHeaderLeftSection}>
                <Image
                  src="/uniswap.png"
                  alt="uniswap"
                  className={styles.addressImage}
                ></Image>
                <VStack className={styles.addressTitleContainer}>
                  <Text className={styles.addressTitle}>Uniswap</Text>
                  <Text className={styles.addressSubtitle}>
                    (0x5B7d90b...2A05fad86f)
                  </Text>
                </VStack>
              </HStack>
              <VStack className={styles.overviewHeaderRightSection}>
                <HStack>
                  <Text className={styles.overviewHeader}>Date</Text>
                  <Text className={styles.overviewValue}>
                    17:59:22 UTC Sep 14, 2022
                  </Text>
                </HStack>
                <HStack className={styles.overviewRow}>
                  <HStack>
                    <Text className={styles.overviewHeader}>Method</Text>
                    <Text className={styles.overviewValue}>
                      DepositForEther
                    </Text>
                  </HStack>
                  <HStack>
                    <Text className={styles.overviewHeader}>Value</Text>
                    <Text className={styles.overviewValue}>0.05 ETH</Text>
                  </HStack>
                  <HStack>
                    <Text className={styles.overviewHeader}>Status</Text>
                    <Text className={styles.overviewValue}>Success</Text>
                  </HStack>
                </HStack>
                <HStack>
                  <Text className={styles.overviewHeader}>From</Text>
                  <Text className={styles.overviewValue}>
                    0x5B7d90b2069e4867f160301489D5012A05fad86f
                  </Text>
                </HStack>
              </VStack>
            </HStack>
          </VStack>
          <Box className={styles.contentDivider} />
          <VStack className={styles.detailContainer}>
            <VStack className={styles.detailContentContainer}>
              <HStack className={styles.detailTitleContainer}>
                <Text className={styles.header}>Details</Text>
              </HStack>
              <HStack w="100%">
                <VStack className={styles.detailLeftSection}>
                  <HStack>
                    <Text className={styles.detailHeader}>Txn Type</Text>
                    <Text className={styles.detailValue}>
                      Internal Transfer
                    </Text>
                  </HStack>
                  {/* <HStack>
                    <Text className={styles.detailHeader}>Txn Hash</Text>
                    <Text className={styles.detailValue}>
                      0x29e6b5173a1009f8213ac5238f749a8e8a898b752d9221e6543342898caeadfb
                    </Text>
                  </HStack> */}
                  <HStack>
                    <Text className={styles.detailHeader}>Txn Fee</Text>
                    <Text className={styles.detailValue}>
                      0.011515534072895176 Ether
                    </Text>
                  </HStack>
                  <HStack>
                    <Text className={styles.detailHeader}>
                      Account Balances
                    </Text>
                    <Text>TABLE</Text>
                  </HStack>
                  <HStack>
                    <Text className={styles.detailHeader}>Block Number</Text>
                    <Text className={styles.detailValue}>1275734</Text>
                  </HStack>
                  <HStack>
                    <Text className={styles.detailHeader}>Gas Price</Text>
                    <Text className={styles.detailValue}>
                      0.000000054143102648 Ether (54.143102648 Gwei)
                    </Text>
                  </HStack>
                  <HStack>
                    <Text className={styles.detailHeader}>Gas Limit</Text>
                    <Text className={styles.detailValue}>
                      282,917 | 212,687 (75.18%)
                    </Text>
                  </HStack>
                  <HStack>
                    <Text className={styles.detailHeader}>Gas Fees</Text>
                    <Text>TABLE</Text>
                  </HStack>
                </VStack>
                <VStack className={styles.detailRightSection}>
                  <VStack>
                    <Text className={styles.detailHeader}>Token Transfers</Text>
                    <Text>TABLE</Text>
                  </VStack>
                  <VStack>
                    <Text className={styles.detailHeader}>Execution Trace</Text>
                    <Text>TABLE</Text>
                  </VStack>
                </VStack>
              </HStack>
            </VStack>
            <Box className={styles.ellipseThree}></Box>
          </VStack>
        </VStack>
      </VStack>
      <Box className={styles.ellipseOne}></Box>
      <Box className={styles.ellipseTwo}></Box>

      <EthereumLogo />
    </div>
  );
}

export default withTransition(Address);
