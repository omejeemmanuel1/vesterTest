import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Bg from "../assets/bg.png";

const LoginType: React.FC = () => {
  const [loginType, setLoginType] = useState("");
  const navigate = useNavigate();

  const handleLoginTypeChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setLoginType(event.target.value);
  };

  const handleLogin = () => {
    // Redirect to the selected login type page only if a type is selected
    if (loginType) {
      navigate(`/${loginType}`);
    }
  };

  return (
    <div
      className="min-h-screen flex md:items-center justify-center"
      style={{
        backgroundImage: `url(${Bg})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "contain",
      }}
    >
      <div className="bg-white flex flex-col items-center justify-center h-[250px] rounded-2xl shadow-md border border-gray-400 font-poppins w-[400px] p-6">
        <h1 className="text-xl font-bold mb-4">Who are you signing in as?</h1>
        <div className="border border-gray-400 mt-4 w-full p-2 rounded">
          <label>
            <input
              type="radio"
              value="company-login"
              checked={loginType === "company-login"}
              onChange={handleLoginTypeChange}
            />
            <span className="ml-2">Company/Startup</span>
          </label>
        </div>
        <div className="border border-gray-400 mt-4 w-full p-2 rounded">
          <label>
            <input
              type="radio"
              value="investor-login"
              checked={loginType === "investor-login"}
              onChange={handleLoginTypeChange}
            />
            <span className="ml-2">Investor</span>
          </label>
        </div>
        <button
          onClick={handleLogin}
          className={`bg-[#031549] text-white py-2 px-4 rounded hover:bg-blue-600 mt-4 w-full p2 ${
            !loginType && "opacity-50 cursor-not-allowed"
          }`}
          disabled={!loginType}
        >
          Continue
        </button>
      </div>
    </div>
  );
};

export default LoginType;
