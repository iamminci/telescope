import data from "@data/graphdata.json";
import { useEffect, useRef, useState } from "react";
import { ForceGraph3D } from "react-force-graph";
import * as THREE from "three";

function Graph() {
  const distance = 150;

  const CameraOrbit = () => {
    const fgRef = useRef();

    useEffect(() => {
      fgRef.current.cameraPosition({ z: distance });

      // camera orbit
      let angle = 0;
      setInterval(() => {
        fgRef.current.cameraPosition({
          x: distance * Math.sin(angle),
          z: distance * Math.cos(angle),
        });
        angle += Math.PI / 300;
      }, 10);
    }, []);

    useEffect(() => {
      const bloomPass = new THREE.UnrealBloomPass();
      bloomPass.strength = 3;
      bloomPass.radius = 1;
      bloomPass.threshold = 0.1;
      fgRef.current.postProcessingComposer().addPass(bloomPass);
    }, []);

    const [highlightNodes, setHighlightNodes] = useState(new Set());
    const [highlightLinks, setHighlightLinks] = useState(new Set());
    const [isHover, setHover] = useState(false);
    const updateHighlight = () => {
      setHighlightNodes(highlightNodes);
      setHighlightLinks(highlightLinks);
    };

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
      <ForceGraph3D
        ref={fgRef}
        graphData={data}
        nodeLabel="label"
        nodeAutoColorBy="group"
        linkWidth={(link) => (highlightLinks.has(link) ? 5 : 1)}
        linkDirectionalParticles={4}
        linkDirectionalParticleWidth={(link) =>
          highlightLinks.has(link) ? 4 : 0
        }
        linkDirectionalArrowLength={5}
        linkDirectionalArrowRelPos={1}
        linkDirectionalArrowColor={() => "rgba(255,255,255,0.8)"}
        onBackgroundClick={() => fgRef.current.zoomToFit(1000, 100)}
        linkCurvature="curvature"
        linkColor={() => "rgba(255,255,255,0.8)"}
        // nodeCanvasObject={(node, ctx, globalScale) =>
        //   nodePaint(node, ctx, globalScale)
        // }
        nodeVal={(node) => node.value}
        onNodeDragEnd={(node) => {
          node.fx = node.x;
          node.fy = node.y;
        }}
        // onNodeClick={handleClick}
        cooldownTicks={20}
        onLinkHover={handleLinkHover}
        enableNodeDrag={false}
        enableNavigationControls={false}
        showNavInfo={false}
        // onEngineStop={() => fgRef.current.zoomToFit(1000)}
      />
    );
  };

  return <CameraOrbit />;
}

export default Graph;
