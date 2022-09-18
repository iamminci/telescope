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
import { useRouter } from "next/router";
import {
  abridgeAddress,
  abridgeMethod,
  convertCamelCaseToWords,
  removeWhitespaceAroundString,
} from "@utils/helpers";
import { formatUnits, formatEther, parseEther } from "ethers/lib/utils";
import Transaction from "@components/Transaction";
import { Network, Alchemy } from "alchemy-sdk";

const settings = {
  apiKey: "ciWZ5nOwLHUnAsHaCH7Flrs4lIfMVABb", // Replace with your Alchemy API Key.
  network: Network.ETH_MAINNET, // Replace with your network.
};
const alchemy = new Alchemy(settings);

const tokenWhitelist: { [key: string]: any } = {
  "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48": "USDC",
  "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2": "WETH",
  "0x6b175474e89094c44da98b954eedeac495271d0f": "DAI",
  "0xc18360217d8f7ab5e7c516566761ea12ce7f9d72": "ENS",
};

// WHITELIST BINANCE COINBASE PROPERLY
const addressWhitelist: { [key: string]: any } = {
  "0x7d655c57f71464b6f83811c55d84009cd9f5221c": "Gitcoin: Bulk Checkout",
  "0xa6b71e26c5e0845f74c812102ca7114b6a896ab2": "Gnosis Safe: 1.3.0",
  "0x7d2768de32b0b80b7a3454c06bdac94a69ddc7a9": "Aave V3: Lending Pool",
  "0x283af0b28c62c092c9727f1ee09c02ca627eb7f5": "ENS Registrar",
  "0x6170b3c3a54c3d8c854934cbc314ed479b2b29a3": "Zora V3",
  "0x00000000006c3852cbef3e08e8df289169ede581": "Seaport 1.1",
  "0x68b3465833fb72a70ecdf485e0e4c7bd8665fc45": "Uniswap V3: Router",
  "0x881d40237659c251811cec9c364ef91dc08d300c": "Metamask: Swap Router",
  "0xa0c68c638235ee32657e8f720a23cec1bfc77c77": "Polygon Bridge",
  "0xd551234ae421e3bcba99a0da6d736074f22192ff": "Binance",
  "0xddfabcdc4d8ffc6d5beaf154f18b778f892a0740": "Coinbase",
  "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2": "Token: WETH",
  "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48": "Token: USDC",
  "0xd90e2f925da726b50c4ed8d0fb90ad053324f31b": "Tornado Cash",
};

const tokenData = [
  {
    name: "USDC",
    contractAddress: "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48",
    logo: "https://static.alchemyapi.io/images/assets/3408.png",
    tokenBalance: 1457.66,
    fiatBalance: 1457.66,
  },
  {
    name: "WETH",
    contractAddress: "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2",
    logo: "https://static.alchemyapi.io/images/assets/2396.png",
    tokenBalance: 0.31,
    fiatBalance: 462.93,
  },
  {
    name: "ETH",
    contractAddress: "",
    logo: "/eth.png",
    tokenBalance: 1.56,
    fiatBalance: 2329.18,
  },
  {
    name: "DAI",
    contractAddress: "0x6b175474e89094c44da98b954eedeac495271d0f",
    logo: "https://static.alchemyapi.io/images/assets/4943.png",
    tokenBalance: 903.42,
    fiatBalance: 903.47,
  },
  {
    name: "ENS",
    contractAddress: "0xc18360217d8f7ab5e7c516566761ea12ce7f9d72",
    logo: "https://static.alchemyapi.io/images/assets/13855.png",
    tokenBalance: 26.26,
    fiatBalance: 392.12,
  },
];

const sortedTokenData = tokenData.sort((a, b) => b.fiatBalance - a.fiatBalance);

const aggregateBalance = tokenData.reduce(
  (acc, token) => acc + token.fiatBalance,
  0
);

const gradientArray = new Gradient()
  .setColorGradient("#A9480C", "#FBC3A1")
  .setMidpoint(5)
  .getColors();

const data = tokenData.map((token: any, idx: number) => {
  return {
    label: token.name,
    value: token.fiatBalance,
    color: gradientArray[idx],
  };
});

