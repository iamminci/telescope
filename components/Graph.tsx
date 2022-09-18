// @ts-nocheck
import { ForceGraph2D } from "react-force-graph";
import styles from "@styles/Graph.module.css";
import data from "@data/graphdata.json";
import data2 from "@data/graphdata2.json";
import data3 from "@data/graphdata3.json";
import { Box, HStack, useDisclosure, Input } from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";
import { Sidebar } from "./Sidebar";
import { Search2Icon } from "@chakra-ui/icons";
// import etherscan from "../etherscan.json";

// console.log("ethereum", etherscan);

function genRandomTree(N = 300, reverse = false) {
  return {
    nodes: [...new Array(N).fill(0)].map((i) => ({ id: i })),
    links: [...new Array(N).fill(0)]
      .filter((id) => id)
      .map((id) => ({
        [reverse ? "target" : "source"]: id,
        [reverse ? "source" : "target"]: Math.round(Math.random() * (id - 1)),
      })),
  };
}

function Graph() {
  const [graphData, setGraphData] = useState(data);
  const [isClicked, setIsClicked] = useState(false);
  const [isClicked2, setIsClicked2] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  console.log(data);

  const fgRef = useRef();

  useEffect(() => {
    const fg = fgRef.current;

    // Deactivate existing forces
    fg.d3Force("link").distance((link) => 40);
    fg.d3Force("charge").strength(-200); // the default is -30
  }, []);

  function nodePaint(
    { id, x, y, name, value, code, imgSrc },
    ctx,
    globalScale
  ) {
    const fontSize = (12 / globalScale) * 2;
    ctx.font = `${fontSize}px Bai Jamjuree`;
    const textWidth = ctx.measureText(name).width;
    ctx.fillStyle = "#181816"; // sets node color randomly based on ID

    let img = new Image();
    if (imgSrc) {
      img.src = imgSrc;
    }

    const imgR = (10 / globalScale) * 3;

    return (() => {
      ctx.beginPath();

      // circle
      ctx.arc(x, y, value * 2, 0, 2 * Math.PI, false);
      ctx.shadowColor = code ?? "#FFFFFF";
      ctx.shadowBlur = 20;
      ctx.fill();
      ctx.shadowBlur = 0;

      // text
      ctx.textBaseline = "middle";
      ctx.fillStyle = "#FFFFFF";
      ctx.fillText(name, x - textWidth / 2 + imgR, y);

      if (imgSrc) {
        // logo
        ctx.drawImage(
          img,
          x - imgR / 2 - textWidth / 2,
          y - imgR / 2,
          imgR,
          imgR
        );
      }
    })();
  }

  const handleClick = (node) => {
    onOpen();
    // Aim at node from outside it
    const distance = 40;
    const distRatio = 1 + distance / Math.hypot(node.x, node.y);
    // fgRef.current.zoomToFit(1000, 100);

    fgRef.current.centerAt(
      node.x + 20,
      node.y,
      500 // ms transition duration
    );
    fgRef.current.zoom(8, 500);
    // setGraphData(data2);
    setIsClicked(true);
  };

  const [highlightNodes, setHighlightNodes] = useState(new Set());
  const [highlightLinks, setHighlightLinks] = useState(new Set());

  const [isHover, setHover] = useState(false);
  const updateHighlight = () => {
    setHighlightNodes(highlightNodes);
    setHighlightLinks(highlightLinks);
  };

  function handleSubmit(e: any) {
    e.preventDefault();
    // Aim at node from outside it
    const distance = 40;
    // fgRef.current.zoomToFit(1000, 100);

    fgRef.current.centerAt(
      60,
      65,
      500 // ms transition duration
    );
    fgRef.current.zoom(8, 500);
    // setGraphData(data2);
    setIsClicked2(true);
  }

  const handleLinkHover = (link) => {
    highlightNodes.clear();
    highlightLinks.clear();

    if (link) {
      highlightLinks.add(link);
      highlightNodes.add(link.source);
      highlightNodes.add(link.target);
    }

    setHover(!isHover);

    updateHighlight();
  };

  return (
    <>
      {isClicked2 ? (
        <ForceGraph2D
          ref={fgRef}
          graphData={data2}
          nodeLabel="label"
          nodeAutoColorBy="group"
          autoPauseRedraw={false}
          linkWidth={(link) => 5}
          linkDirectionalParticles={4}
          linkDirectionalParticleWidth={(link) => 4}
          linkDirectionalArrowLength={5}
          linkDirectionalArrowRelPos={1}
          linkDirectionalArrowColor={() => "rgba(255,255,255,0.8)"}
          onBackgroundClick={() => fgRef.current.zoomToFit(1000, 100)}
          linkCurvature="curvature"
          linkColor={() => "rgba(255,255,255,0.8)"}
          nodeCanvasObject={(node, ctx, globalScale) =>
            nodePaint(node, ctx, globalScale)
          }
          nodeVal={(node) => node.value}
          onNodeDragEnd={(node) => {
            node.fx = node.x;
            node.fy = node.y;
          }}
          onNodeClick={handleClick}
          cooldownTicks={20}
          onLinkHover={handleLinkHover}
        />
      ) : isClicked ? (
        <ForceGraph2D
          ref={fgRef}
          graphData={data3}
          nodeLabel="label"
          nodeAutoColorBy="group"
          autoPauseRedraw={false}
          linkWidth={(link) => (highlightLinks.has(link) ? 5 : 1)}
          linkDirectionalParticles={4}
          linkDirectionalParticleWidth={(link) =>
            highlightLinks.has(link) ? 4 : 0
          }
          linkDirectionalArrowLength={5}
          linkDirectionalArrowRelPos={0.95}
          linkDirectionalArrowColor={() => "rgba(255,255,255,0.8)"}
          onBackgroundClick={() => fgRef.current.zoomToFit(1000, 100)}
          linkCurvature="curvature"
          linkColor={() => "rgba(255,255,255,0.8)"}
          nodeCanvasObject={(node, ctx, globalScale) =>
            nodePaint(node, ctx, globalScale)
          }
          nodeVal={(node) => node.value}
          onNodeDragEnd={(node) => {
            node.fx = node.x;
            node.fy = node.y;
          }}
          onNodeClick={handleClick}
          cooldownTicks={20}
          onLinkHover={handleLinkHover}
        />
      ) : (
        <ForceGraph2D
          ref={fgRef}
          graphData={data}
          nodeLabel="name"
          nodeAutoColorBy="group"
          autoPauseRedraw={false}
          linkWidth={(link) => (highlightLinks.has(link) ? 5 : 1)}
          linkDirectionalParticles={4}
          linkDirectionalParticleWidth={(link) =>
            highlightLinks.has(link) ? 4 : 0
          }
          onBackgroundClick={() => fgRef.current.zoomToFit(1000, 100)}
          linkCurvature="curvature"
          linkColor={() => "rgba(255,255,255,0.8)"}
          nodeCanvasObject={(node, ctx, globalScale) =>
            nodePaint(node, ctx, globalScale)
          }
          nodeVal={(node) => node.value}
          onNodeDragEnd={(node) => {
            node.fx = node.x;
            node.fy = node.y;
          }}
          onNodeClick={handleClick}
          cooldownTicks={20}
          onLinkHover={handleLinkHover}
          // onEngineStop={() => fgRef.current.zoomToFit(1000, 100)}
        />
      )}
      <HStack
        className={styles.searchbarMini}
        position="fixed"
        bottom="5"
        right="5"
      >
        <Search2Icon color="white" />
        <form onSubmit={handleSubmit} style={{ width: "100%" }}>
          <Input
            className={styles.searchInput}
            placeholder={"Search [token Address]/[tokenId]"}
            onSubmit={handleSubmit}
            onChange={() => {}}
          />
        </form>
      </HStack>

      <Sidebar isOpen={isOpen} onClose={onClose} isHover={isHover} />
    </>
  );
  // <ForceGraph2D
  //   graphData={data}
  //   nodeLabel="name"
  //   nodeAutoColorBy="group"
  //   // linkDirectionalParticles="value"
  //   // linkDirectionalParticleWidth={(d) => d.value * 10}
  //   // linkDirectionalParticleSpeed={(d) => d.value * 0.01}{
  //   linkDirectionalArrowLength={5}
  //   linkDirectionalArrowRelPos={1}
  //   linkColor={() => "rgba(255,255,255,0.8)"}
  //   linkDirectionalArrowColor={() => "rgba(255,255,255,0.8)"}
  //   // linkWidth={(link) => link.value * 20}
  //   nodeCanvasObject={(node, ctx) => nodePaint(node, getColor(node.id), ctx)}
  //   nodePointerAreaPaint={nodePaint}
  //   onNodeDragEnd={(node) => {
  //     node.fx = node.x;
  //     node.fy = node.y;
  //   }}
  //   ref={fgRef}
  //   cooldownTicks={20}
  //   // onEngineStop={() => fgRef.current.zoomToFit(400)}
  // />
  // <Box className={styles.graphContainer}>
  // <ForceGraph2D
  //   ref={fgRef}
  //   graphData={genRandomTree()}
  //   cooldownTicks={100}
  //   onEngineStop={() => fgRef.current.zoomToFit(400)}
  // />
  // </Box>
}

export default Graph;
