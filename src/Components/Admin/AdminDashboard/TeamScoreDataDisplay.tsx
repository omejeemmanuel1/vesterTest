/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect } from "react";
import axios from "axios";
import AdminNavBar from "./AdminNavBar";
import { BiArrowBack } from "react-icons/bi";
import { Link } from "react-router-dom";
import ReactPaginate from "react-paginate";

const baseUrl = import.meta.env.VITE_REACT_APP_BASE_URL;

const TeamScoreDataDisplay: React.FC = () => {
  const [teamScoreData, setTeamScoreData] = useState<any>({});
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [itemsPerPage] = useState<number>(10);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${baseUrl}/admin/fetch-all-data`);
        setTeamScoreData(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching team score data:", error);
        setError("Error fetching team score data.");
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  console.log("Team Score Data:", teamScoreData);

  const allUserData = teamScoreData?.["All user data"];
  const teamscoresData = allUserData
    ? Object.values(allUserData).flatMap((company: any) =>
        company.teamscores.map((teamscore: any) => ({
          ...teamscore,
          companyName: company.companyName,
        }))
      )
    : [];

  // Calculate the number of pages based on the number of items per page
  const pageCount = Math.ceil(teamscoresData.length / itemsPerPage);

  // Calculate start and end indices for the current page
  const startIndex = currentPage * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = teamscoresData.slice(startIndex, endIndex);

  // Handle page change
  const handlePageChange = (selectedPage: { selected: number }) => {
    setCurrentPage(selectedPage.selected);
  };

  return (
    <div>
      <AdminNavBar />
      <div className="m-6">
        <Link
          to="/data"
          className="flex text-center items-center text-blue-800"
        >
          <BiArrowBack /> Go back
        </Link>
      </div>
      <div className="m-2 mt-10 mb-5">
        <h2 className="text-1xl font-bold mb-4 text-blue-700 drop-shadow-lg">
          Team Score Collection
        </h2>
        <div className="w-full shadow-md bg-white border rounded-lg">
          {loading ? (
            <p className="p-4">Loading team score data...</p>
          ) : error ? (
            <p className="p-4 text-red-500">{error}</p>
          ) : teamscoresData.length > 0 ? (
            <>
              <table className="w-full">
                <thead className="text-xs text-blue-900">
                  <tr>
                    <th>Team Score</th>
                    <th>Company Name</th>
                    <th>Monthly Gross</th>
                    <th>Average Revenue</th>
                    <th>Business Models</th>
                    <th>Current Burn Rate</th>
                    <th>Funding Date</th>
                    <th>Funding Stage</th>
                    <th>Company Valuation</th>
                    <th>Industry</th>
                    <th>Main Technology</th>
                    <th>Product Stage</th>
                    <th>Registration Country</th>
                    <th>Revenue Percentage</th>
                    <th>Startup Runway</th>
                    <th>Revenue Status</th>
                  </tr>
                </thead>
                <tbody>
                  {currentItems.map(
                    (teamscore: any, teamscoreIndex: number) => (
                      <tr
                        key={teamscoreIndex}
                        className="border-t border-gray-400 pl-9 text-sm text-center"
                      >
                        <td>{teamscoreIndex + 1}</td>
                        <td>{teamscore?.companyName || "N/A"}</td>
                        <td>
                          {teamscore?.monthlyGross &&
                            `$${
                              parseInt(
                                teamscore.monthlyGross.month1.replace("$", "")
                              ) +
                              parseInt(
                                teamscore.monthlyGross.month2.replace("$", "")
                              ) +
                              parseInt(
                                teamscore.monthlyGross.month3.replace("$", "")
                              )
                            }`}
                        </td>
                        <td>
                          $
                          {teamscore?.averageRevenue &&
                            `${
                              teamscore.averageRevenue.month1 +
                              teamscore.averageRevenue.month2 +
                              teamscore.averageRevenue.month3
                            }`}
                        </td>
                        <td>
                          {teamscore?.businessModels?.join(", ") || "N/A"}
                        </td>
                        <td>${teamscore?.currentBurnRate || "N/A"}</td>
                        <td>{teamscore?.fundingDate || "N/A"}</td>
                        <td>{teamscore?.fundingStage || "N/A"}</td>
                        <td>{teamscore?.totalFundingRaised || "N/A"}</td>
                        <td>{teamscore?.industry || "N/A"}</td>
                        <td>{teamscore?.mainTechnology || "N/A"}</td>
                        <td>{teamscore?.productStage || "N/A"}</td>
                        <td>{teamscore?.registrationCountry || "N/A"}</td>
                        <td>{teamscore?.revenuePercentage || "N/A"}</td>
                        <td>${teamscore?.startupRunway || "N/A"}</td>
                        <td>{teamscore?.revenueStatus || "N/A"}</td>
                      </tr>
                    )
                  )}
                </tbody>
              </table>
            </>
          ) : (
            <p className="p-4">No team scores available.</p>
          )}
        </div>
      </div>
      <div className="text-center mt-4">
        <ReactPaginate
          previousLabel={"Previous"}
          nextLabel={"Next"}
          breakLabel={"..."}
          pageCount={pageCount}
          marginPagesDisplayed={2}
          pageRangeDisplayed={5}
          onPageChange={handlePageChange}
          containerClassName={"flex justify-center items-center space-x-2"}
          activeClassName={"font-bold text-blue-700"}
          pageClassName={
            "px-2 py-1 border border-gray-300 rounded-md hover:bg-gray-100 cursor-pointer"
          }
          previousClassName={
            "px-2 py-1 border border-gray-300 rounded-md hover:bg-gray-100 cursor-pointer"
          }
          nextClassName={
            "px-2 py-1 border border-gray-300 rounded-md hover:bg-gray-100 cursor-pointer"
          }
          disabledClassName={"text-gray-400 cursor-not-allowed"}
        />
      </div>
    </div>
  );
};

export default TeamScoreDataDisplay;
