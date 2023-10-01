/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { useTheme } from "../../../Context/ThemeContext";
import DataDisplayPage from "../../../Pages/DataDisplayPage";

const AdminDashboard: React.FC = () => {
  const { theme } = useTheme();

  return (
    <div
      className={`flex bg-white overflow-hidden ${
        theme === "light"
          ? "bg-[#C0C0F5] bg-opacity-10 font-cabinet text-[#000D80]"
          : "dark:bg-gray-800 text-white"
      }`}
    >
      <div className="flex-1">
        <div>
          <DataDisplayPage />
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
