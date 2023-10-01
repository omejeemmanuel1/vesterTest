import React, { useEffect, useState } from "react";
import axios from "axios";
import PieChart from "../Components/Admin/AdminChart/AdminChart";

const baseUrl = import.meta.env.VITE_REACT_APP_BASE_URL;

const AdminChartPage: React.FC = () => {
  const [data, setData] = useState({
    totalCompanies: 0,
    totalTeamScores: 0,
    totalPitchDecks: 0,
  });

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(`${baseUrl}/admin/fetch-all-data`);
        const apiData = response.data;

        setData({
          totalCompanies: apiData["Total companies"],
          totalTeamScores: apiData["Total teamscore"],
          totalPitchDecks: apiData["Total pitchdeck"],
        });
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    fetchData();
  }, []);

  return (
    <div className="flex ml-[380px] mt-10 overflow-hidden">
      <div className="text-center">
        <h1 className="text-3xl font-bold mb-4">Users Statistics</h1>
        <PieChart
          totalCompanies={data.totalCompanies}
          totalTeamScores={data.totalTeamScores}
          totalPitchDecks={data.totalPitchDecks}
          width={400}
          height={400}
        />
      </div>
    </div>
  );
};

export default AdminChartPage;
