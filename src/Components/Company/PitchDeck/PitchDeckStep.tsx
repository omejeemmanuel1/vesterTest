import React from "react";
import one from "../../../assets/1.png";
import two from "../../../assets/2.png";
import three from "../../../assets/3.png";
import Capture1 from "../../../assets/Capture1.png";
import Capture2 from "../../../assets/Capture2.png";
import Capture3 from "../../../assets/Capture3.png";
import { MdOutlineCancel } from "react-icons/md";

interface PitchDeckStepProps {
  openPitchDeckUploadModal: () => void;
  closePitchDeckStepModal: () => void;
}

const PitchDeckStep: React.FC<PitchDeckStepProps> = ({
  openPitchDeckUploadModal,
  closePitchDeckStepModal,
}) => {
  return (
    <div className="md:w-[1098px] w-[360px] md:h-[668px] mx-auto md:text-center text-sm md:justify-center md:items-center font-cabinet shadow-md md:p-6 mt-16 bg-[#F7F9FB] overflow-hidden">
      <span>
        <MdOutlineCancel
          className="text-2xl text-gray-500 relative md:top-4 md:left-[1000px] top-10 left-[300px] cursor-pointer"
          onClick={closePitchDeckStepModal}
        />
      </span>
      <h4 className="text-sm mt-16 ml-2 md:ml-none">
        Here are 3 easy steps to get your company{" "}
        <span className="text-blue-500">investment-ready</span>
      </h4>

      <div className="flex text-center justify-center px-[105px] py-16 md:space-x-16 space-x-10">
        <div>
          <div className="md:ml-[45px]  mb-6">
            <img src={one} alt="" className="md:ml-[65px] mb-6" />
            <img src={Capture1} alt="" />
          </div>
          <h3 className="mb-6">Submit your company info</h3>
          <p className="text-[#717171]">
            Easily upload your investor pitch deck, financial model, and cap
            table using our drag and drop feature
          </p>
        </div>
        <div>
          <div className="md:ml-[40px] mb-6">
            <img src={two} alt="" className="md:ml-[60px] mb-6" />
            <img src={Capture2} alt="" />
          </div>
          <h3 className="mb-6">Verify</h3>
          <p className="text-[#717171]">
            Our team of trained accountants and copywriters will review your
            information and verify you.
          </p>
        </div>
        <div>
          <div className="md:ml-[35px] mb-6">
            <img src={three} alt="" className="md:ml-[65px] mb-6" />
            <img src={Capture3} alt="" />
          </div>
          <h3 className="mb-6">Get your Investment Readiness Score</h3>
          <p className="text-[#717171]">
            Get your investment readiness score once you're verified. It's
            important to know your score.
          </p>
        </div>
      </div>
      <button
        type="button"
        className="bg-[#000D80] text-white md:w-[458px] w-full text-center p-4 rounded hover:bg-blue-700 transition mb-[100px] duration-30"
        onClick={openPitchDeckUploadModal}
      >
        Let's Get Started
      </button>
    </div>
  );
};

export default PitchDeckStep;
