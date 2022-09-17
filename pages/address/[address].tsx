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
import styles from "@styles/Address.module.css";
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
          <Text className={styles.header}>Address</Text>
          <Text className={styles.address}>
            0x5B7d90b2069e4867f160301489D5012A05fad86f (minci.eth)
          </Text>
        </HStack>
        <Box className={styles.titleDivider} />
        <HStack w="100%">
          <VStack className={styles.overviewContainer}>
            <VStack className={styles.overviewHeaderContainer}>
              <Text className={styles.header}>Total Balance</Text>
              <Text className={styles.fiatBalance}>$12,307.55</Text>
              <Text className={styles.ethBalance}>7.676 ETH</Text>
            </VStack>
            <Box className={styles.pieChartContainer}>
              <PieChart
                data={[
                  { title: "One", value: 10, color: "#E38627" },
                  { title: "Two", value: 15, color: "#C13C37" },
                  { title: "Three", value: 20, color: "#6A2135" },
                ]}
              />
            </Box>
            <VStack className={styles.tokenContainer}>
              {new Array(5).fill(0).map((_, idx) => (
                <HStack key={`bye-${idx}`} className={styles.tokenRowContainer}>
                  <Image
                    src="/eth.png"
                    alt="eth logo"
                    className={styles.tokenLogo}
                  ></Image>
                  <Text>ETH</Text>
                  <Text>3.85</Text>
                  <Text>$5281</Text>
                </HStack>
              ))}
            </VStack>
          </VStack>
          <Box className={styles.contentDivider} />
          <VStack className={styles.transactionContainer}>
            <VStack className={styles.transactionContentContainer}>
              <HStack className={styles.transactionTitleContainer}>
                <Text className={styles.header}>Transactions</Text>
                <HStack>
                  <Switch
                    colorScheme="orange"
                    onChange={handleSwitchChange}
                    className={
                      showZeroValueTxns ? styles.isSwitchOn : styles.isSwitchOff
                    }
                  />
                  <Text>Show Zero Value Transactions</Text>
                </HStack>
              </HStack>
              <TableContainer>
                <Table variant="unstyled">
                  <Thead>
                    <Tr className={styles.transactionHeaderContainer}>
                      <Th></Th>
                      <Th className={styles.transactionHeaderLabel}>Time</Th>
                      <Th className={styles.transactionHeaderLabel}>Address</Th>
                      <Th className={styles.transactionHeaderLabel}>Method</Th>
                      <Th className={styles.transactionHeaderLabel}>Value</Th>
                      <Th className={styles.transactionHeaderLabel}>Status</Th>
                      <Th className={styles.transactionHeaderLabel}>Type</Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    {/* {dummyData.map(({ date, count }, idx) => (
                      <HStack key={idx}>
                        <Text>{date}</Text>
                        <VStack> */}
                    {new Array(10).fill(0).map((_, idx) => (
                      //   <HStack key={`hi-${idx}`}>
                      //     <Text>17:59:22 UTC</Text>
                      //     <Text>Uniswap</Text>
                      //     <Text>DepositForEther</Text>
                      //     <Text>-0.05 ETH</Text>
                      //     <Text>Pending</Text>
                      //     <Text>Ether</Text>
                      //   </HStack>
                      <Tr key={`hi-${idx}`}>
                        <Td>Sep 14, 2022</Td>
                        <Td>17:59:22 UTC</Td>
                        <Td>Uniswap</Td>
                        <Td>DepositForEther</Td>
                        <Td>-0.05 ETH</Td>
                        <Td>Pending</Td>
                        <Td>Ether</Td>
                      </Tr>
                    ))}
                    {/* </VStack>
                      </HStack>
                    ))} */}
                    {/* <Tr>
                      <Td>inches</Td>
                      <Td>millimetres (mm)</Td>
                      <Td isNumeric>25.4</Td>
                    </Tr>
                    <Tr>
                      <Td>feet</Td>
                      <Td>centimetres (cm)</Td>
                      <Td isNumeric>30.48</Td>
                    </Tr>
                    <Tr>
                      <Td>yards</Td>
                      <Td>metres (m)</Td>
                      <Td isNumeric>0.91444</Td>
                    </Tr>*/}
                  </Tbody>
                </Table>
              </TableContainer>
              {/* {dummyData.map(({ date, count }, idx) => (
                <HStack key={idx}>
                  <Text>{date}</Text>
                  <VStack>
                    {new Array(count).fill(0).map((_, idx) => (
                      <HStack key={`hi-${idx}`}>
                        <Text>17:59:22 UTC</Text>
                        <Text>Uniswap</Text>
                        <Text>DepositForEther</Text>
                        <Text>-0.05 ETH</Text>
                        <Text>Pending</Text>
                        <Text>Ether</Text>
                      </HStack>
                    ))}
                  </VStack>
                </HStack>
              ))} */}
            </VStack>
            <Box className={styles.ellipseThree}></Box>
          </VStack>
        </HStack>
      </VStack>
      <Box className={styles.ellipseOne}></Box>
      <Box className={styles.ellipseTwo}></Box>

      <EthereumLogo />
    </div>
  );
}

export default withTransition(Address);
