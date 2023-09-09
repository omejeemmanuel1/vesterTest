import React, { useState } from "react";
import { HiOutlineUpload } from "react-icons/hi";
import progressBar from "../../../assets/progressbar.png";
import { Link, useNavigate } from "react-router-dom";
import Modal from "react-modal";
import PitchDeckStep from "../PitchDeck/PitchDeckStep";
import PitchDeckUpload from "../PitchDeck/PitchDeckUpload";

// Define custom class names for modal overlay and content
const overlayClassName = "modal-overlay";

Modal.setAppElement("#root");

const ProfileCard: React.FC = () => {
  const [isPitchDeckStepOpen, setIsPitchDeckStepOpen] = useState(false);
  const [isPitchDeckUploadOpen, setIsPitchDeckUploadOpen] = useState(false);

  const navigate = useNavigate();

  const openPitchDeckStepModal = () => {
    setIsPitchDeckStepOpen(true);
  };

  const closePitchDeckStepModal = () => {
    setIsPitchDeckStepOpen(false);
  };

  const openPitchDeckUploadModal = () => {
    setIsPitchDeckStepOpen(false);
    setIsPitchDeckUploadOpen(true);
  };

  const closePitchDeckUploadModal = () => {
    setIsPitchDeckUploadOpen(false);
  };

  const handleUploadSuccess = () => {
    setIsPitchDeckUploadOpen(false);
    navigate("/company_dashboard");
  };

  return (
    <div>
      <h2 className="mt-8 ml-10 mb-4">Complete Your Profile</h2>
      <div className="flex space-x-6">
        <div className="flex ml-10 space-x-[30px] w-[836px]">
          <Link to="/team-info" className="h-[108px]">
            <div className="bg-[rgb(0,13,128)] p-[16px] text-xl text-white w-[263px] rounded-2xl">
              <div className="relative h-[20px]">
                <img src={progressBar} alt="" />
                <span className="transform -translate-x-1/2 -translate-y-1/2 text-xs text-white">
                  60% COMPLETE
                </span>
              </div>
              <h2 className="mt-8">Your Profile</h2>
            </div>
          </Link>
          <div
            className="text-[#0A0A3F] text-xl bg-[#C0C0F5] p-[16px] h-[108px] w-[263px] rounded-2xl cursor-pointer"
            onClick={openPitchDeckStepModal}
          >
            <HiOutlineUpload />
            <h2 className="mt-8">Upload company data</h2>
          </div>
          {isPitchDeckStepOpen && (
            <Modal
              isOpen={isPitchDeckStepOpen}
              onRequestClose={closePitchDeckStepModal}
              overlayClassName={overlayClassName}
              className="absolute top-[0px] left-[0px] bg-black bg-opacity-60 w-full h-full"
            >
              <PitchDeckStep
                openPitchDeckUploadModal={openPitchDeckUploadModal}
                closePitchDeckStepModal={closePitchDeckStepModal}
              />
            </Modal>
          )}

          {isPitchDeckUploadOpen && (
            <Modal
              isOpen={isPitchDeckUploadOpen}
              onRequestClose={closePitchDeckUploadModal}
              overlayClassName={overlayClassName}
              className="absolute top-[0px] left-[0px] bg-black bg-opacity-60 w-full h-full"
            >
              <PitchDeckUpload
                closePitchDeckUploadModal={handleUploadSuccess}
              />
            </Modal>
          )}

          <div className="bg-[#C0C0F5] text-xl text-[#0A0A3F] p-[16px] h-[108px] w-[263px] rounded-2xl">
            <HiOutlineUpload />
            <h2 className="mt-8">Upload funding data</h2>
          </div>
        </div>
        <div className="w-[312px] h-[269px] bg-[#F7F9FB] rounded-xl p-[24px]">
          <h2>See those investing 🚀</h2>
          <small className="text-[#1E1E1E99]">
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
      </div>
    </div>
  );
};

export default ProfileCard;
