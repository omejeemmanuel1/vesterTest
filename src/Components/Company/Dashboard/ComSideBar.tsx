import React from "react";
import { MdOutlineSpaceDashboard } from "react-icons/md";
import { GrScorecard } from "react-icons/gr";
import { AiOutlineLineChart } from "react-icons/ai";
import { BiUser } from "react-icons/bi";

const ComSideBar: React.FC = () => {
  return (
    <aside className="bg-[#F9F9F9] text-[#1E1E1E99] w-[207px] h-[100vh] p-4 font-cabinet">
      <h1 className="text-blue-700 ml-6 text-2xl mt-6">Vester.AI</h1>
      <ul className="mt-[80px] ml-6">
        <li className="mb-10 flex">
          <MdOutlineSpaceDashboard className="mt-[1px] mr-2 text-2xl" />
          Dashboard
        </li>
        <li className="mb-10 flex">
          <GrScorecard className="mt-[1px] mr-2 text-2xl" />
          Score
        </li>
        <li className="mb-10 flex">
          <AiOutlineLineChart className="mt-[1px] mr-2 text-2xl" />
          Performance
        </li>
        <li className="flex">
          <BiUser className="mt-[1px] mr-2 text-2xl" />
          Admin
        </li>
      </ul>
    </aside>
  );
};

export default ComSideBar;
