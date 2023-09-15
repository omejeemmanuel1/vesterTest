import React from "react";
import { useTheme } from "../../../Context/ThemeContext";

const Activity: React.FC = () => {
  const { theme } = useTheme();
  return (
    <>
      <div
        className={`w-[312px] h-[269px] bg-[#F7F9FB] rounded-xl p-[24px] shadow-md ${
          theme === "light" ? "bg-[#F7F9FB]" : "dark:bg-gray-700 text-white"
        }`}
      >
        <h2>See those investing 🚀</h2>
        <small>
          Investors who are currently investing in companies actively
        </small>
        <ul className="flex space-x-6 text-sm mt-6">
          <li>Nnamuka C</li>
          <li>Pre-seed+</li>
          <li>Reach out</li>
        </ul>

        <ul className="flex space-x-6 text-sm mt-6">
          <li>Nnamuka C</li>
          <li>Pre-seed+</li>
          <li>Reach out</li>
        </ul>

        <ul className="flex space-x-6 text-sm mt-6">
          <li>Nnamuka C</li>
          <li>Pre-seed+</li>
          <li>Reach out</li>
        </ul>
      </div>
    </>
  );
};

export default Activity;
