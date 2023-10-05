import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Abstract from "../../../assets/abstract.png";
import axios from "axios";
import AdminNavBar from "./AdminNavBar";
import { BsFillBuildingsFill } from "react-icons/bs";
import { BsFillFileSpreadsheetFill } from "react-icons/bs";
import { BsFillJournalBookmarkFill } from "react-icons/bs";

const baseUrl = import.meta.env.VITE_REACT_APP_BASE_URL;

const DataDisplay: React.FC = () => {
  const [data, setData] = useState({
    totalCompanies: 0,
    totalTeamscores: 0,
    totalPitchdecks: 0,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${baseUrl}/admin/fetch-all-data`);
        console.log("API Response:", response.data); // Debug: Log the API response
        setData({
          totalCompanies: response.data["Total companies"],
          totalTeamscores: response.data["Total teamscore"],
          totalPitchdecks: response.data["Total pitchdeck"],
        });
      } catch (error) {
        console.error("Error fetching company data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <AdminNavBar />
      <div className="mt-5 ml-10">
        <h4>Welcome to Vester.AI admin dashboad</h4>
      </div>
      <div>
        <div className="flex font-cabinet">
          <div className="bg-gradient-to-r from-red-300 to-red-500 ml-20 mt-10 w-[400px] h-[180px] rounded-2xl">
            <Link to="/company-data">
              <div className="text-2xl text-white drop-shadow-lg w-[35px] h-[35px] text-center  rounded-lg pt-[2px] bg-red-200 relative left-[350px] top-4">
                {data.totalCompanies}
              </div>
              <h2 className="ml-5 -mt-5 font-bold text-white drop-shadow-md">
                Registered Startups
              </h2>
              <img
                src={Abstract}
                alt=""
                className="w-[200px] mt-7 rounded-2xl"
              />
            </Link>
            <div className="left-[335px] relative -top-[60px] text-3xl text-gray-400 bg-red-100 w-[50px] p-[10px] rounded-[50%]">
              <BsFillBuildingsFill />
            </div>
          </div>
          <div className="bg-gradient-to-r from-blue-300 to-blue-500 m-10 w-[400px] h-[180px] rounded-2xl">
            <Link to="/teamscore-data">
              <div className="text-2xl text-white drop-shadow-lg w-[35px] h-[35px] text-center  rounded-lg pt-[2px] bg-blue-200 relative left-[350px] top-4">
                {data.totalTeamscores}
              </div>
              <h2 className="ml-5 -mt-5 font-bold text-white drop-shadow-md">
                Uploaded startup data
              </h2>
              <img
                src={Abstract}
                alt=""
                className="w-[200px] mt-7 rounded-2xl"
              />
            </Link>
            <div className="left-[335px] relative -top-[60px] text-3xl text-gray-400 bg-blue-100 w-[50px] p-[10px] rounded-[50%]">
              <BsFillFileSpreadsheetFill />
            </div>
          </div>
          <div className="bg-gradient-to-r from-gray-300 to-gray-500 mr-15 mt-10 w-[400px] h-[180px] rounded-2xl">
            <Link to="/pitchdeck-data">
              <div className="text-2xl text-white drop-shadow-lg w-[35px] h-[35px] text-center  rounded-lg pt-[2px] bg-gray-200 relative left-[350px] top-4">
                {data.totalPitchdecks}
              </div>
              <h2 className="ml-5 -mt-5 font-bold text-white drop-shadow-md">
                Uploaded pitchdeck
              </h2>
              <img
                src={Abstract}
                alt=""
                className="w-[200px] mt-7 rounded-2xl"
              />
            </Link>
            <div className="left-[335px] relative -top-[60px] text-3xl text-gray-400 bg-gray-100 w-[50px] p-[10px] rounded-[50%]">
              <BsFillJournalBookmarkFill />
            </div>
          </div>
        </div>
        <div className="flex ml-20 font-cabinet">
          <div className="bg-yellow-300 m-5 w-[600px] h-[250px] rounded-2xl">
            <Link to="/pitchdeck-data">
              <div className="text-2xl text-white drop-shadow-lg w-[35px] h-[35px] text-center  rounded-lg pt-[2px] bg-yellow-200 relative left-[550px] top-4">
                {data.totalPitchdecks}
              </div>
              <h2 className="ml-5 -mt-5 font-bold text-white drop-shadow-md">
                Registered Investors
              </h2>
              <img
                src={Abstract}
                alt=""
                className="w-[200px] mt-24 rounded-2xl"
              />
            </Link>
          </div>

          <div className="bg-green-300 m-5 w-[600px] h-[250px] rounded-2xl">
            <Link to="/pitchdeck-data">
              <div className="text-2xl text-white drop-shadow-lg w-[35px] h-[35px] text-center  rounded-lg pt-[2px] bg-green-200 relative left-[550px] top-4">
                {data.totalPitchdecks}
              </div>
              <h2 className="ml-5 -mt-5 font-bold text-white drop-shadow-md">
                Pitch Data
              </h2>
              <img
                src={Abstract}
                alt=""
                className="w-[200px] mt-24 rounded-2xl"
              />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DataDisplay;