function Address() {
  const [showZeroValueTxns, setShowZeroValueTxns] = useState(false);
  const [transactions, setTransactions] = useState<{ [key: string]: any }>({});
  const [transactionsMap, setTransactionsMap] = useState<{
    [key: string]: any;
  }>({});
  const [tokenBalances, setTokenBalances] = useState<any[]>([]);
  const router = useRouter();
  const { address, txn } = router.query;

  function handleSwitchChange() {
    setShowZeroValueTxns(!showZeroValueTxns);
  }

  function handleGraphViewNavigation() {
    router.push(`/graph`);
  }

  function processTransactions(data: any) {
    const processedTxns: { [key: string]: any } = {};
    const processedTxnsFlat: { [key: string]: any } = {};
    console.log(data);

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
    async function fetchTokenBalances() {
      if (!address) return;
      const etherBalance = await alchemy.core.getBalance(address as string);
      console.log(formatEther(etherBalance));
      const { tokenBalances: balances } = await alchemy.core.getTokenBalances(
        address as string,
        "DEFAULT_TOKENS" as any
      );

      const filterWithBalances: any[] = balances.filter(
        (token: any) => Number(token.tokenBalance) > 0
      );

      filterWithBalances.forEach((token) => {
        if (
          token.contractAddress === "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48"
        ) {
          token.formattedBalance = formatUnits(token.tokenBalance, 6);
        } else {
          token.formattedBalance = formatUnits(token.tokenBalance, 18);
        }
        console.log("token.formattedBalance: ", token.formattedBalance);
      });

      filterWithBalances.push({
        contractAddress: "",
        tokenBalance: formatEther(etherBalance),
      });

      console.log("filterWithBalances", filterWithBalances);

      setTokenBalances(filterWithBalances);
    }
    processTransactions(txnData);
    fetchTokenBalances();
  }, [address]);

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
        <Text>
          Sorry, there are too many requests being sent at the moment. Please
          try again later.
        </Text>
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
            <Text
              className={styles.address}
            >{`${address} (iamminci.eth)`}</Text>
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
              <Text
                className={styles.fiatBalance}
              >{`$${aggregateBalance.toFixed(2)}`}</Text>
              <Text className={styles.ethBalance}>3.82 ETH</Text>
            </VStack>
            <Box className={styles.pieChartContainer} w="300px">
              <PieChart data={data} />
            </Box>
            <Box className={styles.tokenTableContainer}>
              <TableContainer>
                <Table variant="unstyled">
                  <Tbody>
                    {sortedTokenData.map(
                      ({
                        name,
                        contractAddress,
                        logo,
                        tokenBalance,
                        fiatBalance,
                      }) => (
                        <Tr key={contractAddress}>
                          <Td padding={"0.5rem 0.2rem"}>
                            {" "}
                            <Image
                              src={logo}
                              alt="token logo"
                              className={styles.tokenLogo}
                            ></Image>
                          </Td>
                          <Td>{name}</Td>
                          <Td>{tokenBalance}</Td>
                          <Td>${fiatBalance}</Td>
                        </Tr>
                      )
                    )}
                  </Tbody>
                </Table>
              </TableContainer>
            </Box>
            {/* <VStack className={styles.tokenContainer}>
              {sortedTokenData.map(
                ({
                  name,
                  contractAddress,
                  logo,
                  tokenBalance,
                  fiatBalance,
                }) => (
                  <HStack
                    key={contractAddress}
                    className={styles.tokenRowContainer}
                  >
                    <Image
                      src={logo}
                      alt="token logo"
                      className={styles.tokenLogo}
                    ></Image>
                    <Text>{name}</Text>
                    <Text>{tokenBalance}</Text>
                    <Text>${fiatBalance}</Text>
                  </HStack>
                )
              )}
            </VStack> */}
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
                          .sort((a, b) => b.timeStamp - a.timeStamp)
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
                            ) => (
                              <Tr
                                key={hash}
                                onClick={() => {
                                  router.push(
                                    `/address/${address}?txn=${hash}`
                                  );
                                }}
                                className={styles.transactionRowContainer}
                              >
                                <Td>{idx === 0 ? formattedDate : ""}</Td>
                                <Td>{formattedTime}</Td>
                                <Td>
                                  {displayName
                                    ? abridgeMethod(displayName)
                                    : abridgeAddress(displayAddress)}
                                </Td>
                                <Td>{abridgeMethod(formattedFunctionName)}</Td>

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
        </HStack>
      </VStack>
      <Box className={styles.ellipseOne}></Box>
      <Box className={styles.ellipseTwo}></Box>

      <EthereumLogo />
    </div>
  );
}

export default withTransition(Address);
