import React from "react";
import { PieChart } from "react-minimal-pie-chart";

type Data = {
  title?: string;
  value: number;
  color: string;
};

const Piechart: React.FC<{ data: Data[] }> = ({ data }) => {
  return (
    <PieChart
      data={data.map((entry) => ({
        value: entry.value,
        color: entry.color,
      }))}
      label={(labelRenderProps) => {
        const entry = labelRenderProps.dataEntry as Data;
        return (
          <text
            x={labelRenderProps.x}
            y={labelRenderProps.y}
            textAnchor={labelRenderProps.textAnchor}
            style={{
              fontSize: "10px",
              fill: "white",
            }}
          >
            {entry.title ? `${entry.title} ${entry.value}%` : `${entry.value}%`}
          </text>
        );
      }}
      lineWidth={50}
    />
  );
};

export default Piechart;
