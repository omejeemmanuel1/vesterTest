/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect } from "react";
import axios from "axios";
import AdminNavBar from "./AdminNavBar";
import { BiArrowBack } from "react-icons/bi";
import { Link } from "react-router-dom";
import ReactPaginate from "react-paginate";

const baseUrl = import.meta.env.VITE_REACT_APP_BASE_URL;

const CompanyDataDisplay: React.FC = () => {
  const [companyData, setCompanyData] = useState<any>({});
  const [currentPage, setCurrentPage] = useState<number>(0); 
  const [itemsPerPage] = useState<number>(10); 

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${baseUrl}/admin/fetch-all-data`);
        console.log("API Response:", response.data); 
        setCompanyData(response.data);
      } catch (error) {
        console.error("Error fetching company data:", error);
      }
    };

    fetchData();
  }, []);

  console.log("Company Data:", companyData); 

  const userData = companyData["All user data"];
  const userDataIsObject = typeof userData === "object" && userData !== null;

  const pageCount = Math.ceil(
    userDataIsObject ? Object.values(userData).length / itemsPerPage : 0
  );

  const startIndex = currentPage * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = userDataIsObject
    ? Object.values(userData).slice(startIndex, endIndex)
    : [];

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
      <div className="mt-10 ml-36">
        <h2 className="text-1xl font-bold mb-4 text-blue-700 drop-shadow-lg">
          Startups
        </h2>
        <table className="mb-5 p-4 table-auto shadow-md bg-white border rounded-lg w-[1150px]">
          <thead className="text-sm text-center">
            <tr>
              <th>S/N</th>
              <th>Company Name</th>
              <th>Company Mail</th>
              <th>Website</th>
              <th>Sector</th>
              <th>Verified</th>
            </tr>
          </thead>
          <tbody>
            {currentItems.map((company: any, index: number) => (
              <tr
                key={index}
                className="border-t border-gray-400 pl-9 text-sm text-center"
              >
                <td>{startIndex + index + 1}</td>
                <td>{company.companyName}</td>
                <td>{company.companyMail}</td>
                <td>{company.companyWebsite}</td>
                <td>{company.companySector}</td>
                <td className="text-red-600 ">
                  {company.verified ? "Yes" : "No"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="text-center mr-32">
          <ReactPaginate
            previousLabel={"Previous"}
            nextLabel={"Next"}
            breakLabel={"..."}
            pageCount={pageCount}
            marginPagesDisplayed={2}
            pageRangeDisplayed={5}
            onPageChange={handlePageChange}
            containerClassName={"flex justify-center items-center space-x-2"} 
            pageClassName={"flex items-center"} 
            activeClassName={"font-bold text-blue-700"}
            previousClassName={
              "px-2 py-1 border border-gray-300 rounded-md hover:bg-gray-100"
            }
            nextClassName={
              "px-2 py-1 border border-gray-300 rounded-md hover:bg-gray-100"
            } 
            disabledClassName={"text-gray-400 cursor-not-allowed"}
          />
        </div>
      </div>
    </div>
  );
};

export default CompanyDataDisplay;
