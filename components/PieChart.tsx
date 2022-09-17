import React, { useState, ComponentProps } from "react";
import { PieChart } from "react-minimal-pie-chart";

type Props = {
  data: ComponentProps<typeof PieChart>["data"];
};

function StyledPieChart(props: Props) {
  const [hovered, setHovered] = useState<number | undefined>(undefined);

  const data = props.data.map((entry, i) => {
    if (hovered === i) {
      return {
        ...entry,
        color: "rgba(255, 255, 255, 0.7)",
      };
    }
    return entry;
  });

  const lineWidth = 40;

  return (
    <PieChart
      style={{
        fontFamily:
          '"Nunito Sans", -apple-system, Helvetica, Arial, sans-serif',
        fontSize: "6px !important",
      }}
      data={data}
      radius={PieChart.defaultProps.radius - 5}
      lineWidth={lineWidth}
      segmentsStyle={{ transition: "stroke .3s", cursor: "pointer" }}
      animate
      label={({ dataEntry }) => dataEntry.label}
      labelPosition={100 - lineWidth / 2}
      labelStyle={{
        fill: "#fff",
        opacity: 0.75,
        pointerEvents: "none",
      }}
      onMouseOver={(_, index) => {
        setHovered(index);
      }}
      onMouseOut={() => {
        setHovered(undefined);
      }}
    />
  );
}

export default StyledPieChart;
