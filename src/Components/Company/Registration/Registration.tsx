/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { validationSchema } from "../formValidate";
import { useAuth } from "../../../Context/authContext";
import Bg from "../../../assets/bg.png";

const sectors = [
  "Technology",
  "Healthcare",
  "Retail",
  "Finance",
  "Automotive",
  "Agriculture",
  "Real Estate",
];

const initialValues = {
  companyName: "",
  companyWebsite: "",
  companyMail: "",
  password: "",
  confirmPassword: "",
  companySector: "",
  agreeToTerms: false,
};

const Registration: React.FC = () => {
  const { comp_register } = useAuth();

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
      const response = await comp_register(values);

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
                htmlFor="companyName"
                className="block text-sm text-[#0A0A3F]"
              >
                What is your company name?*
              </label>
              <Field
                type="text"
                id="companyName"
                name="companyName"
                placeholder="Company Name"
                className="mt-1 p-2 w-full border rounded"
              />
              <ErrorMessage
                name="companyName"
                component="p"
                className="text-red-500 text-sm"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="companyWebsite"
                className="block text-sm text-[#0A0A3F]"
              >
                What is your company website?*
              </label>
              <Field
                type="text"
                id="companyWebsite"
                name="companyWebsite"
                placeholder="www.companyWebsite.com"
                className="mt-1 p-2 w-full border rounded"
              />
              <ErrorMessage
                name="companyWebsite"
                component="p"
                className="text-red-500 text-sm"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="companyMail"
                className="block text-sm text-[#0A0A3F]"
              >
                What is your company mail?*
              </label>
              <Field
                type="text"
                id="companyMail"
                name="companyMail"
                placeholder="companyMail@company.com"
                className="mt-1 p-2 w-full border rounded"
              />
              <ErrorMessage
                name="companyMail"
                component="p"
                className="text-red-500 text-sm"
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="password"
                className="block text-sm text-[#0A0A3F]"
              >
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
            <div className="mb-4">
              <label
                htmlFor="companySector"
                className="block text-sm text-[#0A0A3F]"
              >
                What is your company sector?*
              </label>
              <Field
                as="select"
                id="companySector"
                name="companySector"
                className="mt-1 p-2 w-full border rounded"
              >
                <option value=""></option>
                {sectors.map((sector) => (
                  <option key={sector} value={sector}>
                    {sector}
                  </option>
                ))}
              </Field>
              <ErrorMessage
                name="companySector"
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
              <Link to="/comp-login" className="text-[#000D80]">
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
