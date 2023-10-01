import React, { useEffect } from "react";
import { useTheme } from "../../../Context/ThemeContext";
import Aos from "aos";
import "aos/dist/aos.css";

const ProCon: React.FC = () => {
  const { theme } = useTheme();

  useEffect(() => {
    Aos.init({ duration: 3000 });
  }, []);
  return (
    <div>
      <div className="flex space-x-14 font-cabinet ">
        <div
          data-aos="slide-right"
          className={`bg-[#F7F9FB] w-[635px] rounded-md shadow-md ${
            theme === "light" ? "bg-[#F7F9FB]" : "dark:bg-gray-600 text-white"
          }`}
        >
          <ol className="list-decimal m-10">
            <h2 className="text-[18px] text-black">Pros</h2>
            <li className="mt-2 text-sm">
              <span className="font-bold text-black">Strong User Base:</span>{" "}
              Instagram boasts a massive user base, offering a wide reach for
              advertisers and potential revenue resources.
            </li>
            <li className="mt-2 text-sm">
              <span className="font-bold text-black">Visual Platform:</span>{" "}
              Being a visual-centric platform, Instagram attracts businesses
              looking to showcase their products or services in a visually
              appealing manner.
              <li className="mt-2 text-sm">
                <span className="font-bold text-black">Engagement:</span> High
                engagement levels on Instagram make it an attractive advertising
                platform, allowing companies to connect with their audience more
                effectively.
              </li>
            </li>
          </ol>

          <ol className="list-decimal m-10">
            <h2 className="text-[18px] text-black">Cons</h2>
            <li className="mt-2 text-sm">
              <span className="font-bold text-black">Platform Dependence:</span>{" "}
              Platform Dependence: As a subsidiary of Facebook, Instagram's
              success is tied to the parent company's decisions and changes in
              policies.
            </li>
            <li className="mt-2 text-sm">
              <span className="font-bold text-black">Algorithm Changes:</span>{" "}
              Frequent changes to the platform's algorithm can impact user
              engagement and visibility for businesses.
            </li>
            <li className="mt-2 text-sm">
              <span className="font-bold text-black">Privacy Concerns:</span>{" "}
              Like other social media platforms, Instagram faces scrutiny over
              data privacy and user information handling.
            </li>
          </ol>
          <div className="m-10">
            <h2 className="text-[18px] text-black">Summary</h2>
            <p className="text-sm">
              Your company has currently raised a sufficient amount of money
              which is quite positive. Also you have been able to stand out
              amongst all your competitors, because of your business model which
              makes you get an A+ rating in the market .
            </p>
          </div>
        </div>
        <div
          data-aos="slide-left"
          className={`bg-[#F7F9FB] w-[488px] shadow-md rounded-md ${
            theme === "light" ? "bg-[#F7F9FB]" : "dark:bg-gray-600 text-white"
          }`}
        >
          <div className="m-10">
            <h1 className="text-black text-[18px]">Score Rating Meaning</h1>
            <div className="flex space-x-4 mt-6">
              <h1 className="bg-[#4CAF50] text-white text-[18px] w-[41px] h-[28px] rounded text-center items-center justify-center">
                A+
              </h1>
              <p>You are completely ready for investments</p>
            </div>
            <div className="flex space-x-4 mt-6">
              <h1 className="bg-[#1B1B1B] text-white text-[18px] w-[41px] h-[28px] rounded text-center items-center justify-center">
                A
              </h1>
              <p>You are ready for investments.</p>
            </div>
            <div className="flex space-x-4 mt-6">
              <h1 className="bg-[#A9147F] text-white text-[18px] w-[41px] h-[28px] rounded text-center items-center justify-center">
                B
              </h1>
              <p>
                You are ready for investments, but you need to improve in some
                things
              </p>
            </div>
            <div className="flex space-x-4 mt-6">
              <h1 className="bg-[#000D80] text-white text-[18px] w-[41px] h-[28px] rounded text-center items-center justify-center">
                C
              </h1>
              <p>
                You are almost ready for investments, you need to work on some
                things.
              </p>
            </div>
            <div className="flex space-x-4 mt-6">
              <h1 className="bg-[#FFB800] text-white text-[18px] w-[41px] h-[28px] rounded text-center items-center justify-center">
                D
              </h1>
              <p>You are not ready for investment, but you are close.</p>
            </div>
            <div className="flex space-x-4 mt-6">
              <h1 className="bg-[#B87D5C] text-white text-[18px] w-[41px] h-[28px] rounded text-center items-center justify-center">
                E
              </h1>
              <p>
                You are not ready for investment, although you're on the right
                track.
              </p>
            </div>
            <div className="flex space-x-4 mt-6">
              <h1 className="bg-[#E50909] text-white text-[18px] w-[41px] h-[28px] rounded text-center items-center justify-center">
                F
              </h1>
              <p>
                You are not ready for investment, and you are not on the right
                track.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProCon;
