import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  IconButton,
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
import { addressWhitelist } from "@data/addressWhitelist";
import styles from "@styles/Navbar.module.css";
import {
  abridgeAddress,
  abridgeMethod,
  convertCamelCaseToWords,
  removeWhitespaceAroundString,
} from "@utils/helpers";
import { formatEther } from "ethers/lib/utils";
import Link from "next/link";
import { useEffect, useState } from "react";

type SidebarProps = {
  isOpen: boolean;
  onClose: () => void;
  isHover: boolean;
};

const txnData = [
  {
    blockNumber: "15555311",
    timeStamp: "1662881940",
    hash: "0x2b0f3348e7587beea18bbdd7fe17962959ca1aaec7d96e6fc1f86c27b84a967a",
    nonce: "38",
    blockHash:
      "0x53c44ba41e08b790d49f388f85cbb9a02b65b7d1bf3244c7260ec4312bbc1900",
    transactionIndex: "149",
    from: "0xa109bc6f8292b52a6f89e8fc5eabf2947ec31bfa",
    to: "0x68b3465833fb72a70ecdf485e0e4c7bd8665fc45",
    value: "789323131232112913",
    gas: "203943",
    gasPrice: "5896567336",
    isError: "0",
    txreceipt_status: "1",
    input:
      "0x5ae401dc000000000000000000000000000000000000000000000000000000006326235b000000000000000000000000000000000000000000000000000000000000004000000000000000000000000000000000000000000000000000000000000000020000000000000000000000000000000000000000000000000000000000000040000000000000000000000000000000000000000000000000000000000000014000000000000000000000000000000000000000000000000000000000000000c4f3995c67000000000000000000000000a0b86991c6218b36c1d19d4a2e9eb0ce3606eb480000000000000000000000000000000000000000000000000000000000002710000000000000000000000000000000000000000000000000000000006326280b000000000000000000000000000000000000000000000000000000000000001b8b3b1cef9972278647dd9cc13a62d890ff04bceeddd81a76b3982b90b7a12dbc41db3ebbe554bb9881fb042cb513d994e50a05d018ff729a468bf22d1960ee700000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000e404e45aaf000000000000000000000000a0b86991c6218b36c1d19d4a2e9eb0ce3606eb48000000000000000000000000c18360217d8f7ab5e7c516566761ea12ce7f9d720000000000000000000000000000000000000000000000000000000000000bb8000000000000000000000000a109bc6f8292b52a6f89e8fc5eabf2947ec31bfa00000000000000000000000000000000000000000000000000000000000027100000000000000000000000000000000000000000000000000001f0b5bb55a223000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000",
    contractAddress: "",
    cumulativeGasUsed: "12499251",
    gasUsed: "146878",
    confirmations: "245",
    methodId: "0x5ae401dc",
    functionName: "multicall(uint256 deadline, bytes[] data)",
  },
  {
    blockNumber: "15555135",
    timeStamp: "1662881940",
    hash: "0x7d235cf7acf344ac9e80810392eb0e66ff2f9c1531f51429a78f8e9146fef0af",
    nonce: "18",
    blockHash:
      "0xff1bf4b36d17bb947b4ebe7ba5942ae1364b43e8332213c038219e1c67b8aadd",
    transactionIndex: "71",
    from: "0xa109bc6f8292b52a6f89e8fc5eabf2947ec31bfa",
    to: "0x68b3465833fb72a70ecdf485e0e4c7bd8665fc45",
    value: "789323131232112913",
    gas: "261543",
    gasPrice: "7482361729",
    isError: "0",
    txreceipt_status: "1",
    input:
      "0x5ae401dc0000000000000000000000000000000000000000000000000000000063261adf0000000000000000000000000000000000000000000000000000000000000040000000000000000000000000000000000000000000000000000000000000000300000000000000000000000000000000000000000000000000000000000000600000000000000000000000000000000000000000000000000000000000000160000000000000000000000000000000000000000000000000000000000000028000000000000000000000000000000000000000000000000000000000000000c4f3995c67000000000000000000000000a0b86991c6218b36c1d19d4a2e9eb0ce3606eb480000000000000000000000000000000000000000000000000000000005f5e1000000000000000000000000000000000000000000000000000000000063261f8f000000000000000000000000000000000000000000000000000000000000001bb79f79edc1415c0cfe83cccfe4b5812d97df072d57004f730a1ee84abed675ed3f673a39f4fa75d784fef2c53142fd70b67831018faa6faa29b23e439e101d340000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000e404e45aaf000000000000000000000000a0b86991c6218b36c1d19d4a2e9eb0ce3606eb48000000000000000000000000c02aaa39b223fe8d0a0e5c4f27ead9083c756cc200000000000000000000000000000000000000000000000000000000000001f400000000000000000000000000000000000000000000000000000000000000020000000000000000000000000000000000000000000000000000000005f5e10000000000000000000000000000000000000000000000000000f03fec659cba94000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000004449404b7c00000000000000000000000000000000000000000000000000f03fec659cba94000000000000000000000000a109bc6f8292b52a6f89e8fc5eabf2947ec31bfa00000000000000000000000000000000000000000000000000000000",
    contractAddress: "",
    cumulativeGasUsed: "8961866",
    gasUsed: "176981",
    confirmations: "421",
    methodId: "0x5ae401dc",
    functionName: "transfer(uint256 deadline, bytes[] data)",
  },
  {
    blockNumber: "15555305",
    timeStamp: "1662795540",
    hash: "0x208b0dc009747cec5dd517a8842feec404a39114f7069c00d2e09977d39413e9",
    nonce: "37",
    blockHash:
      "0x4aa820c8c1ab38637fba141d15ba1f1db6b687add332d4fe1365774aa211a82d",
    transactionIndex: "76",
    from: "0xa109bc6f8292b52a6f89e8fc5eabf2947ec31bfa",
    to: "0x68b3465833fb72a70ecdf485e0e4c7bd8665fc45",
    value: "1293123131232112913",
    gas: "157398",
    gasPrice: "5861367262",
    isError: "0",
    txreceipt_status: "1",
    input:
      "0x5ae401dc000000000000000000000000000000000000000000000000000000006326230700000000000000000000000000000000000000000000000000000000000000400000000000000000000000000000000000000000000000000000000000000001000000000000000000000000000000000000000000000000000000000000002000000000000000000000000000000000000000000000000000000000000000e404e45aaf000000000000000000000000c02aaa39b223fe8d0a0e5c4f27ead9083c756cc20000000000000000000000006b175474e89094c44da98b954eedeac495271d0f00000000000000000000000000000000000000000000000000000000000001f4000000000000000000000000a109bc6f8292b52a6f89e8fc5eabf2947ec31bfa00000000000000000000000000000000000000000000000000038d7ea4c680000000000000000000000000000000000000000000000000001434f2ea1d898f5c000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000",
    contractAddress: "",
    cumulativeGasUsed: "6794827",
    gasUsed: "107264",
    confirmations: "251",
    methodId: "0x5ae401dc",
    functionName: "multicall(uint256 deadline, bytes[] data)",
  },

  {
    blockNumber: "15555135",
    timeStamp: "1662222540",
    hash: "0x7d235cf7acf344ac9e80810392eb0e66ff2f9c1531f51429a78f8e9146fef0af",
    nonce: "18",
    blockHash:
      "0xff1bf4b36d17bb947b4ebe7ba5942ae1364b43e8332213c038219e1c67b8aadd",
    transactionIndex: "71",
    from: "0xa109bc6f8292b52a6f89e8fc5eabf2947ec31bfa",
    to: "0x68b3465833fb72a70ecdf485e0e4c7bd8665fc45",
    value: "69853131232112913",
    gas: "261543",
    gasPrice: "7482361729",
    isError: "0",
    txreceipt_status: "1",
    input:
      "0x5ae401dc0000000000000000000000000000000000000000000000000000000063261adf0000000000000000000000000000000000000000000000000000000000000040000000000000000000000000000000000000000000000000000000000000000300000000000000000000000000000000000000000000000000000000000000600000000000000000000000000000000000000000000000000000000000000160000000000000000000000000000000000000000000000000000000000000028000000000000000000000000000000000000000000000000000000000000000c4f3995c67000000000000000000000000a0b86991c6218b36c1d19d4a2e9eb0ce3606eb480000000000000000000000000000000000000000000000000000000005f5e1000000000000000000000000000000000000000000000000000000000063261f8f000000000000000000000000000000000000000000000000000000000000001bb79f79edc1415c0cfe83cccfe4b5812d97df072d57004f730a1ee84abed675ed3f673a39f4fa75d784fef2c53142fd70b67831018faa6faa29b23e439e101d340000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000e404e45aaf000000000000000000000000a0b86991c6218b36c1d19d4a2e9eb0ce3606eb48000000000000000000000000c02aaa39b223fe8d0a0e5c4f27ead9083c756cc200000000000000000000000000000000000000000000000000000000000001f400000000000000000000000000000000000000000000000000000000000000020000000000000000000000000000000000000000000000000000000005f5e10000000000000000000000000000000000000000000000000000f03fec659cba94000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000004449404b7c00000000000000000000000000000000000000000000000000f03fec659cba94000000000000000000000000a109bc6f8292b52a6f89e8fc5eabf2947ec31bfa00000000000000000000000000000000000000000000000000000000",
    contractAddress: "",
    cumulativeGasUsed: "8961866",
    gasUsed: "176981",
    confirmations: "421",
    methodId: "0x5ae401dc",
    functionName: "multicall(uint256 deadline, bytes[] data)",
  },
  {
    blockNumber: "15555305",
    timeStamp: "1662222540",
    hash: "0x208b0dc009747cec5dd517a8842feec404a39114f7069c00d2e09977d39413e9",
    nonce: "37",
    blockHash:
      "0x4aa820c8c1ab38637fba141d15ba1f1db6b687add332d4fe1365774aa211a82d",
    transactionIndex: "76",
    from: "0xa109bc6f8292b52a6f89e8fc5eabf2947ec31bfa",
    to: "0x68b3465833fb72a70ecdf485e0e4c7bd8665fc45",
    value: "69853131232112913",
    gas: "157398",
    gasPrice: "5861367262",
    isError: "0",
    txreceipt_status: "1",
    input:
      "0x5ae401dc000000000000000000000000000000000000000000000000000000006326230700000000000000000000000000000000000000000000000000000000000000400000000000000000000000000000000000000000000000000000000000000001000000000000000000000000000000000000000000000000000000000000002000000000000000000000000000000000000000000000000000000000000000e404e45aaf000000000000000000000000c02aaa39b223fe8d0a0e5c4f27ead9083c756cc20000000000000000000000006b175474e89094c44da98b954eedeac495271d0f00000000000000000000000000000000000000000000000000000000000001f4000000000000000000000000a109bc6f8292b52a6f89e8fc5eabf2947ec31bfa00000000000000000000000000000000000000000000000000038d7ea4c680000000000000000000000000000000000000000000000000001434f2ea1d898f5c000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000",
    contractAddress: "",
    cumulativeGasUsed: "6794827",
    gasUsed: "107264",
    confirmations: "251",
    methodId: "0x5ae401dc",
    functionName: "transfer(uint256 deadline, bytes[] data)",
  },
  {
    blockNumber: "15555311",
    timeStamp: "1662795540",
    hash: "0x2b0f3348e7587beea18bbdd7fe17962959ca1aaec7d96e6fc1f86c27b84a967a",
    nonce: "38",
    blockHash:
      "0x53c44ba41e08b790d49f388f85cbb9a02b65b7d1bf3244c7260ec4312bbc1900",
    transactionIndex: "149",
    from: "0xa109bc6f8292b52a6f89e8fc5eabf2947ec31bfa",
    to: "0x68b3465833fb72a70ecdf485e0e4c7bd8665fc45",
    value: "1293123131232112913",
    gas: "203943",
    gasPrice: "5896567336",
    isError: "0",
    txreceipt_status: "1",
    input:
      "0x5ae401dc000000000000000000000000000000000000000000000000000000006326235b000000000000000000000000000000000000000000000000000000000000004000000000000000000000000000000000000000000000000000000000000000020000000000000000000000000000000000000000000000000000000000000040000000000000000000000000000000000000000000000000000000000000014000000000000000000000000000000000000000000000000000000000000000c4f3995c67000000000000000000000000a0b86991c6218b36c1d19d4a2e9eb0ce3606eb480000000000000000000000000000000000000000000000000000000000002710000000000000000000000000000000000000000000000000000000006326280b000000000000000000000000000000000000000000000000000000000000001b8b3b1cef9972278647dd9cc13a62d890ff04bceeddd81a76b3982b90b7a12dbc41db3ebbe554bb9881fb042cb513d994e50a05d018ff729a468bf22d1960ee700000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000e404e45aaf000000000000000000000000a0b86991c6218b36c1d19d4a2e9eb0ce3606eb48000000000000000000000000c18360217d8f7ab5e7c516566761ea12ce7f9d720000000000000000000000000000000000000000000000000000000000000bb8000000000000000000000000a109bc6f8292b52a6f89e8fc5eabf2947ec31bfa00000000000000000000000000000000000000000000000000000000000027100000000000000000000000000000000000000000000000000001f0b5bb55a223000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000",
    contractAddress: "",
    cumulativeGasUsed: "12499251",
    gasUsed: "146878",
    confirmations: "245",
    methodId: "0x5ae401dc",
    functionName: "transfer(uint256 deadline, bytes[] data)",
  },
];

