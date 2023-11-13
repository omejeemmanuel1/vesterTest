/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { loginSchema } from "../formValidate";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Bg from "../../../assets/bg.png";
import { TbShieldLock } from "react-icons/tb";
import { MdOutlineEmail } from "react-icons/md";
import Logo from "../../../assets/Vester.AI2.png";



const baseUrl = import.meta.env.VITE_REACT_APP_BASE_URL;

const initialValues = {
  investorMail: "",
  password: "",
};

const LoginInvestor: React.FC = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (values: typeof initialValues) => {
    try {
      const response = await axios.post(`${baseUrl}/investor/login`, values);

      if (response.data.access_token) {
        localStorage.setItem("token", response.data.access_token);

        navigate("/investor_dashboard");
      } else {
        console.error("Login failed");
      }
    } catch (error: any) {
      if (error.response) {
        const errorMessage = error.response.data?.error || "An error occurred";
        console.log(errorMessage);

        if (errorMessage === "Invalid investorMail or password") {
          toast.error(
            "Invalid investorMail or password. Please check your credentials."
          );
        } else {
          toast.error(errorMessage);
        }
      } else {
        toast.error("Server is not responding. Please try again later.");
      }
    }
  };

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
        <Formik
          initialValues={initialValues}
          validationSchema={loginSchema}
          onSubmit={handleSubmit}
        >
          <Form className="m-6 h-[400px] mt-20 bg-white p-8 rounded-2xl shadow-md border border-gray-400 font-poppins w-[422px]">
            <h2 className="text-xl md:text-[32px] font-semibold mb-4 text-[#0A0A3F]">
              Log in
            </h2>

            <div className="mb-4">
              <label
                htmlFor="investorMail"
                className="flex items-center text-sm text-[#0A0A3F]"
              >
                <MdOutlineEmail />
                <span className="ml-2"> Email* </span>
              </label>
              <Field
                type="text"
                id="investorMail"
                name="investorMail"
                placeholder="investorMail@yahoo.com"
                className="mt-1 p-2 w-full border rounded"
              />
              <ErrorMessage
                name="investorMail"
                component="p"
                className="text-red-500 text-sm"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="password"
                className="flex items-center text-sm text-[#0A0A3F]"
              >
                <TbShieldLock /> <span className="ml-2"> Password </span>
              </label>
              <div className="relative">
                <Field
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  className="mt-1 p-2 w-full border rounded"
                />
                <button
                  type="button"
                  onClick={handleTogglePassword}
                  className="absolute top-1/2 right-2 transform -translate-y-1/2 text-gray-500"
                >
                  {showPassword ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      className="h-6 w-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      className="h-6 w-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M17.6 17.6a8 8 0 10-12.8 0"
                      />
                    </svg>
                  )}
                </button>
              </div>
              <ErrorMessage
                name="password"
                component="p"
                className="text-red-500 text-sm"
              />
            </div>

            <button
              type="submit"
              className="bg-[#031549] text-white py-2 px-4 rounded hover:bg-blue-600 w-full"
            >
              Log in
            </button>
            <div className="mt-4 text-sm text-gray-600 text-center">
              Don't have an account?{" "}
              <Link to="/investor-reg" className="text-[#000D80]">
                Create account
              </Link>
              <div className="mt-4 text-sm text-gray-600 text-center">
                <Link to="/forgotInvest-password" className="text-[#000D80]">
                  Forgot Password ?
                </Link>
              </div>
            </div>
          </Form>
        </Formik>
        <ToastContainer />
      </div>
    </>
  );
};

export default LoginInvestor;
