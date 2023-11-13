/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { validationSchema } from "../formValidate";
import { useAuth } from "../../../Context/authContext";
import Bg from "../../../assets/bg.png";
import { FiPhoneCall } from "react-icons/fi";
import { TbShieldLock } from "react-icons/tb";
import { MdOutlineEmail } from "react-icons/md";
import { BiUser } from "react-icons/bi";
import Logo from "../../../assets/Vester.AI2.png";

const initialValues = {
  fullName: "",
  phone: "",
  investorMail: "",
  password: "",
  confirmPassword: "",
  agreeToTerms: false,
};

const Registration: React.FC = () => {
  const { invest_register } = useAuth();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  const handleToggleConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const handleSubmit = async (values: typeof initialValues) => {
    try {
      const response = await invest_register(values);

      console.log(response);
    } catch (error: any) {
      console.log(error.response.data.message);
    }
  };

  return (
    <>
      <div
        className="min-h-screen flex items-center justify-center"
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
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          <Form className="m-6 bg-white p-8 rounded-2xl shadow-md border border-gray-400 font-poppins w-[422px]">
            <h2 className="text-xl md:text-[32px] font-semibold mb-4 text-[#0A0A3F]">
              Create Account
            </h2>
            <div className="mb-4">
              <label
                htmlFor="fullName"
                className="flex items-center text-sm text-[#0A0A3F]"
              >
                <BiUser /> <span className="ml-2"> Full name* </span>
              </label>
              <Field
                type="text"
                id="fullName"
                name="fullName"
                placeholder="full name"
                className="mt-1 p-2 w-full border rounded"
              />
              <ErrorMessage
                name="fullName"
                component="p"
                className="text-red-500 text-sm"
              />
            </div>

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
                htmlFor="phone"
                className="flex items-center text-sm text-[#0A0A3F]"
              >
                <FiPhoneCall /> <span className="ml-2"> Phone number* </span>
              </label>
              <Field
                type="text"
                id="phone"
                name="phone"
                placeholder=""
                className="mt-1 p-2 w-full border rounded"
              />
              <ErrorMessage
                name="phone"
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
            <div className="mb-4">
              <label
                htmlFor="confirmPassword"
                className="flex items-center text-sm text-[#0A0A3F]"
              >
                <TbShieldLock /> <span className="ml-2"> Confirm Password</span>
              </label>
              <div className="relative">
                <Field
                  type={showConfirmPassword ? "text" : "password"}
                  id="confirmPassword"
                  name="confirmPassword"
                  className="mt-1 p-2 w-full border rounded"
                />
                <button
                  type="button"
                  onClick={handleToggleConfirmPassword}
                  className="absolute top-1/2 right-2 transform -translate-y-1/2 text-gray-500"
                >
                  {showConfirmPassword ? (
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
                name="confirmPassword"
                component="p"
                className="text-red-500 text-sm"
              />
            </div>

            <div className="mb-4">
              <Field
                type="checkbox"
                id="agreeToTerms"
                name="agreeToTerms"
                className="mr-2"
              />
              <label htmlFor="agreeToTerms" className="text-sm">
                I agree to all the Terms and Privacy Policy
              </label>
              <ErrorMessage
                name="agreeToTerms"
                component="p"
                className="text-red-500 text-sm"
              />
            </div>
            <button
              type="submit"
              className="bg-[#031549] text-white py-2 px-4 rounded hover:bg-blue-600 w-full"
            >
              Create Account
            </button>
            <div className="mt-4 text-sm text-gray-600 text-center">
              Already have an account?{" "}
              <Link to="/investor-login" className="text-[#000D80]">
                Login
              </Link>
            </div>
          </Form>
        </Formik>
      </div>
    </>
  );
};

export default Registration;
