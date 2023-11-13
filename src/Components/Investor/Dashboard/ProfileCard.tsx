import React from "react";
import Modal from "react-modal";
import { useTheme } from "../../../Context/ThemeContext";

Modal.setAppElement("#root");

const ProfileCard: React.FC = () => {
  const { theme } = useTheme();

  return (
    <>
      <div
        className={`font-poppins text-center ${
          theme === "light"
            ? "font-poppins text-[#031549]"
            : "dark:bg-[#031549] text-[#031549]"
        }`}
      >
        <h2 className="md:mt-2 ml-5 mb-4"></h2>
      </div>
    </>
  );
};

export default ProfileCard;
