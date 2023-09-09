/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { loginSchema } from "../formValidate";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const initialValues = {
  companyMail: "",
  password: "",
};

const Login: React.FC = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (values: typeof initialValues) => {
    try {
      const response = await axios.post(
        "http://127.0.0.1:5000/auth/login",
        values
      );

      if (response.data.access_token) {
        localStorage.setItem("token", response.data.access_token);

        navigate("/company_dashboard");
      } else {
        console.error("Login failed");
      }
    } catch (error: any) {
      if (error.response) {
        const errorMessage = error.response.data?.error || "An error occurred";
        console.log(errorMessage);

        if (errorMessage === "Invalid email or password") {
          toast.error(
            "Invalid email or password. Please check your credentials."
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
    <div className="min-h-screen flex items-center justify-center">
      <Formik
        initialValues={initialValues}
        validationSchema={loginSchema}
        onSubmit={handleSubmit}
      >
        <Form className="bg-white p-8 rounded-2xl shadow-md border border-gray-400 font-cabinet w-[422px]">
          <h2 className="text-[32px] font-semibold mb-4 text-[#0A0A3F]">
            Log in
          </h2>

          <div className="mb-4">
            <label
              htmlFor="companyMail"
              className="block text-sm text-[#0A0A3F]"
            >
              Company mail?*
            </label>
            <Field
              type="text"
              id="companyMail"
              name="companyMail"
              className="mt-1 p-2 w-full border rounded"
            />
            <ErrorMessage
              name="companyMail"
              component="p"
              className="text-red-500 text-sm"
            />
          </div>

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

          <button
            type="submit"
            className="bg-[#000D80] text-white py-2 px-4 rounded hover:bg-blue-600 w-full"
          >
            Log in
          </button>
          <div className="mt-4 text-sm text-gray-600 text-center">
            Don't have an account?{" "}
            <Link to="/comp-reg" className="text-[#000D80]">
              Create account
            </Link>
            <div className="mt-4 text-sm text-gray-600 text-center">
              <Link to="/forgot-password" className="text-[#000D80]">
                Forgot Password ?
              </Link>
            </div>
          </div>
        </Form>
      </Formik>
      <ToastContainer />
    </div>
  );
};

export default Login;