export const Sidebar = ({ isOpen, onClose, isHover }: SidebarProps) => {
  const [transactions, setTransactions] = useState<{ [key: string]: any }>({});
  const [transactionsMap, setTransactionsMap] = useState<{
    [key: string]: any;
  }>({});

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
    processTransactions(txnData);
  }, []);

  return (
    <Drawer
      isOpen={isOpen}
      placement="right"
      onClose={onClose}
      size="md"
      closeOnOverlayClick={false}
    >
      {/* <DrawerOverlay /> */}
      <DrawerContent
        bg={`url("/noise.png"), #1a1b18 !important;`}
        borderLeft="1px solid rgba(255, 255, 255, 0.15)"
        paddingTop="3rem"
      >
        <DrawerCloseButton color="#FFFFFF" />
        <DrawerBody className={styles.drawerBody}>
          <TableContainer>
            <Table variant="unstyled">
              <Thead>
                <Tr className={styles.transactionHeaderContainer}>
                  <Th
                    className={styles.transactionHeaderLabel}
                    padding="1rem 0.5rem"
                  >
                    Date
                  </Th>
                  <Th
                    className={styles.transactionHeaderLabel}
                    padding="1rem 0.5rem"
                  >
                    Method
                  </Th>
                  <Th
                    className={styles.transactionHeaderLabel}
                    padding="1rem 0.5rem"
                  >
                    Value
                  </Th>
                  <Th
                    className={styles.transactionHeaderLabel}
                    padding="1rem 0.5rem"
                  >
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
                          formattedFunctionName,
                          formattedValue,
                          hash,
                          asset,
                          txreceipt_status,
                        }: any,
                        idx: number
                      ) => (
                        <Tr
                          key={hash}
                          onClick={() => {}}
                          className={
                            isHover &&
                            formattedDate === "Sep 11, 2022" &&
                            idx === 1
                              ? styles.transactionRowContainerSelected
                              : styles.transactionRowContainer
                          }
                        >
                          <Td padding="1rem 0.5rem">{formattedDate}</Td>
                          <Td padding="1rem 0.5rem">
                            {abridgeMethod(formattedFunctionName)}
                          </Td>

                          <Td padding="1rem 0.5rem">
                            {formattedFunctionName !== "Approve"
                              ? `-${formattedValue} ${asset ?? "ETH"}`
                              : ""}
                          </Td>
                          <Td padding="1rem 0.5rem">
                            {txreceipt_status === "0" ? "Failed" : "Success"}
                          </Td>
                        </Tr>
                      )
                    )
                )}
              </Tbody>
            </Table>
          </TableContainer>
        </DrawerBody>
        {/* <DrawerFooter className={styles.drawerFooter}>
          <HStack>
            <div className={styles.drawerFooterLabel}>Made With ❤️ By</div>
            <Button className={styles.drawerFooterButton}>
              <a
                href="https://twitter.com/iamminci"
                target="
                  _blank"
              >
                @iamminci
              </a>
            </Button>
          </HStack>
          <a
            href="https://github.com/iamminci/giftly"
            rel="noreferrer"
            target="_blank"
          >
            <IconButton
              aria-label="github icon"
              colorScheme="dark"
              variant="ghost"
              opacity=".7"
              icon={<FaGithub />}
            />
          </a>
        </DrawerFooter> */}
      </DrawerContent>
    </Drawer>
  );
};
