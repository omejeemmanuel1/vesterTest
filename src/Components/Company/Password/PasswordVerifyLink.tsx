/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";
import MessageIcon from "../../assets/Vector.png";
import { useAuth } from "../../../Context/authContext";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Logo from "../../../assets/Vester.AI2.png";
import Bg from "../../../assets/bg.png";
import { Link } from "react-router-dom";

const PasswordVerifyLink: React.FC = () => {
  const { fetchUserEmail } = useAuth();
  const [fetchedEmail, setFetchedEmail] = useState<string | null>(null);

  useEffect(() => {
    const getEmail = async () => {
      try {
        const email = await fetchUserEmail();
        console.log("Email fetched:", email);
        setFetchedEmail(email);
      } catch (error: any) {
        console.log("Error fetching email:", error);
        toast.error(error.error);
      }
    };

    getEmail();
  }, [fetchUserEmail]);

  const goToMail = () => {
    if (fetchedEmail) {
      const emailDomain = fetchedEmail.split("@")[1].toLowerCase();
      let mailUrl;

      switch (emailDomain) {
        case "gmail.com":
          mailUrl = "https://mail.google.com/";
          break;
        case "outlook.com":
          mailUrl = "https://outlook.live.com/";
          break;
        case "yahoo.com":
          mailUrl = "https://mail.yahoo.com/";
          break;
        case "vidare.world":
          mailUrl = "https://mail.google.com/";
          break;
        case "vester.ai":
          mailUrl = "https://mail.google.com/";
          break;
        default:
          console.log(
            "Private Email Provider, please go to your email to verify your email address"
          );
          toast.error(
            "Private Email Provider, please go to your email to verify your email address"
          );
          return;
      }

      window.open(mailUrl, "_blank");
    } else {
      console.log("Email not fetched yet");
      toast.error("Email not fetched yet");
    }
  };

  if (!fetchedEmail) {
    return <div>Loading...</div>;
  }

  return (
       <>
     <div
        className="min-h-screen flex md:items-center justify-center"
        style={{
          backgroundImage: `url(${Bg})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "contain",
        }}
      >
        <Link to="/">
          <img
            src={Logo}
            alt="Vester Logo"
            className="w-[200px] absolute top-6 left-[13px]"
          />
          </Link>
      <div className="bg-whitex rounded-2xl shadow-md border border-gray-400 font-cabinet w-[422px] text-center">
        <h4 className="text-[26px] font-semibold mb-6 text-[#0A0A3F]">
          Check your mail for password reset Otp
        </h4>
        <div className="flex justify-center items-center w-[100px] mb-6 mx-auto ">
          <img src={MessageIcon} alt="" />
        </div>
        <button
          className="bg-[#000D80] text-white py-2 px-4 rounded hover:bg-blue-600 w-full"
          onClick={goToMail}
        >
          Go to mail
        </button>
      </div>
      <ToastContainer />
      </div>
      </>
  );
};

export default PasswordVerifyLink;
