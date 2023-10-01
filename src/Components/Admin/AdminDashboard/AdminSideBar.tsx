import React from "react";
import { MdOutlineSpaceDashboard } from "react-icons/md";
import { AiOutlineDatabase } from "react-icons/ai";
import { BiLogOut } from "react-icons/bi";
import { MdHelp } from "react-icons/md";
import { NavLink, useNavigate } from "react-router-dom";
import { useTheme } from "../../../Context/ThemeContext";

const AdminSideBar: React.FC = () => {
  const isActive = (path: string) => {
    return window.location.pathname === path;
  };
  const { theme } = useTheme();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/admin-login");
  };
  return (
    <div className="flex h-[100vh]">
      <aside
        className={`bg-[#083982e2] text-[#fff] w-[257px] p-4 pr-10 font-cabinet ${
          theme === "light" ? "bg-[#083982e2]" : "dark:bg-gray-700 text-white"
        }`}
      >
        <h1 className="text-blue-500 ml-6 text-2xl mt-6">Vester.AI</h1>
        <ul className="mt-[80px] ml-6">
          <li
            className={`mb-6 flex ${
              isActive("/AdminDashboard")
                ? "text-red-500 bg-white rounded-2xl pt-2 pb-2 pl-5"
                : ""
            }`}
          >
            <NavLink
              to="/AdminDashboard"
              className="flex hover:transition-transform hover:scale-105"
            >
              <MdOutlineSpaceDashboard className="mt-[1px] mr-2 text-2xl" />
              Dashboard
            </NavLink>
          </li>
          <li
            className={`mb-6 flex ${
              isActive("/data")
                ? "text-red-500 bg-white rounded-2xl pt-2 pb-2 pl-6"
                : ""
            }`}
          >
            <NavLink
              to="/data"
              className="flex hover:transition-transform hover:scale-105"
            >
              <AiOutlineDatabase className="mt-[1px] mr-2 text-2xl" />
              Data's
            </NavLink>
          </li>

          <div className=" fixed top-[700px]">
            <li
              className={`mb-4 flex ${
                isActive("/d-admin")
                  ? "text-red-500 bg-white rounded-2xl p-2"
                  : ""
              }`}
            >
              <NavLink
                to="/admin-login"
                className="flex hover:transition-transform hover:scale-105"
              >
                <BiLogOut className="mt-[1px] mr-2 text-2xl" />
                <button onClick={handleLogout} className="mr-2 pointer">
                  Logout
                </button>
              </NavLink>
            </li>

            <li
              className={`flex ${
                isActive("/d-admin")
                  ? "text-red-500 bg-white rounded-2xl p-2 text-center"
                  : ""
              }`}
            >
              <NavLink
                to="/d-admin"
                className="flex hover:transition-transform hover:scale-105"
              >
                <MdHelp className="mt-[1px] mr-2 text-2xl" />
                Help
              </NavLink>
            </li>
          </div>
        </ul>
      </aside>
    </div>
  );
};

export default AdminSideBar;
