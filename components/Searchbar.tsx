import { Search2Icon } from "@chakra-ui/icons";
import { Text, HStack, Input, Switch } from "@chakra-ui/react";
import styles from "@styles/Home.module.css";

type SearchBarProps = {
  isNavbar: boolean;
  handleInputChange?: (e: any) => void;
  handleSwitchChange?: () => void;
  handleNavigation?: (e: any) => void;
  isGraphView?: boolean;
};

function Searchbar({
  isNavbar,
  handleInputChange,
  handleSwitchChange,
  handleNavigation,
  isGraphView,
}: SearchBarProps) {
  return (
    <HStack className={!isNavbar ? styles.searchbar : styles.searchbarMini}>
      <Search2Icon color="white" />
      <form onSubmit={handleNavigation} style={{ width: "100%" }}>
        <Input
          className={styles.searchInput}
          placeholder={
            !isNavbar
              ? "Search by Address / Transaction Hash / Block / Token / ENS"
              : "Search by Address..."
          }
          onSubmit={handleNavigation}
          onChange={handleInputChange}
        />
      </form>
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
