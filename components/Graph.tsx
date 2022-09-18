import { ForceGraph2D } from "react-force-graph";
import styles from "@styles/Graph.module.css";
import data from "@data/graphdata.json";
import data2 from "@data/graphdata2.json";
import { Box } from "@chakra-ui/react";
import { useCallback, useEffect, useRef, useState } from "react";
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
  console.log(data);

  const fgRef = useRef();

  useEffect(() => {
    const fg = fgRef.current;

    // Deactivate existing forces
    fg.d3Force("link").distance((link) => 50);
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
  function interpolate(node1, node2) {
    const x1 = node1.x;
    const y1 = node1.y;
    const x2 = node2.x;
    const y2 = node2.y;
    const dx = x2 - x1;
    const dy = y2 - y1;
    return { dx, dy };
    const distance = Math.sqrt(dx * dx + dy * dy);
    const distRatio = 1 + distance / Math.hypot(node.x, node.y);
    fgRef.current.zoom(distRatio, 1000);
  }

  // gen a number persistent color from around the palette
  const getColor = (n) =>
    "#" + ((n * 1234567) % Math.pow(2, 24)).toString(16).padStart(6, "0");

  const handleClick = (node) => {
    // Aim at node from outside it
    console.log("clicked");
    const distance = 40;
    const distRatio = 1 + distance / Math.hypot(node.x, node.y);
    // fgRef.current.zoomToFit(1000, 100);

    fgRef.current.centerAt(
      node.x,
      node.y,
      500 // ms transition duration
    );
    fgRef.current.zoom(5, 500);
    // setGraphData(data2);
    setIsClicked(true);
  };

  return isClicked ? (
    <ForceGraph2D
      ref={fgRef}
      graphData={data2}
      nodeLabel="name"
      nodeAutoColorBy="group"
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
      // onEngineStop={() => fgRef.current.zoomToFit(1000, 100)}
    />
  ) : (
    <ForceGraph2D
      ref={fgRef}
      graphData={data}
      nodeLabel="name"
      nodeAutoColorBy="group"
      // linkDirectionalArrowLength={5}
      // linkDirectionalArrowRelPos={1}
      // linkDirectionalArrowColor={() => "rgba(255,255,255,0.8)"}
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
      // onEngineStop={() => fgRef.current.zoomToFit(1000, 100)}
    />
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
