/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect } from "react";
import axios from "axios";
import AdminNavBar from "./AdminNavBar";
import { BiArrowBack } from "react-icons/bi";
import { Link } from "react-router-dom";
import ReactPaginate from "react-paginate";

const baseUrl = import.meta.env.VITE_REACT_APP_BASE_URL;

const PitchDeckDataDisplay: React.FC = () => {
  const [pitchdeckData, setPitchdeckData] = useState<any>({});
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [itemsPerPage] = useState<number>(1);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${baseUrl}/admin/fetch-all-data`);
        setPitchdeckData(response.data);
        console.log("pitchdeck", response.data);
      } catch (error) {
        console.error("Error fetching pitchdeck data:", error);
      }
    };

    fetchData();
  }, []);

  const allUserData = pitchdeckData?.["All user data"];
  const pitchdecksData = allUserData
    ? Object.values(allUserData).flatMap((company: any) =>
        company.pitchdecks.map((pitchdeck: any) => ({
          ...pitchdeck,
          companyName: company.companyName,
        }))
      )
    : [];

  // Calculate the number of pages based on the number of items per page
  const pageCount = Math.ceil(pitchdecksData.length / itemsPerPage);

  // Calculate start and end indices for the current page
  const startIndex = currentPage * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = pitchdecksData.slice(startIndex, endIndex);

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
      <div className="mt-10 ml-32">
        <h2 className="text-1xl font-bold mb-4 text-blue-700 drop-shadow-lg">
          Pitch Deck
        </h2>
        <div className="w-[1160px] shadow-md bg-white border rounded-lg p-10 overflow-hidden">
          {currentItems.length > 0 ? (
            currentItems.map((pitchdeck: any, pitchIndex: number) => (
              <div key={pitchIndex} className="pitchdeck my-4">
                <h3 className="text-lg font-semibold">
                  {pitchdeck.companyName}
                </h3>
                <strong className="text-lg font-semibold">Title:</strong>{" "}
                {pitchdeck.title}
                <br />
                {/* Display the pitchdeck content */}
                <div className="mt-2">
                  <strong className="text-lg font-semibold">Content:</strong>
                  <div
                    className="formatted-content"
                    dangerouslySetInnerHTML={{
                      __html: pitchdeck.content,
                    }}
                  ></div>
                </div>
              </div>
            ))
          ) : (
            <p>No pitchdecks available for this page.</p>
          )}
        </div>
        <div className="text-center mt-4 mb-10">
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
    </div>
  );
};

export default PitchDeckDataDisplay;
