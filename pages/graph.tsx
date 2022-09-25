import Navbar from "@components/Navbar";
import styles from "@styles/Graph.module.css";
import dynamic from "next/dynamic";

const Graph = dynamic(() => import("@components/Graph"), {
  ssr: false,
});
const ThreeDGraph = dynamic(() => import("@components/3DGraph"), {
  ssr: false,
});

const Home = () => {
  if (typeof window === "undefined") return null;

  return (
    <div className={styles.container}>
      <Navbar />
      {/* <Graph /> */}
      <ThreeDGraph />
    </div>
  );
};

export default Home;
