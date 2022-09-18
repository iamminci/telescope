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
import { useState } from "react";

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

function Transaction({ transaction }: TransactionProps) {
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
          <Text className={styles.address}>{transaction.hash}</Text>
        </HStack>
        <Box className={styles.titleDivider} />
        <VStack w="100%" h="100%" margin="0 !important">
          <VStack className={styles.overviewContainer}>
            <HStack className={styles.overviewHeaderContainer}>
              <HStack className={styles.overviewHeaderLeftSection}>
                <Image
                  src="/gitcoin.png"
                  alt="gitcoin"
                  className={styles.addressImage}
                ></Image>
                <VStack className={styles.addressTitleContainer}>
                  <Text className={styles.addressTitle}>Gitcoin</Text>
                  <Text className={styles.addressSubtitle}>
                    (0x7d655c5...9f5221c)
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
                    <Text className={styles.overviewValue}>Donate</Text>
                  </HStack>
                  <HStack>
                    <Text className={styles.overviewHeader}>Value</Text>
                    <Text className={styles.overviewValue}>0.05400938 ETH</Text>
                  </HStack>
                  <HStack>
                    <Text className={styles.overviewHeader}>Status</Text>
                    <Text className={styles.overviewValue}>Success</Text>
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
          <VStack className={styles.detailContainer}>
            <VStack className={styles.detailContentContainer}>
              <HStack w="100%">
                <VStack className={styles.detailLeftSection}>
                  {/* <HStack>
                      <Text className={styles.txnDetailHeader}>Txn Hash</Text>
                      <Text className={styles.detailValue}>
                        0x29e6b5173a1009f8213ac5238f749a8e8a898b752d9221e6543342898caeadfb
                      </Text>
                    </HStack> */}
                  <HStack>
                    <Text className={styles.txnDetailHeader}>Txn Fee</Text>
                    <Text>0.01151553407 Ether</Text>
                  </HStack>
                  <HStack>
                    <Text className={styles.txnDetailHeader}>Block Number</Text>
                    <Text>1275734</Text>
                  </HStack>
                  <HStack>
                    <Text className={styles.txnDetailHeader}>Gas Price</Text>
                    <Text>0.00000005414 Ether (54.14 Gwei)</Text>
                  </HStack>
                  <HStack>
                    <Text className={styles.txnDetailHeader}>Gas Limit</Text>
                    <Text>282,917 | 212,687 (75.18%)</Text>
                  </HStack>
                  <VStack justifyContent="flex-start" alignItems="flex-start">
                    <Text className={styles.txnDetailHeader}>Gas Fees</Text>
                    <TableContainer paddingLeft="1rem">
                      <Table variant="unstyled">
                        <Thead>
                          <Tr className={styles.transactionHeaderContainer}>
                            <Th padding={"0.5rem"} paddingLeft="0">
                              Base Fee Per Gas
                            </Th>
                            <Th padding={"0.5rem 1.5rem"}>Max Fee Per Gas</Th>
                            <Th padding={"0.5rem 1.5rem"}>
                              Max Priority Per Gas
                            </Th>
                          </Tr>
                        </Thead>
                        <Tbody>
                          <Tr>
                            <Td padding={"0.5rem"} paddingLeft="0">
                              52.643 Gwei
                            </Td>
                            <Td padding={"0.5rem 1.5rem"}>80.156 Gwei</Td>
                            <Td padding={"0.5rem 1.5rem"}>1.5 Gwei</Td>
                          </Tr>
                        </Tbody>
                      </Table>
                    </TableContainer>
                  </VStack>
                  <VStack justifyContent="flex-start" alignItems="flex-start">
                    <Text className={styles.txnDetailHeader}>
                      Account Balances
                    </Text>
                    <TableContainer paddingLeft="1rem">
                      <Table variant="unstyled">
                        <Thead>
                          <Tr className={styles.transactionHeaderContainer}>
                            <Th padding={"0.5rem"} paddingLeft="0">
                              Address
                            </Th>
                            <Th padding={"0.5rem 0.5rem"}>Token</Th>
                            <Th padding={"0.5rem 0.5rem"}>Balance</Th>
                          </Tr>
                        </Thead>
                        <Tbody>
                          <Tr>
                            <Td padding={"0.5rem"} paddingLeft="0">
                              0xa109bc6f8292b52a6f89e8fc5eabf2947ec31bfa
                            </Td>
                            <Td padding={"0.5rem 0.5rem"}>USDC</Td>
                            <Td
                              padding={"0.5rem 0.5rem"}
                              color="#FF9B9B !important"
                            >
                              -78.75
                            </Td>
                          </Tr>
                          <Tr>
                            <Td padding={"0.5rem"} paddingLeft="0">
                              wagmi-dev.eth
                            </Td>
                            <Td padding={"0.5rem 0.5rem"}>USDC</Td>
                            <Td
                              padding={"0.5rem 0.5rem"}
                              color="#A2FF93 !important"
                            >
                              +25.00
                            </Td>
                          </Tr>
                          <Tr>
                            <Td padding={"0.5rem"} paddingLeft="0">
                              austingriffith.eth
                            </Td>
                            <Td padding={"0.5rem 0.5rem"}>USDC</Td>
                            <Td
                              padding={"0.5rem 0.5rem"}
                              color="#A2FF93 !important"
                            >
                              +25.00
                            </Td>
                          </Tr>
                          <Tr>
                            <Td padding={"0.5rem"} paddingLeft="0">
                              ricmoo.firefly.eth
                            </Td>
                            <Td padding={"0.5rem 0.5rem"}>USDC</Td>
                            <Td
                              padding={"0.5rem 0.5rem"}
                              color="#A2FF93 !important"
                            >
                              +25.00
                            </Td>
                          </Tr>
                          <Tr>
                            <Td padding={"0.5rem"} paddingLeft="0">
                              Proxy
                            </Td>
                            <Td padding={"0.5rem 0.5rem"}>USDC</Td>
                            <Td
                              padding={"0.5rem 0.5rem"}
                              color="#A2FF93 !important"
                            >
                              +3.75
                            </Td>
                          </Tr>
                        </Tbody>
                      </Table>
                    </TableContainer>
                  </VStack>
                </VStack>
                <VStack className={styles.detailRightSection}>
                  <VStack className={styles.tokenTransferSection}>
                    <Text className={styles.detailHeader}>Token Transfers</Text>
                    <Box className={styles.tokenTableContainer}>
                      <TableContainer>
                        <Table variant="unstyled">
                          <Thead>
                            <Tr className={styles.transactionHeaderContainer}>
                              <Th className={styles.transactionHeaderLabel}>
                                Sender
                              </Th>
                              <Th className={styles.transactionHeaderLabel}>
                                Token
                              </Th>
                              <Th className={styles.transactionHeaderLabel}>
                                Amount
                              </Th>
                              <Th className={styles.transactionHeaderLabel}>
                                Recipient
                              </Th>
                            </Tr>
                          </Thead>
                          <Tbody>
                            {tokenTransferData.map(
                              ({ from, token, amount, dest }, idx) => (
                                <Tr key={idx}>
                                  <Td padding={"0.5rem 1.5rem"}>{from}</Td>
                                  <Td padding={"0.5rem 1.5rem"}>{token}</Td>
                                  <Td padding={"0.5rem 1.5rem"}>{amount}</Td>
                                  <Td padding={"0.5rem 1.5rem"}>{dest}</Td>
                                </Tr>
                              )
                            )}
                          </Tbody>
                        </Table>
                      </TableContainer>
                    </Box>
                  </VStack>
                  <VStack
                    className={styles.tokenTransferSection}
                    paddingTop="0.5rem"
                  >
                    <Text className={styles.detailHeader} paddingBottom=".5rem">
                      Execution Trace
                    </Text>
                    <VStack className={styles.tokenTransferSection}>
                      <Text className={styles.executionTraceRow}>
                        [130777]: [sender]
                        0xa109bc6f8292b52a6f89e8fc5eabf2947ec31bfas
                      </Text>
                      <HStack paddingLeft="1rem">
                        <Box className={styles.divider1}></Box>
                        <VStack paddingLeft="1rem">
                          <Text className={styles.executionTraceRow}>
                            {`[108609]: [receiver] BulkCheckout.donate(_donations=[ (arg_1=0x000000000000000000000000a0b86991c6218b36c1d19d4a2e9eb0ce3606eb48, ... arg_13=0x000000000000000000000000a0b86991c6218b36c1d19d4a2e9eb0ce3606eb48)]) => ()`}
                          </Text>
                          <HStack paddingLeft="1rem">
                            <Box className={styles.divider2}></Box>
                            <VStack paddingLeft="1rem">
                              <Text className={styles.executionTraceRow}>
                                {
                                  "[27597]: (delegate) USDC[.transferFrom](from=[sender] 0xa109bc6f8292b52a6f89e8fc5eabf2947ec31bfa, to=wagmi-dev.eth, value=25000000.0) => (True)"
                                }
                              </Text>
                              <Text className={styles.executionTraceRow}>
                                {
                                  "[11997]: (delegate) USDC[.transferFrom](from=[sender] 0xa109bc6f8292b52a6f89e8fc5eabf2947ec31bfa, to=austingriffith.eth, value=25000000.0) => (True)"
                                }
                              </Text>
                              <Text className={styles.executionTraceRow}>
                                {
                                  "[11997]: (delegate) USDC[.transferFrom](from=[sender] 0xa109bc6f8292b52a6f89e8fc5eabf2947ec31bfa, to=ricmoo.firefly.eth, value=25000000.0) => (True)"
                                }
                              </Text>
                              <Text className={styles.executionTraceRow}>
                                {
                                  "[11997]: (delegate) USDC[.transferFrom](from=[sender] 0xa109bc6f8292b52a6f89e8fc5eabf2947ec31bfa, to=Proxy, value=3750000.0) => (True)"
                                }
                              </Text>
                            </VStack>
                          </HStack>
                        </VStack>
                      </HStack>
                    </VStack>
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

export default withTransition(Transaction);
