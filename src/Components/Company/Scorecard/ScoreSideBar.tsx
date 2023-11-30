import { MdOutlineSettings } from "react-icons/md";
import { RxBarChart } from "react-icons/rx";
import { BiNetworkChart, BiSolidDashboard } from "react-icons/bi";
import { MdHelp } from "react-icons/md";
import { RiLogoutBoxRFill } from "react-icons/ri";
import { NavLink, useNavigate } from "react-router-dom";
import { useTheme } from "../../../Context/ThemeContext";
import Vester from "../../../assets/Vester.AI.png";

const ScoreSideBar: React.FC = () => {
  const isActive = (path: string) => {
    return window.location.pathname === path;
  };

  const { theme } = useTheme();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("teamscores");
    localStorage.removeItem("marketScores");
    localStorage.removeItem("businessScores");
    localStorage.removeItem("financialScores");
    localStorage.removeItem("governanceScores");
    localStorage.removeItem("companyInfo");
    localStorage.removeItem("companyInfoFailed");
    navigate("/company-login");
  };

  return (
    <div className={`hidden md:flex md:h-[100%] lg:h-[100%]`}>
      <aside
        className={`bg-[#031549] text-white w-[257px] p-4 pr-10 font-poppins flex flex-col justify-between h-full`}
      >
        <div>
          <div>
            <h1 className="mt-6 w-58">
              <img src={Vester} alt="Vester logo" />
            </h1>
          </div>

          <ul className="mt-[30px] ml-6">
            <li
              className={`mb-6 flex ${
                isActive("/company_dashboard")
                  ? theme === "light"
                    ? "text-[#ec7f36] bg-white rounded-2xl pt-2 pb-2 pl-5"
                    : "text-white bg-[#031549] rounded-2xl pt-2 pb-2 pl-5"
                  : "text-[#ec7f36] rounded-2xl pt-2 pb-2 pl-5"
              }`}
            >
              <NavLink
                to="/company_dashboard"
                className="flex hover:transition-transform hover:scale-105"
              >
                <BiSolidDashboard className="mt-[1px] mr-2 text-2xl text-[#ec7f36]" />
                Dashboard
              </NavLink>
            </li>
            <li
              className={`mb-6 flex ${
                isActive("/score")
                  ? theme === "light"
                    ? "text-[#ec7f36] bg-white rounded-2xl pt-2 pb-2 pl-5"
                    : "text-white bg-[#031549] rounded-2xl pt-2 pb-2 pl-5"
                  : "text-[#ec7f36] rounded-2xl pt-2 pb-2 pl-5"
              }`}
            >
              <NavLink
                to="/score"
                className="flex hover:transition-transform hover:scale-105"
              >
                <RxBarChart className="mt-[1px] mr-2 text-2xl text-[#ec7f36]" />
                Vester Score
              </NavLink>
            </li>
            {/* <li
              className={`mb-6 flex ${
                isActive("/Performance")
                  ? theme === "light"
                    ? "text-[#ec7f36] bg-white rounded-2xl pt-2 pb-2 pl-5"
                    : "text-white bg-[#031549] rounded-2xl pt-2 pb-2 pl-5"
                  : "text-[#ec7f36] rounded-2xl pt-2 pb-2 pl-5"
              }`}
            >
              <NavLink
                to="/Performance"
                className="flex hover:transition-transform hover:scale-105"
              >
                <BiNetworkChart className="mt-[1px] mr-2 text-2xl text-[#ec7f36]" />
                Investor Match
              </NavLink>
            </li> */}
            <li
              className={`flex ${
                isActive("/profile-update")
                  ? theme === "light"
                    ? "text-[#ec7f36] bg-white rounded-2xl pt-2 pb-2 pl-5"
                    : "text-white bg-[#031549] rounded-2xl pt-2 pb-2 pl-5"
                  : "text-[#ec7f36] rounded-2xl pt-2 pb-2 pl-5"
              }`}
            >
              <NavLink
                to="/profile-update"
                className="flex hover:transition-transform hover:scale-105"
              >
                <MdOutlineSettings className="mt-[1px] mr-2 text-2xl text-[#ec7f36]" />
                Profile
              </NavLink>
            </li>
          </ul>
        </div>

        <div>
          <li
            className={`mb-4 flex ${
              isActive("")
                ? theme === "light"
                  ? "text-[#ec7f36] bg-white rounded-2xl pt-2 pb-2 pl-5"
                  : "text-white bg-[#031549] rounded-2xl pt-2 pb-2 pl-5"
                : "text-[#ec7f36] rounded-2xl pt-2 pb-2 pl-5"
            }`}
          >
            <a
              href="/company-login"
              className="flex hover:transition-transform hover:scale-105"
            >
              <RiLogoutBoxRFill className="mt-[1px] mr-2 text-2xl text-[#ec7f36]" />
              <button onClick={handleLogout} className="mr-2 pointer">
                Logout
              </button>
            </a>
          </li>

          <li
            className={`mb-4 flex ${
              isActive("")
                ? theme === "light"
                  ? "text-[#ec7f36] bg-white rounded-2xl pt-2 pb-2 pl-5"
                  : "text-white bg-[#031549] rounded-2xl pt-2 pb-2 pl-5"
                : "text-[#ec7f36] rounded-2xl pt-2 pb-2 pl-5"
            }`}
          >
            <NavLink
              to="/d-admin"
              className="flex hover:transition-transform hover:scale-105"
            >
              <MdHelp className="mt-[1px] mr-2 text-2xl text-[#ec7f36]" />
              Help
            </NavLink>
          </li>
        </div>
      </aside>
    </div>
  );
};

export default ScoreSideBar;
