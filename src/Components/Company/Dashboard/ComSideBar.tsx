/* eslint-disable @typescript-eslint/no-explicit-any */
import { MdOutlineSpaceDashboard } from "react-icons/md";
import { AiOutlinePieChart } from "react-icons/ai";
import { MdOutlineSettings } from "react-icons/md";
import { RxBarChart } from "react-icons/rx";
import { BiLogOut } from "react-icons/bi";
import { MdHelp } from "react-icons/md";
import { NavLink, useNavigate } from "react-router-dom";
import { useTheme } from "../../../Context/ThemeContext";

const ComSideBar: React.FC = () => {
  const isActive = (path: string) => {
    return window.location.pathname === path;
  };

  const { theme } = useTheme();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("teamscores");
    navigate("/comp-login");
  };
  return (
    <div className="hidden md:flex h-[100%]">
      <aside
        className={`bg-[#083982e2] text-[#fff] w-[257px] p-4 pr-10 font-cabinet ${
          theme === "light" ? "bg-[#083982e2]" : "dark:bg-gray-700 text-white"
        }`}
      >
        <h1 className="text-white ml-6 text-2xl mt-6">Vester.AI</h1>
        <ul className="mt-[80px] ml-6">
          <li
            className={`mb-6 flex ${
              isActive("/company_dashboard")
                ? "text-red-500 bg-white rounded-2xl pt-2 pb-2 pl-5"
                : ""
            }`}
          >
            <NavLink
              to="/company_dashboard"
              className="flex hover:transition-transform hover:scale-105"
            >
              <MdOutlineSpaceDashboard className="mt-[1px] mr-2 text-2xl" />
              Dashboard
            </NavLink>
          </li>
          <li
            className={`mb-6 flex ${
              isActive("/score")
                ? "text-red-500 bg-white rounded-2xl pt-2 pb-2 pl-6"
                : ""
            }`}
          >
            <NavLink
              to="/score"
              className="flex hover:transition-transform hover:scale-105"
            >
              <RxBarChart className="mt-[1px] mr-2 text-2xl" />
              Vester Score
            </NavLink>
          </li>
          <li
            className={`mb-6 flex ${
              isActive("/Performance")
                ? "text-red-500 bg-white rounded-2xl pt-2 pb-2 pl-4"
                : ""
            }`}
          >
            <NavLink
              to="/Performance"
              className="flex hover:transition-transform hover:scale-105"
            >
              <AiOutlinePieChart className="mt-[1px] mr-2 text-2xl" />
              Investor Match
            </NavLink>
          </li>
          <li
            className={`flex ${
              isActive("/d-admin")
                ? "text-red-500 bg-white rounded-2xl p-2 pt-2 pb-2 pl-4"
                : ""
            }`}
          >
            <NavLink
              to="/profile-update"
              className="flex hover:transition-transform hover:scale-105"
            >
              <MdOutlineSettings className="mt-[1px] mr-2 text-2xl" />
              Profile
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
                to="/comp-login"
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

export default ComSideBar;
