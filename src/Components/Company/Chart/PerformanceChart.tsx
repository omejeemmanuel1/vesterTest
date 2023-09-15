/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useRef } from "react";
import Chart from "chart.js/auto";
import { useTheme } from "../../../Context/ThemeContext";

interface PerformanceChartProps {
  data: {
    dates: string[];
    actualValues: number[];
    forecastValues: number[];
    actualKPI: string;
    forecastKPI: string;
  };
}

const PerformanceChart: React.FC<PerformanceChartProps> = ({ data }) => {
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
                borderWidth: 2,
                fill: false,
                cubicInterpolationMode: "monotone",
              },
              {
                label: "Forecast",
                data: data.forecastValues,
                borderColor: "#4CAF50",
                borderWidth: 2,
                fill: false,
                cubicInterpolationMode: "monotone",
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
                  display: false,
                },
              },
              y: {
                title: {
                  display: true,
                  text: "Portfolio Value",
                },
                ticks: {
                  callback: (_value, index) => {
                    return customTicks[index];
                  },
                  stepSize: 500,
                },
                grid: {
                  lineWidth: 2,
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

  const { theme } = useTheme();
  return (
    <div
      className={`bg-[#F7F9FB] text-red-500 rounded-lg py-4 pb-[30px] ${
        theme === "light" ? "bg-[#F7F9FB]" : "dark:bg-gray-700 text-white"
      }`}
    >
      <canvas ref={chartRef}></canvas>
    </div>
  );
};

export default PerformanceChart;
