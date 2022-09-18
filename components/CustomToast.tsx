import { Link, Text } from "@chakra-ui/react";
import styles from "@styles/Home.module.css";

const CustomToast = ({ txnHash }: any) => {
  return (
    <Link href={`https://vimeo.com/750807868`} isExternal>
      <Text className={styles.toastText}>
        Sorry! App is still WIP. Check Gitcoin one or click to view demo video.
      </Text>
    </Link>
  );
};

export default CustomToast;
