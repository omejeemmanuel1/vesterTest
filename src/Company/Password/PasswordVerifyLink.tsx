import React from "react";
import MessageIcon from "../../assets/Vector.png";

const PasswordVerifyLink: React.FC = () => {
  const goToMail = () => {
    // Get the user's associated email (replace with your logic)
    const userEmail = "user@example.com";

    // Construct the mailto link
    const mailtoLink = `mailto:${userEmail}`;

    // Redirect the user to the mailto link
    window.location.href = mailtoLink;
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
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
    </div>
  );
};

export default PasswordVerifyLink;
