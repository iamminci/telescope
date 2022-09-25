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
  Tr,
  Th,
  Td,
  TableContainer,
  Button,
} from "@chakra-ui/react";
import EthereumLogo from "@components/EthereumLogo";
import Navbar from "@components/Navbar";
import withTransition from "@components/withTransition";
import styles from "@styles/Address.module.css";
import PieChart from "@components/PieChart";
import { useEffect, useState } from "react";
import txnData from "@data/transactions.json";
import Gradient from "javascript-color-gradient";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CustomToast from "@components/CustomToast";
import { useRouter } from "next/router";
import {
  abridgeAddress,
  abridgeMethod,
  convertCamelCaseToWords,
  removeWhitespaceAroundString,
} from "@utils/helpers";
import {
  formatUnits,
  formatEther,
  parseEther,
  isAddress,
} from "ethers/lib/utils";
import Transaction from "@components/Transaction";
import { Network, Alchemy } from "alchemy-sdk";
import { Tooltip } from "@chakra-ui/react";
import { provider } from "@utils/provider";
import { addressWhitelist } from "@data/addressWhitelist";

const settings = {
  apiKey: "ciWZ5nOwLHUnAsHaCH7Flrs4lIfMVABb", // Replace with your Alchemy API Key.
  network: Network.ETH_MAINNET, // Replace with your network.
};
const alchemy = new Alchemy(settings);

const gradientArray = new Gradient()
  .setColorGradient("#A9480C", "#FBC3A1")
  .setMidpoint(5)
  .getColors();

