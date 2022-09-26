// @ts-nocheck
import { Box } from "@chakra-ui/react";

const ProgressBar = (props) => {
  const { completed } = props;

  const containerStyles = {
    position: "absolute",
    height: "5px",
    width: "800px",
    bottom: "-95px",
    background: "linear-gradient(90deg, #FFFFFF 1.41%, #08c32d 120.87%)",
    borderRadius: 50,
    margin: 50,
  };

  const fillerStyles = {
    position: "absolute",
    height: "5px",
    width: `${100 - completed}%`,
    bottom: "-45px",
    right: "0",
    backgroundColor: "#444444",
    borderRadius: "inherit",
    transition: "width 1s ease-in-out",
    zIndex: 4,
  };

  return (
    <Box position="relative" width="800px">
      <div style={containerStyles} />
      <div style={fillerStyles} />
    </Box>
  );
};

export default ProgressBar;
