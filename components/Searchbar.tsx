import { Search2Icon } from "@chakra-ui/icons";
import { Text, HStack, Input, Switch } from "@chakra-ui/react";
import styles from "@styles/Home.module.css";

type SearchBarProps = {
  isNavbar: boolean;
  handleSwitchChange?: () => void;
  isGraphView?: boolean;
};

function Searchbar({
  isNavbar,
  handleSwitchChange,
  isGraphView,
}: SearchBarProps) {
  return (
    <HStack className={!isNavbar ? styles.searchbar : styles.searchbarMini}>
      <Search2Icon color="white" />
      <Input
        className={styles.searchInput}
        placeholder={
          !isNavbar
            ? "Search by Address / Transaction Hash / Block / Token / ENS"
            : "Search by Address..."
        }
      />
      {!isNavbar && (
        <HStack className={styles.switchContainer}>
          <Switch
            colorScheme="orange"
            onChange={handleSwitchChange}
            className={isGraphView ? styles.isGraphView : styles.isNotGraphView}
          />
          <Text className={styles.graphViewLabel}>Graph View</Text>
        </HStack>
      )}
    </HStack>
  );
}

export default Searchbar;
