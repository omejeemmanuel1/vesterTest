/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { FiMoon } from "react-icons/fi";
import { BiSolidMoon } from "react-icons/bi";
import { useTheme } from "../../../Context/ThemeContext";
import Avatar from "../../../assets/man.png";
import { BiLogOut } from "react-icons/bi";
import { NavLink, useNavigate } from "react-router-dom";

interface AdminNavBarProps {
  bgColor?: string;
}

const AdminNavBar: React.FC<AdminNavBarProps> = () => {
  const { theme, toggleTheme } = useTheme();
  console.log(theme);

  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/admin-login");
  };

  return (
    <div className="h-[100px] w-[1440px] p-4 lg:flex bg-[#C0C0F5] font-cabinet bg-opacity-10">
      <nav>
        <div className="flex space-x-[1000px]">
          <div className="flex m-6 text-4xl">Vester.AI</div>
          <div className="flex items-center justify-center space-x-2 p-6">
            {theme === "light" ? (
              <FiMoon
                className={`text-xl cursor-pointer text-[#000D80]`}
                onClick={toggleTheme}
              />
            ) : (
              <BiSolidMoon
                className={`text-xl cursor-pointer`}
                onClick={toggleTheme}
              />
            )}
            <div className="flex text-center m-auto">Admin</div>

            <img src={Avatar} alt="Avatar" className="w-8 h-8 rounded-full" />
            <NavLink
              to="/admin-login"
              className="flex hover:transition-transform hover:scale-105"
            >
              <BiLogOut className="mt-[1px] mr-2 text-2xl" />
              <button onClick={handleLogout} className="mr-2 pointer">
                Logout
              </button>
            </NavLink>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default AdminNavBar;
