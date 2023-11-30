import { MdOutlineSettings } from "react-icons/md";
import { RxBarChart } from "react-icons/rx";
import { BiNetworkChart, BiSolidDashboard } from "react-icons/bi";
import { MdHelp } from "react-icons/md";
import { RiLogoutBoxRFill } from "react-icons/ri";
import { NavLink, useNavigate } from "react-router-dom";
import { useTheme } from "../../../Context/ThemeContext";
import Vester from "../../../assets/Vester.AI.png";
import Vester2 from "../../../assets/Vester.AI2.png";

interface InvestSideBarProps {
  height: string;
}

const InvestorSideBar: React.FC<InvestSideBarProps> = ({ height }) => {
  const isActive = (path: string) => {
    return window.location.pathname === path;
  };

  const { theme } = useTheme();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("favoritesCount");
    localStorage.removeItem("companyScored");
    localStorage.removeItem("matchingCompaniesCount");
    localStorage.removeItem("matchingCompanies");
    localStorage.removeItem("investorData");
    localStorage.removeItem("preferenceData");
    navigate("/investor-login");
  };

  return (
    <div className={`hidden md:flex ${height}`}>
      <aside
        className={`bg-[#031549] text-white w-[280px] p-4 pr-10 font-poppins ${
          theme === "light"
            ? "bg-[#031549]"
            : "dark:bg-white text-[#031549] w-[257px] p-4 pr-10 font-poppins "
        } flex flex-col justify-between h-full`}
      >
        <div>
          {theme === "light" ? (
            <div>
              <h1 className="mt-6 w-58">
                <img src={Vester} alt="Vester logo" />
              </h1>
            </div>
          ) : (
            <h1 className="mt-6 w-[70%] ml-6">
              <img src={Vester2} alt="Vester logo" />
            </h1>
          )}

          <ul className="mt-[30px]">
            <li
              className={`mb-6 flex ${
                isActive("/investor_dashboard")
                  ? theme === "light"
                    ? "text-[#ec7f36] bg-white rounded-2xl pt-2 pb-2 pl-5"
                    : "text-white bg-[#031549] rounded-2xl pt-2 pb-2 pl-5"
                  : "text-[#ec7f36] rounded-2xl pt-2 pb-2 pl-5"
              }`}
            >
              <NavLink
                to="/investor_dashboard"
                className="flex hover:transition-transform hover:scale-105"
              >
                <BiSolidDashboard className="mt-[1px] mr-2 text-2xl text-[#ec7f36]" />
                Dashboard
              </NavLink>
            </li>
            <li
              className={`mb-6 flex ${
                isActive("/deal-flow")
                  ? theme === "light"
                    ? "text-[#ec7f36] bg-white rounded-2xl pt-2 pb-2 pl-5"
                    : "text-white bg-[#031549] rounded-2xl pt-2 pb-2 pl-5"
                  : "text-[#ec7f36] rounded-2xl pt-2 pb-2 pl-5"
              }`}
            >
              <NavLink
                to="/deal-flow"
                className="flex hover:transition-transform hover:scale-105"
              >
                <RxBarChart className="mt-[1px] mr-2 text-2xl text-[#ec7f36]" />
                Deal Flow
              </NavLink>
            </li>
            <li
              className={`mb-6 flex ${
                isActive("/investment")
                  ? theme === "light"
                    ? "text-[#ec7f36] bg-white rounded-2xl pt-2 pb-2 pl-5"
                    : "text-white bg-[#031549] rounded-2xl pt-2 pb-2 pl-5"
                  : "text-[#ec7f36] rounded-2xl pt-2 pb-2 pl-5"
              }`}
            >
              <NavLink
                to="/investment"
                className="flex hover:transition-transform hover:scale-105"
              >
                <BiNetworkChart className="mt-[1px] mr-2 text-2xl text-[#ec7f36]" />
                Investment mandate
              </NavLink>
            </li>
            <li
              className={`flex ${
                isActive("/investor-profile")
                  ? theme === "light"
                    ? "text-[#ec7f36] bg-white rounded-2xl pt-2 pb-2 pl-5"
                    : "text-white bg-[#031549] rounded-2xl pt-2 pb-2 pl-5"
                  : "text-[#ec7f36] rounded-2xl pt-2 pb-2 pl-5"
              }`}
            >
              <NavLink
                to="/investor-profile"
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
              href="/investor-login"
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

export default InvestorSideBar;
