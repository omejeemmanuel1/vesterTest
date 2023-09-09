import React from "react";
import CompanyPerformanceChart from "../Components/Company/CompanyPerformance/CompanyPerformance";

const CompanyPerformancePage: React.FC = () => {
  const chartData = {
    dates: ["2017", "2018", "2019", "2020", "2021", "2022", "2023"],
    actualValues: [
      1000,
      1200,
      1500,
      1700,
      1900,
      2000,
      2100, // Sample actual portfolio values for each month
    ],
    forecastValues: [
      950,
      1100,
      1400,
      1600,
      1800,
      1900,
      2000, // Sample forecast portfolio values for each month
    ],

    actualKPI: "$10.2 +11.01%",
    forecastKPI: "$9.4 +14.01%",
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">Company Performance</h1>
      <CompanyPerformanceChart data={chartData} />
    </div>
  );
};

export default CompanyPerformancePage;
