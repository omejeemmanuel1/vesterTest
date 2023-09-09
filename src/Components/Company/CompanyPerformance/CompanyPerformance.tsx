/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useRef } from "react";
import Chart from "chart.js/auto";

interface CompanyPerformanceChartProps {
  data: {
    dates: string[];
    actualValues: number[];
    forecastValues: number[];
    actualKPI: string;
    forecastKPI: string;
  };
}

const CompanyPerformance: React.FC<CompanyPerformanceChartProps> = ({
  data,
}) => {
  const chartRef = useRef<HTMLCanvasElement | null>(null);
  const chartInstanceRef = useRef<Chart | null>(null);

  const customTicks = ["0", "5M", "10M", "15M"];

  useEffect(() => {
    if (chartRef.current) {
      const ctx = chartRef.current.getContext("2d");

      if (ctx) {
        if (chartInstanceRef.current) {
          chartInstanceRef.current.destroy();
        }

        chartInstanceRef.current = new Chart(ctx, {
          type: "line",
          data: {
            labels: data.dates,
            datasets: [
              {
                label: "Actual",
                data: data.actualValues,
                borderColor: "#9747FF",
                borderWidth: 2, // Set the line width
                fill: false,
              },
              {
                label: "Forecast",
                data: data.forecastValues,
                borderColor: "#4CAF50",
                borderWidth: 2, // Set the line width
                fill: false,
              },
            ],
          },
          options: {
            scales: {
              x: {
                title: {
                  display: true,
                  text: "Time Period",
                },
                grid: {
                  display: false, // Hide vertical grid lines
                },
              },
              y: {
                title: {
                  display: true,
                  text: "Portfolio Value",
                },
                ticks: {
                  callback: (_value, index) => {
                    return customTicks[index]; // Use custom ticks
                  },
                },
                grid: {
                  color: "rgba(0, 0, 0, 0.1)", // Customize the color of the horizontal lines
                },
              },
            },
            plugins: {
              title: {
                display: true,
                text: "Total Revenue",
              },
              subtitle: {
                display: true,
                text: `${data.actualKPI}  ${data.forecastKPI}`,
              },
            },
          },
        });

        // Set the maximum width for the chart container
        if (chartInstanceRef.current && chartRef.current.parentElement) {
          chartRef.current.parentElement.style.maxWidth = "1000px";
        }
      }
    }

    return () => {
      if (chartInstanceRef.current) {
        chartInstanceRef.current.destroy();
      }
    };
  }, [data]);

  return (
    <div
      className="w-full h-full bg-[#F7F9FB] rounded-lg py-4"
      style={{ paddingBottom: "30px" }}
    >
      <canvas ref={chartRef}></canvas>
    </div>
  );
};

export default CompanyPerformance;
