import Link from "next/link";
import styles from "@styles/Navbar.module.css";
import { Button, HStack, Image } from "@chakra-ui/react";
import { useState } from "react";
import Searchbar from "./Searchbar";

const Navbar = () => {
  const [isHover, setIsHover] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  return (
    <HStack className={styles.navbar}>
      <Link href="/">
        <Image
          src="/logo.png"
          alt="marble Logo"
          cursor="pointer"
          className={styles.logo}
        ></Image>
      </Link>
      <Searchbar isNavbar />
    </HStack>
  );
};

export default Navbar;
