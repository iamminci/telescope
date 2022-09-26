import {
  Box,
  VStack,
  Text,
  Image,
  HStack,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
} from "@chakra-ui/react";
import EthereumLogo from "@components/EthereumLogo";
import Navbar from "@components/Navbar";
import withTransition from "@components/withTransition";
import styles from "@styles/Transaction.module.css";
import PieChart from "@components/PieChart";
import { useEffect, useState } from "react";
import ProgressBar from "@components/ProgressBar";
import { abridgeAddress } from "@utils/helpers";

type TransactionProps = {
  transaction: any;
};

const tokenTransferData = [
  {
    from: "0xa109bc6f8292b52a6f89e8fc5eabf2947ec31bfa",
    token: "USDC",
    amount: "25.00",
    dest: "wagmi-dev.eth",
  },
  {
    from: "0xa109bc6f8292b52a6f89e8fc5eabf2947ec31bfa",
    token: "USDC",
    amount: "25.00",
    dest: "austingriffith.eth",
  },
  {
    from: "0xa109bc6f8292b52a6f89e8fc5eabf2947ec31bfa",
    token: "USDC",
    amount: "25.00",
    dest: "ricmoo.firefly.eth",
  },
  {
    from: "0xa109bc6f8292b52a6f89e8fc5eabf2947ec31bfa",
    token: "USDC",
    amount: "3.75",
    dest: "Proxy",
  },
];

const contractAddress = "0x23Ddd3e3692d1861Ed57EDE224608875809e127f";
const bridgeName = "Rainbow Bridge";

function Transaction({ transaction }: TransactionProps) {
  const [showZeroValueTxns, setShowZeroValueTxns] = useState(false);
  const [blockConfirmations, setBlockConfirmations] = useState(12);
  const [seconds, setSeconds] = useState(32);

  function handleSwitchChange() {
    setShowZeroValueTxns(!showZeroValueTxns);
  }

  useEffect(() => {
    setInterval(() => {
      setBlockConfirmations((prev) => prev + 1);
    }, 5000);
    setInterval(() => {
      setSeconds((prev) => prev - 1);
    }, 1000);
  }, []);

  const completed = (blockConfirmations / 22) * 100;

  return (
    <div className={styles.container}>
      <Navbar />
      <VStack className={styles.contentContainer}>
        <HStack className={styles.titleContainer}>
          <Text className={styles.header}>Transaction</Text>
          <Text className={styles.address}>
            0x740e84d3352a9f8e43096c15ab50f172f55c75d474c678254bc432b55d08c7a9
          </Text>
        </HStack>
        <Box className={styles.titleDivider} />
        <VStack w="100%" h="100%" margin="0 !important">
          <VStack className={styles.overviewContainer}>
            <HStack className={styles.overviewHeaderContainer}>
              <HStack className={styles.overviewHeaderLeftSection}>
                <Image
                  src="/rainbow.png"
                  alt="gitcoin"
                  className={styles.addressImage}
                ></Image>
                <VStack className={styles.addressTitleContainer}>
                  <Text className={styles.addressTitle2}>{bridgeName}</Text>
                  <Text className={styles.addressSubtitle}>
                    ({abridgeAddress(contractAddress)})
                  </Text>
                </VStack>
              </HStack>
              <VStack className={styles.overviewHeaderRightSection}>
                <HStack>
                  <Text className={styles.overviewHeader}>Date</Text>
                  <Text className={styles.overviewValue}>
                    08:19:37 UTC Sep 25, 2022
                  </Text>
                </HStack>
                <HStack className={styles.overviewRow}>
                  <HStack>
                    <Text className={styles.overviewHeader}>Method</Text>
                    <Text className={styles.overviewValue}>Bridge</Text>
                  </HStack>
                  <HStack>
                    <Text className={styles.overviewHeader}>Value</Text>
                    <Text className={styles.overviewValue}>0.5 ETH</Text>
                  </HStack>
                  <HStack>
                    <Text className={styles.overviewHeader}>Status</Text>
                    <Text className={styles.overviewValue}>In Progress</Text>
                  </HStack>
                </HStack>
                <HStack>
                  <Text className={styles.overviewHeader}>From</Text>
                  <Text className={styles.overviewValue}>
                    0xa109BC6F8292B52A6f89e8Fc5EABF2947EC31bFA
                  </Text>
                </HStack>
              </VStack>
            </HStack>
          </VStack>
          <Box className={styles.contentDivider} />
          <VStack className={styles.bridgeContainer}>
            <VStack className={styles.bridgeContentContainer}>
              <HStack w="100%">
                <VStack className={styles.bridgeSection}>
                  <Text className={styles.header}>Bridging Progress</Text>
                </VStack>
              </HStack>
              <Box h="3rem"></Box>
              <VStack>
                <Text className={styles.bridgeSubtitle1}>
                  {`Waiting for confirmations (${blockConfirmations}/22)`}
                </Text>
                <Text className={styles.bridgeSubtitle2}>
                  {`~ 5min ${seconds} sec remaining`}
                </Text>
                <HStack className={styles.bridgingContainer}>
                  <VStack className={styles.bridgeSource}>
                    <Image
                      src="/eth.png"
                      className={styles.bridgeNetworkLogo}
                      alt="hi"
                    ></Image>
                    <Text className={styles.bridgeNetworkTitle}>Ethereum</Text>
                  </VStack>
                  <ProgressBar completed={completed} />
                  <VStack className={styles.bridgeDest}>
                    <Image
                      src="/optimism.png"
                      className={styles.bridgeNetworkLogo}
                      alt="bye"
                    ></Image>
                    <Text className={styles.bridgeNetworkTitle}>Aurora</Text>
                  </VStack>
                  <VStack className={styles.bridgingSubcontainer}>
                    <Image
                      src="/rainbow.png"
                      alt="hello"
                      className={styles.rubyLogo}
                    ></Image>
                    <Text className={styles.bridgeSubtitle1}>
                      {`via ${bridgeName}`}
                    </Text>
                    <Text className={styles.bridgeSubtitle2}>
                      ({abridgeAddress(contractAddress)})
                    </Text>
                  </VStack>
                </HStack>
              </VStack>
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

export default withTransition(Transaction);
