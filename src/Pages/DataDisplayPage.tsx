import React from "react";
import DataDisplay from "../Components/Admin/AdminDashboard/DataDisplay";
import { useTheme } from "../Context/ThemeContext";

const DataDisplayPage: React.FC = () => {
  const { theme } = useTheme();
  return (
    <div
      className={`flex bg-white ${
        theme === "light"
          ? "bg-[#C0C0F5] bg-opacity-10 font-cabinet text-[#000D80]"
          : "dark:bg-gray-800 text-white"
      }`}
    >
      <div>
        <DataDisplay />
      </div>
    </div>
  );
};

export default DataDisplayPage;
