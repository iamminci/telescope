import { Box, keyframes } from "@chakra-ui/react";
import styles from "@styles/Home.module.css";
import { motion } from "framer-motion";

const animationKeyframes = keyframes`
0% {
    transform: rotate3d(0, 0, 1, 0deg);
  }
  25% {
    transform: rotate3d(0, 0, 1, 90deg);
  }
  50% {
    transform: rotate3d(0, 0, 1, 180deg);
  }
  75% {
    transform: rotate3d(0, 0, 1, 270deg);
  }
  100% {
    transform: rotate3d(0, 0, 1, 360deg);
  }
`;

const animation = `${animationKeyframes} 30s normal linear infinite`;

function EthereumLogo() {
  return (
    <Box className={styles.ethereumLogoContainer}>
      <Box
        className={styles.ethereumLogo}
        as={motion.div}
        animation={animation}
        bgImage="/hero.png"
      />
    </Box>
  );
}

export default EthereumLogo;
