/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext } from "react";
import { apiPassPost, apiPost, apiResetPost } from "./axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const dataContext = createContext<undefined | any>(undefined);

const DataProvider = ({ children }: any) => {
  const comp_register = async (registerData: any) => {
    try {
      const response = await apiPost("/auth/signup", registerData);
      console.log(response.data);

      sessionStorage.setItem("userEmail", registerData.companyMail);

      toast.success("Registration successful! You can now log in.");
      window.location.href = "/verify-link";
    } catch (error: any) {
      if (error.response) {
        const errorMessage = error.response.data?.error || "An error occurred";
        toast.error(errorMessage);
      } else {
        toast.error("Server is not responding. Please try again later.");
      }
    }
  };

  const fetchUserEmail = async () => {
    const userEmailFromSession = sessionStorage.getItem("userEmail");
    console.log("User email from session:", userEmailFromSession);

    if (userEmailFromSession) {
      return userEmailFromSession;
    } else {
      console.log("User email not found in session");
      return null;
    }
  };

  const comp_login = async (loginData: any) => {
    try {
      await apiPost("/auth/login", loginData).then((res) => {
        console.log(res);
        localStorage.setItem("token", res.data?.token);
        toast.success("Login successful");
        window.location.href = "/company_dashboard";
      });
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

  const forgot_password = async (passwordData: any) => {
    try {
      await apiPost("/auth/forgot_password", passwordData).then((res) => {
        console.log(res);
        console.log(
          "Setting reset_email in session:",
          passwordData.companyMail
        );
        sessionStorage.setItem("reset_email", passwordData.companyMail);

        toast.success("Password reset otp sent to your email");
        window.location.href = "/verify-otp";
      });
    } catch (error: any) {
      if (error.response) {
        const errorMessage = error.response.data?.error || "An error occurred";
        console.log(errorMessage);

        if (errorMessage === "Email not found or not verified") {
          toast.error(
            "Email not found or not verified. Please check your credentials."
          );
        } else {
          toast.error(errorMessage);
        }
      } else {
        toast.error("Server is not responding. Please try again later.");
      }
    }
  };

  const verify_otp = async (otpData: any) => {
    try {
      const response = await apiPassPost("/auth/verify_otp", otpData);

      console.log(response.data);

      toast.success("OTP verified successfully");
      window.location.href = "/reset-password";
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

  const reset_password = async (passwordData: any) => {
    try {
      await apiResetPost("/auth/reset_password", passwordData); // No need to pass headers here
      toast.success("Password reset successfully");
      window.location.href = "/password-created";
    } catch (error: any) {
      if (error.response) {
        const errorMessage = error.response.data?.error || "An error occurred";
        console.log(errorMessage);

        if (errorMessage === "Email not found in session") {
          toast.error(
            "Email not found in session. Please check your credentials."
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
    <dataContext.Provider
      value={{
        comp_register,
        fetchUserEmail,
        comp_login,
        forgot_password,
        verify_otp,
        reset_password,
      }}
    >
      {children}
      <ToastContainer />
    </dataContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(dataContext);
  if (context === null) {
    throw new Error("useAuth must be used within a DataProvider");
  }
  return context;
};

export default DataProvider;
