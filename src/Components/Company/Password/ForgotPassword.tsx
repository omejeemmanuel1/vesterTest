/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { passwordSchema } from "../formValidate";
import { useAuth } from "../../../Context/authContext";
// import Logo from "../../../assets/Vester.AI2.png";
import Bg from "../../../assets/bg.png";
// import { Link } from "react-router-dom";

const initialValues = {
  companyMail: "",
};

const ForgotPassword: React.FC = () => {
  const { forgot_password } = useAuth();
  const handleSubmit = async (values: typeof initialValues) => {
    try {
      const response = await forgot_password(values); 

      console.log(response);
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
        validationSchema={passwordSchema}
        onSubmit={handleSubmit}
      >
        <Form className="m-6 bg-white p-8 rounded-2xl shadow-md border border-gray-400 font-cabinet w-[422px]">
          <h2 className="text-[32px] font-semibold mb-4 text-[#0A0A3F]">
            Forgot Password
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

export default ForgotPassword;
