import { Box, VStack, Text, Divider, HStack, Switch } from "@chakra-ui/react";
import EthereumLogo from "@components/EthereumLogo";
import Navbar from "@components/Navbar";
import withTransition from "@components/withTransition";
import styles from "@styles/Address.module.css";

const dummyData = [
  { date: "Sep 14, 2022", count: 2 },
  { date: "Sep 13, 2022", count: 3 },
  { date: "Sep 10, 2022", count: 1 },
  { date: "Sep 9, 2022", count: 4 },
  { date: "Sep 7, 2022", count: 1 },
];

function Address() {
  return (
    <div className={styles.container}>
      <Navbar />
      <VStack className={styles.contentContainer}>
        <Text>
          Address 0x5B7d90b2069e4867f160301489D5012A05fad86f (minci.eth)
        </Text>
        <Divider />
        <HStack>
          <VStack>
            <Text>Total Balance</Text>
            <Text>$12,307.55</Text>
            <Text>7.676 ETH</Text>
            <Text>pie chart</Text>
            <VStack>
              <HStack>
                <Text>ETH</Text>
                <Text>3.85</Text>
                <Text>$5281</Text>
              </HStack>
              <HStack>
                <Text>ETH</Text>
                <Text>3.85</Text>
                <Text>$5281</Text>
              </HStack>
              <HStack>
                <Text>ETH</Text>
                <Text>3.85</Text>
                <Text>$5281</Text>
              </HStack>
              <HStack>
                <Text>ETH</Text>
                <Text>3.85</Text>
                <Text>$5281</Text>
              </HStack>
            </VStack>
          </VStack>
          <VStack>
            <HStack>
              <Text>Transactions</Text>
              <Switch />
              <Text>Show Zero Value Transactions</Text>
            </HStack>
            <HStack>
              <Text>Time</Text>
              <Text>Address</Text>
              <Text>Method</Text>
              <Text>Value</Text>
              <Text>Status</Text>
              <Text>Type</Text>
            </HStack>
            {dummyData.map(({ date, count }, idx) => (
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
            ))}
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
