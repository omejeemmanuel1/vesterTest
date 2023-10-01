import React from "react";
import { Pie } from "react-chartjs-2";

interface PieChartProps {
  totalCompanies: number;
  totalTeamScores: number;
  totalPitchDecks: number;
  width: number;
  height: number;
}

const PieChart: React.FC<PieChartProps> = ({
  totalCompanies,
  totalTeamScores,
  totalPitchDecks,
  width,
  height,
}) => {
  const data = {
    labels: ["Total Companies", "Total Team Scores", "Total Pitch Decks"],
    datasets: [
      {
        data: [totalCompanies, totalTeamScores, totalPitchDecks],
        backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
        hoverBackgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
      },
    ],
  };

  const chartOptions = {
    maintainAspectRatio: false,
  };

  return (
    <div style={{ width: `${width}px`, height: `${height}px` }}>
      <Pie data={data} options={chartOptions} />
    </div>
  );
};

export default PieChart;
