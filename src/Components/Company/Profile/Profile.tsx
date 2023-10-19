/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import ComSideBar from "../Dashboard/ComSideBar";
import ComNavBar from "../Dashboard/ComNavBar";
import { Formik, Form, Field } from "formik";
import { useTheme } from "../../../Context/ThemeContext";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";

const initialValues = {
  companyName: "",
  companyMail: "",
  companyWebsite: "",
  oldPassword: "",
  newPassword: "",
};

const baseUrl = import.meta.env.VITE_REACT_APP_BASE_URL;

const Profile: React.FC = () => {
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);

  const { theme } = useTheme();

  const handleTogglePassword = () => {
    setShowOldPassword(!showOldPassword);
  };

  const handleToggleConfirmPassword = () => {
    setShowNewPassword(!showNewPassword);
  };

  const handleSubmit = async (values: any) => {
    try {
      const accessToken = localStorage.getItem("token");

      if (!accessToken) {
        console.error("Access token not found in localStorage");
        toast.error("Access token not found in localStorage");
        return;
      }

      const response = await axios.put(
        `${baseUrl}/auth/update_profile`,
        values,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      if (response.status === 200) {
        console.log("Profile updated successfully");
        toast.success("Profile updated successfully");

        window.location.reload();
      }
    } catch (error: any) {
      if (error.response) {
        const errorMessage = error.response.data?.error || "An error occurred";
        console.log(errorMessage);

        if (errorMessage === "Invalid old password") {
          toast.error("IInvalid old password");
        } else {
          toast.error(errorMessage);
        }
      } else {
        toast.error("Server is not responding. Please try again later.");
      }
    }
  };

  return (
    <div
      className={`flex bg-white ${
        theme === "light"
          ? "bg-[#C0C0F5] bg-opacity-10 font-cabinet text-[#000D80] overflow-hidden"
          : "dark:bg-gray-800 text-white "
      }`}
    >
      <div>
        <ComSideBar marginTop="400px" />
      </div>

      <div className="flex-1">
        <ComNavBar />
        <div>
          <div className="w-[350px] md:w-[700px] ml-[12px] mt-6 mb-6 md:ml-52 h-[780px] rounded-2xl shadow-md border border-gray-400">
            <Formik initialValues={initialValues} onSubmit={handleSubmit}>
              <Form className="m-2 md:p-8 border-gray-400 font-cabinet w-[683px]">
                <h2 className="text-xl md:text-[32px] font-semibold mb-4">
                  Company Profile
                </h2>
                <div className="mb-8">
                  <label
                    htmlFor="companyName"
                    className="block text-sm font-cabinet"
                  >
                    Company Name
                  </label>
                  <Field
                    type="text"
                    id="companyName"
                    name="companyName"
                    className="mt-1 p-2 w-[330px] md:w-full border rounded"
                  />
                </div>
                <div className="mb-8">
                  <label htmlFor="companyMail" className="block text-sm ">
                    Company mail
                  </label>
                  <Field
                    type="text"
                    id="companyMail"
                    name="companyMail"
                    className="mt-1 p-2 w-[330px] md:w-full border rounded"
                  />
                </div>
                <div className="mb-8">
                  <label htmlFor="companyWebsite" className="block text-sm">
                    Company website
                  </label>
                  <Field
                    type="text"
                    id="companyWebsite"
                    name="companyWebsite"
                    className="mt-1 p-2 w-[330px] md:w-full border rounded"
                  />
                </div>

                <div className="mb-4">
                  <h2>Change Password</h2>
                </div>

                <div className="mb-8">
                  <label htmlFor="oldPassword" className="block text-sm">
                    Old Password
                  </label>
                  <div className="relative">
                    <Field
                      type={showOldPassword ? "text" : "oldPassword"}
                      id="oldPassword"
                      name="oldPassword"
                      className="mt-1 p-2 w-[330px] md:w-full border rounded"
                    />
                    <button
                      type="button"
                      onClick={handleTogglePassword}
                      className="absolute top-1/2 md:left-[590px] left-[300px] transform -translate-y-1/2 text-gray-500"
                    >
                      {showOldPassword ? (
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
                </div>

                <div className="mb-8">
                  <label htmlFor="newPassword" className="block text-sm">
                    New Password
                  </label>
                  <div className="relative">
                    <Field
                      type={showNewPassword ? "text" : "password"}
                      id="newPassword"
                      name="newPassword"
                      className="mt-1 p-2 w-[330px] md:w-full border rounded"
                    />
                    <button
                      type="button"
                      onClick={handleToggleConfirmPassword}
                      className="absolute top-1/2 md:left-[590px] left-[300px] transform -translate-y-1/2 text-gray-500"
                    >
                      {showNewPassword ? (
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
                </div>
                <button
                  type="submit"
                  className="bg-[#000D80] text-white py-2 px-4 rounded hover:bg-blue-600 w-[330px] md:w-full"
                >
                  Save Changes
                </button>
              </Form>
            </Formik>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Profile;