function handleClickCell(hash: string) {
  toast(<CustomToast txnHash={hash} />, {
    position: "bottom-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: false,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  });
}

function Address() {
  const [showZeroValueTxns, setShowZeroValueTxns] = useState(false);
  const [transactions, setTransactions] = useState<{ [key: string]: any }>({});
  const [ENS, setENS] = useState("");
  const [transactionsMap, setTransactionsMap] = useState<{
    [key: string]: any;
  }>({});
  const [tokenBalances, setTokenBalances] = useState<any[]>([]);
  const [showApprove, setShowApprove] = useState(false);
  const router = useRouter();
  const { address, txn } = router.query;

  function handleSwitchChange() {
    setShowApprove(!showApprove);
  }

  function handleGraphViewNavigation() {
    router.push(`/graph/0xa109BC6F8292B52A6f89e8Fc5EABF2947EC31bFA`);
  }

  function processTransactions(data: any) {
    const processedTxns: { [key: string]: any } = {};
    const processedTxnsFlat: { [key: string]: any } = {};

    for (let i = 0; i < data.length; i++) {
      const txn = data[i];

      txn.displayAddress = txn.to;

      if (txn.displayAddress in addressWhitelist) {
        txn.displayName = addressWhitelist[txn.displayAddress];
      }

      if (!("timeStamp" in txn)) {
        const time = txn.metadata.blockTimestamp;
        const date = new Date(time);
        const newTimestamp = date.getTime() / 1000;
        txn.timeStamp = newTimestamp;
      }

      let formattedFunctionName = !txn.functionName
        ? "Transfer"
        : txn.functionName;

      if (txn.category === "erc20") {
        formattedFunctionName = "Transfer (ERC20)";
      }

      if (txn.category === "erc721") {
        formattedFunctionName = "Transfer (NFT)";
        txn.formattedValue = "1";
      }

      if (!formattedFunctionName.startsWith("Transfer")) {
        const tempName = formattedFunctionName.split("(")[0];
        const tempNameCapitalized =
          tempName.charAt(0).toUpperCase() + tempName.slice(1);
        const tempNameWords = convertCamelCaseToWords(tempNameCapitalized);
        formattedFunctionName = removeWhitespaceAroundString(tempNameWords);
      }

      txn.formattedFunctionName = formattedFunctionName;

      if (typeof txn.value === "string") {
        txn.formattedValue = formatEther(txn.value).toString().substring(0, 5);
      }

      if (typeof txn.value === "number") {
        txn.formattedValue = txn.value.toString().substring(0, 5);
      }

      const date = new Date(txn.timeStamp * 1000);
      const dateStr = date.toDateString();

      const dateArr = dateStr.split(" ");

      const month = dateArr[1];
      const day = dateArr[2];
      const year = dateArr[3];

      const formattedDate = `${month} ${day}, ${year}`;

      const formattedTime = date.toLocaleTimeString();

      txn.formattedDate = formattedDate;
      txn.formattedTime = formattedTime;

      if (processedTxns[formattedDate]) {
        processedTxns[formattedDate].push(txn);
      } else {
        processedTxns[formattedDate] = [txn];
      }
      processedTxnsFlat[txn.hash] = txn;
    }
    setTransactions(processedTxns);
    setTransactionsMap(processedTxnsFlat);
  }

  useEffect(() => {
    async function fetchPrimaryENS() {
      if (!isAddress(address as string)) return;
      const primaryENS = await provider.lookupAddress(address as string);
      setENS(primaryENS);
    }

    async function fetchCovalentBalances() {
      if (!isAddress(address as string)) return;
      const url = `https://api.covalenthq.com/v1/1/address/${address}/balances_v2/?key=ckey_7531eb22908347afabcae0d8585`;
      const response = await fetch(url);
      const data = await response.json();
      const tokenBalances = data.data.items;
      for (let i = 0; i < tokenBalances.length; i++) {
        const token = tokenBalances[i];
        token.formattedBalance = formatUnits(
          token.balance,
          token.contract_decimals
        );
      }
      const filteredTokenBalance = tokenBalances.filter(
        (token: any) => token.quote > 0.1
      );
      setTokenBalances(filteredTokenBalance);
    }

    async function fetchTokenBalances() {
      if (!isAddress(address as string)) return;

      // ETHER BALANCE
      const etherBalance = await alchemy.core.getBalance(address as string);

      // ERC20 BALANCES
      const { tokenBalances: ERC20Balances } =
        await alchemy.core.getTokenBalances(
          address as string,
          "DEFAULT_TOKENS" as any
        );

      const filterWithBalances: any[] = ERC20Balances.filter(
        (token: any) => Number(token.tokenBalance) > 0
      );

      // PROCESS ERC20 BALANCES W METADATA
      for (let i = 0; i < filterWithBalances.length; i++) {
        const token = filterWithBalances[i];
        const { decimals, logo, name, symbol } =
          await alchemy.core.getTokenMetadata(token.contractAddress);
        token.formattedBalance = formatUnits(token.tokenBalance, decimals);
        token.decimals = decimals;
        token.logo = logo;
        token.name = name;
        token.symbol = symbol;
      }

      // ADD ETHER BALANCE INTO LIST
      filterWithBalances.push({
        contractAddress: "",
        name: "Ethereum",
        symbol: "ETH",
        logo: "/eth.png",
        tokenBalance: etherBalance,
        formattedBalance: formatEther(etherBalance),
      });

      // TODO: sort by fiat balance
      filterWithBalances.sort((a: any, b: any) => {
        return Number(b.tokenBalance) - Number(a.tokenBalance);
      });

      // console.log("filterWithBalances", filterWithBalances);

      setTokenBalances(filterWithBalances);
    }
    processTransactions(txnData);
    fetchPrimaryENS();
    // fetchTokenBalances();
    fetchCovalentBalances();
  }, [address]);

  const chartData = tokenBalances.map((token: any, idx: number) => {
    return {
      label: token.contract_ticker_symbol,
      value: Number(token.quote),
      color: gradientArray[idx],
    };
  });

  if (address !== "0xa109BC6F8292B52A6f89e8Fc5EABF2947EC31bFA") {
    return (
      <div
        className={styles.container}
        style={{
          display: "flex",
          height: "90vh",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Navbar />
        <VStack>
          <Text>
            Sorry, the free tier APIs are getting rate-limited. Please try again
            later.
          </Text>
          <Text>
            In the meantime, you can try out a demo flow by clicking here:
          </Text>
          <Box h=".5rem"></Box>
          <Button
            className={styles.graphViewButton}
            onClick={() =>
              router.push(`/address/0xa109BC6F8292B52A6f89e8Fc5EABF2947EC31bFA`)
            }
          >
            Go to Demo Flow
          </Button>
        </VStack>
      </div>
    );
  }

  if (!!txn) {
    return <Transaction transaction={transactionsMap[txn as string]} />;
  }

  return (
    <div className={styles.container}>
      <Navbar />
      <VStack className={styles.contentContainer}>
        <HStack className={styles.titleContainer}>
          <HStack>
            <Text className={styles.header}>Address</Text>
            <Text className={styles.address}>
              {ENS ? `${ENS} (${address})` : address}
            </Text>
          </HStack>
          <Button
            className={styles.graphViewButton}
            onClick={handleGraphViewNavigation}
          >
            <Text>Enter Graph View</Text>
          </Button>
        </HStack>
        <Box className={styles.titleDivider} />
        <HStack w="100%" h="100%">
          <VStack className={styles.overviewContainer}>
            <VStack className={styles.overviewHeaderContainer}>
              <Text className={styles.header}>Total Balance</Text>
              <Text className={styles.fiatBalance}>TODO: $5545.36</Text>
              <Text className={styles.ethBalance}>TODO: 3.82 ETH</Text>
            </VStack>
            <Box className={styles.pieChartContainer} w="300px">
              <PieChart data={chartData} />
            </Box>
            <Box className={styles.tokenTableContainer}>
              <TableContainer>
                <Table variant="unstyled">
                  <Tbody>
                    {tokenBalances.map(
                      ({
                        contract_ticker_symbol,
                        contract_address,
                        logo_url,
                        quote,
                        formattedBalance,
                      }) => (
                        <Tr key={contract_address}>
                          <Td padding={"0.5rem 0.2rem"}>
                            {" "}
                            <Image
                              src={logo_url}
                              alt="token logo"
                              className={styles.tokenLogo}
                            ></Image>
                          </Td>

                          <Td>{contract_ticker_symbol}</Td>

                          <Td>{Number(formattedBalance).toFixed(2)}</Td>
                          <Td>${quote.toFixed(2)}</Td>
                        </Tr>
                      )
                    )}
                  </Tbody>
                </Table>
              </TableContainer>
            </Box>
          </VStack>
          <Box className={styles.contentDivider} />
          <VStack className={styles.transactionContainer}>
            <VStack className={styles.transactionContentContainer}>
              <HStack className={styles.transactionTitleContainer}>
                <Text className={styles.header}>Transactions</Text>
                <HStack>
                  <Switch
                    colorScheme="orange"
                    onChange={() => {}}
                    className={
                      showZeroValueTxns ? styles.isSwitchOn : styles.isSwitchOff
                    }
                  />
                  <Text>Show Zero Value Transactions</Text>
                </HStack>
              </HStack>
              <Box className={styles.tableContainer}>
                <TableContainer>
                  <Table variant="unstyled">
                    <Thead>
                      <Tr className={styles.transactionHeaderContainer}>
                        <Th></Th>
                        <Th className={styles.transactionHeaderLabel}>Time</Th>
                        <Th className={styles.transactionHeaderLabel}>
                          Address
                        </Th>
                        <Th className={styles.transactionHeaderLabel}>
                          Method
                        </Th>
                        <Th className={styles.transactionHeaderLabel}>Value</Th>
                        <Th className={styles.transactionHeaderLabel}>
                          Status
                        </Th>
                        {/* <Th className={styles.transactionHeaderLabel}>Type</Th> */}
                      </Tr>
                    </Thead>
                    <Tbody>
                      {Object.keys(transactions).map((key) =>
                        transactions[key]
                          .sort((a: any, b: any) => b.timeStamp - a.timeStamp)
                          .map(
                            (
                              {
                                formattedDate,
                                formattedTime,
                                formattedFunctionName,
                                displayAddress,
                                displayName,
                                formattedValue,
                                hash,
                                asset,
                                txreceipt_status,
                              }: any,
                              idx: number
                            ) =>
                              (showApprove ||
                                formattedFunctionName !== "Approve") && (
                                <Tr
                                  key={hash}
                                  onClick={() => {
                                    if (
                                      hash ===
                                      "0x29e6b5173a1009f8213ac5238f749a8e8a898b752d9221e6543342898caeadfb"
                                    ) {
                                      router.push(
                                        `/address/${address}?txn=${hash}`
                                      );
                                    } else {
                                      handleClickCell(hash);
                                    }
                                  }}
                                  className={styles.transactionRowContainer}
                                >
                                  <Td>{idx === 0 ? formattedDate : ""}</Td>
                                  <Td>{formattedTime}</Td>
                                  <Tooltip
                                    label={displayName ?? displayAddress}
                                    aria-label="A tooltip"
                                  >
                                    <Td>
                                      {displayName
                                        ? abridgeMethod(displayName)
                                        : abridgeAddress(displayAddress)}
                                    </Td>
                                  </Tooltip>
                                  <Td>
                                    {abridgeMethod(formattedFunctionName)}
                                  </Td>
                                  <Td>
                                    {formattedFunctionName !== "Approve"
                                      ? `-${formattedValue} ${asset ?? "ETH"}`
                                      : ""}
                                  </Td>
                                  <Td>
                                    {txreceipt_status === "0"
                                      ? "Failed"
                                      : "Success"}
                                  </Td>
                                  {/* <Td>Ether</Td> */}
                                </Tr>
                              )
                          )
                      )}
                    </Tbody>
                  </Table>
                </TableContainer>
              </Box>
            </VStack>
            <Box className={styles.ellipseThree}></Box>
          </VStack>
          <ToastContainer />
        </HStack>
      </VStack>
      <Box className={styles.ellipseOne}></Box>
      <Box className={styles.ellipseTwo}></Box>

      <EthereumLogo />
    </div>
  );
}

export default withTransition(Address);
