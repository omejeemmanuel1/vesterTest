import React from "react";
import Modal from "react-modal";
import { useTheme } from "../../../Context/ThemeContext";
import Piechart from "./PieChart/Piechart";
import ManArt from "../../../assets/manart.png";

Modal.setAppElement("#root");

const pieChartData = [
  {
    value: 60,
    color: "#BEBDB8",
  },
  {
    value: 30,
    color: "#999999",
  },
  {
    value: 70,
    color: "#808080",
  },
];

const CircularProgress: React.FC<{ percent: number }> = ({ percent }) => {
  const circumference = 16 * 2 * Math.PI;

  return (
    <div className="flex items-center justify-center relative">
      <svg className="w-20 h-20">
        {" "}
        {/* Adjust the width and height here */}
        <circle
          className="text-gray-600"
          strokeWidth="4"
          stroke="currentColor"
          fill="transparent"
          r="16"
          cx="38"
          cy="38"
        />
        <circle
          className="text-orange-200"
          strokeWidth="4"
          strokeDasharray={circumference}
          strokeDashoffset={circumference - (percent / 103) * circumference}
          strokeLinecap="round"
          stroke="currentColor"
          fill="transparent"
          r="16"
          cx="38"
          cy="38"
        />
      </svg>
      <span className="text-[11px] absolute -mt-1">{`${percent}%`}</span>
    </div>
  );
};

const AssessStartup: React.FC = () => {
  const { theme } = useTheme();

  return (
    <>
      <div
        className={`font-poppins ${
          theme === "light"
            ? "font-poppins text-[#031549]"
            : "dark:bg-[#031549] text-[#031549]"
        }`}
      >
        <div className="flex ml-10 mr-10 mt-5 justify-between">
          <div className="bg-white rounded-lg w-[68%] p-4 h-[500px] shadow-md">
            <h2 className="mb-5 mt-5 font-bold">Assess Startups in No Time</h2>
            <table className="mb-5  w-full text-gray-400">
              <thead className="text-sm text-center mb-5">
                <th>
                  <div className="-ml-16 font-bold">Name</div>
                </th>
                <th>
                  <strong>Sector</strong>
                </th>
                <th>
                  <strong>Vester Score</strong>
                </th>
                <th>
                  <strong>Mandate match</strong>
                </th>
              </thead>
              <tbody className="text-center">
                <tr>
                  <td>
                    <div className="flex">
                      {" "}
                      <img
                        src={ManArt}
                        alt=""
                        className="w-7 h-7 rounded-full pr-1"
                      />{" "}
                      Sample Startup
                    </div>
                  </td>
                  <td>FinTech</td>
                  <td>
                    <div className="border border-[#ec7f36] rounded-full h-8 w-8 pt-1 ml-[70px]">
                      A+
                    </div>
                  </td>
                  <td>
                    <div className="">
                      <CircularProgress percent={95} />
                    </div>
                  </td>
                </tr>
              </tbody>
              <tbody className="text-center">
                <tr>
                  <td>
                    <div className="flex -mt-7">
                      {" "}
                      <img
                        src={ManArt}
                        alt=""
                        className="w-7 h-7 rounded-full pr-1"
                      />{" "}
                      Sample Startup
                    </div>
                  </td>
                  <td>
                    <div className="-mt-7">AgriTech</div>
                  </td>
                  <td>
                    <div className="border border-[#ec7f36] rounded-full h-8 w-8 pt-1 ml-[70px] -mt-8">
                      B+
                    </div>
                  </td>
                  <td>
                    <div className="-mt-7">
                      <CircularProgress percent={15} />
                    </div>
                  </td>
                </tr>
              </tbody>
              <tbody className="text-center">
                <tr>
                  <td>
                    <div className="flex -mt-7">
                      {" "}
                      <img
                        src={ManArt}
                        alt=""
                        className="w-7 h-7 rounded-full pr-1"
                      />{" "}
                      Sample Startup
                    </div>
                  </td>
                  <td>
                    <div className="-mt-7">HealthTech</div>{" "}
                  </td>
                  <td>
                    <div className="border border-[#ec7f36] rounded-full h-8 w-8 pt-1 ml-[70px] -mt-8">
                      A
                    </div>
                  </td>
                  <td>
                    <div className="-mt-7">
                      {" "}
                      <CircularProgress percent={50} />
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="block">
            <div className="bg-white rounded-lg w-full h-[30%] shadow-md">
              <div className="flex space-x-16 pt-2 pl-6 pr-6">
                <h4>Country</h4>
                <h4>Top 3</h4>
              </div>

              <div className="flex">
                {" "}
                <div className="w-20 m-6 mb-8">
                  <Piechart data={pieChartData} />
                </div>
                <div className="m-5 mt-6">
                  <div className=" flex space-x-2 mb-2">
                    <span className="bg-[#808080] rounded-full w-[12px] h-[12px]"></span>
                    <p className="-mt-2">...</p>
                  </div>
                  <div className="flex space-x-2 mb-2">
                    <span className="bg-[#BEBDB8] rounded-full w-[12px] h-[12px]"></span>
                    <p className="-mt-2">...</p>
                  </div>

                  <div className=" flex space-x-2">
                    <span className="bg-[#999999] rounded-full w-[12px] h-[12px]"></span>
                    <p className="-mt-2">...</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg w-full h-[30%] mt-3 shadow-md">
              <div className="flex space-x-16 pt-2 pl-6 pr-6">
                <h4>Sector</h4>
                <h4>Top 3</h4>
              </div>

              <div className="flex">
                {" "}
                <div className="w-20 m-6 mb-8">
                  <Piechart data={pieChartData} />
                </div>
                <div className="m-5 mt-6">
                  <div className=" flex space-x-2 mb-2">
                    <span className="bg-[#808080] rounded-full w-[12px] h-[12px]"></span>
                    <p className="-mt-2">...</p>
                  </div>
                  <div className="flex space-x-2 mb-2">
                    <span className="bg-[#BEBDB8] rounded-full w-[12px] h-[12px]"></span>
                    <p className="-mt-2">...</p>
                  </div>

                  <div className=" flex space-x-2">
                    <span className="bg-[#999999] rounded-full w-[12px] h-[12px]"></span>
                    <p className="-mt-2">...</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-lg w-[300px] h-[30%] mt-3 shadow-md">
              <div className="flex space-x-16 pt-2 pl-6 pr-6">
                <h4>Stage</h4>
                <h4>Top 3</h4>
              </div>

              <div className="flex">
                {" "}
                <div className="w-20 m-6">
                  <Piechart data={pieChartData} />
                </div>
                <div className="m-5 mt-6">
                  <div className=" flex space-x-2 mb-2">
                    <span className="bg-[#808080] rounded-full w-[12px] h-[12px]"></span>
                    <p className="-mt-2">...</p>
                  </div>
                  <div className="flex space-x-2 mb-2">
                    <span className="bg-[#BEBDB8] rounded-full w-[12px] h-[12px]"></span>
                    <p className="-mt-2">...</p>
                  </div>

                  <div className=" flex space-x-2">
                    <span className="bg-[#999999] rounded-full w-[12px] h-[12px]"></span>
                    <p className="-mt-2">...</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AssessStartup;
