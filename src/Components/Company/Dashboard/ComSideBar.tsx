import React from "react";
import { MdOutlineSpaceDashboard } from "react-icons/md";
import { AiOutlineLineChart } from "react-icons/ai";
import { BiUser } from "react-icons/bi";
import { HiOutlineClipboardCheck } from "react-icons/hi";
import { NavLink } from "react-router-dom";
import { useTheme } from "../../../Context/ThemeContext";

const ComSideBar: React.FC = () => {
  const isActive = (path: string) => {
    return window.location.pathname === path;
  };
  const { theme } = useTheme();
  return (
    <aside
      className={`bg-[#F9F9F9] text-[#1E1E1E99] w-[207px] p-4 font-cabinet ${
        theme === "light" ? "bg-[#F7F9FB]" : "dark:bg-gray-700 text-white"
      }`}
    >
      <h1 className="text-blue-500 ml-6 text-2xl mt-6">Vester.AI</h1>
      <ul className="mt-[80px] ml-6">
        <li
          className={`mb-10 flex ${
            isActive("/company_dashboard") ? "text-blue-500" : ""
          }`}
        >
          <NavLink to="/company_dashboard" className="flex">
            <MdOutlineSpaceDashboard className="mt-[1px] mr-2 text-2xl" />
            Dashboard
          </NavLink>
        </li>
        <li
          className={`mb-10 flex ${isActive("/score") ? "text-blue-500" : ""}`}
        >
          <NavLink to="/score" className="flex">
            <HiOutlineClipboardCheck className="mt-[1px] mr-2 text-2xl" />
            Score
          </NavLink>
        </li>
        <li
          className={`mb-10 flex ${
            isActive("/Performance") ? "text-blue-500" : ""
          }`}
        >
          <NavLink to="/Performance" className="flex">
            <AiOutlineLineChart className="mt-[1px] mr-2 text-2xl" />
            Performance
          </NavLink>
        </li>
        <li className={`flex ${isActive("/d-admin") ? "text-blue-500" : ""}`}>
          <NavLink to="/d-admin" className="flex">
            <BiUser className="mt-[1px] mr-2 text-2xl" />
            Profile
          </NavLink>
        </li>
      </ul>
    </aside>
  );
};

export default ComSideBar;
