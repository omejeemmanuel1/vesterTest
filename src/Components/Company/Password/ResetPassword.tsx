/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { resetSchema } from "../formValidate";
import { useAuth } from "../../../Context/authContext";
// import Logo from "../../../assets/Vester.AI2.png";
import Bg from "../../../assets/bg.png";
// import { Link } from "react-router-dom";

const initialValues = {
  password: "",
  confirmPassword: "",
};

const ResetPassword: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const { reset_password } = useAuth();

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  const handleToggleConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const handleSubmit = async (values: typeof initialValues) => {
    try {
      const company_mail = sessionStorage.getItem("reset_email");
      await reset_password(
        {
          newPassword: values.password,
          confirmNewPassword: values.confirmPassword,
        },
        company_mail
      );
    } catch (error: any) {
      console.log(error.response.data?.error);
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
        {/* <Link to="/">
          <img
            src={Logo}
            alt="Vester Logo"
            className="w-[200px] absolute top-6 left-[13px]"
          />
          </Link> */}
      <Formik
        initialValues={initialValues}
        validationSchema={resetSchema}
        onSubmit={handleSubmit}
      >
        <Form className="m-6 bg-white p-8 rounded-2xl shadow-md border border-gray-400 font-cabinet w-[422px]">
          <h2 className="text-[32px] font-semibold mb-4 text-[#0A0A3F]">
            Create New Password
          </h2>

          <div className="mb-4">
            <label htmlFor="password" className="block text-sm text-[#0A0A3F]">
              Password
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
              className="block text-sm text-[#0A0A3F]"
            >
              Confirm Password
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
          <button
            type="submit"
            className="bg-[#000D80] text-white py-2 px-4 rounded hover:bg-blue-600 w-full"
          >
            Continue
          </button>
        </Form>
      </Formik>
      </div>
      </>
  );
};

export default ResetPassword;
