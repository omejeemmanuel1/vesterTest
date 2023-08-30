/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import MessageIcon from "../../assets/Vector.png";
import * as Yup from "yup";
import "react-toastify/dist/ReactToastify.css";
import { useAuth } from "../../Context/authContext";

const validationSchema = Yup.object().shape({
  otp: Yup.array()
    .of(Yup.string().length(1, "Each digit must be 1 character"))
    .length(6, "OTP must be 6 digits")
    .required("OTP is required"),
});

const VerifyOtp: React.FC = () => {
  const { verify_otp } = useAuth();

  const handleKeyUp = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number
  ) => {
    const input = e.currentTarget;
    const nextInputIndex = index + 1;
    const prevInputIndex = index - 1;

    if (input.value.length === 1 && nextInputIndex < 6) {
      const nextInput = document.querySelector(
        `input[name="otp[${nextInputIndex}]"]`
      ) as HTMLInputElement;
      if (nextInput) {
        nextInput.focus();
      }
    } else if (input.value.length === 0 && prevInputIndex >= 0) {
      const prevInput = document.querySelector(
        `input[name="otp[${prevInputIndex}]"]`
      ) as HTMLInputElement;
      if (prevInput) {
        prevInput.value = "";
        prevInput.focus();
      }
    }
  };

  const handlePaste = async (
    e: React.ClipboardEvent<HTMLInputElement>,
    form: any
  ) => {
    e.preventDefault(); // Prevent default paste behavior
    const pastedText = e.clipboardData.getData("text");

    if (/^\d{6}$/.test(pastedText)) {
      const otpArray = pastedText.split("");

      // Use Formik's setFieldValue to update the field values
      for (let i = 0; i < Math.min(otpArray.length, 6); i++) {
        await form.setFieldValue(`otp[${i}]`, otpArray[i]);
      }
    }
  };

  const handleSubmit = async (values: FormValues) => {
    const otpString = values.otp.join("");

    try {
      const response = await verify_otp({
        otp: otpString,
      });
      console.log(response.data);
    } catch (error: any) {
      console.log(error.response.data?.error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <Formik<FormValues>
        initialValues={{ otp: ["", "", "", "", "", ""] }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ ...form }) => (
          <Form className="bg-white p-8 rounded-2xl shadow-md border border-gray-400 font-cabinet w-[422px]">
            <div className="flex justify-center items-center w-[100px] mb-2 mx-auto ">
              <img src={MessageIcon} alt="" />
            </div>
            <p className="text-[#0A0A3F] mb-5 text-sm text-center">
              A 6-digit code has been sent to you via email
            </p>
            <div className="mb-4 flex items-center justify-center space-x-2">
              {[0, 1, 2, 3, 4, 5].map((index) => (
                <Field
                  key={index}
                  type="text"
                  name={`otp[${index}]`}
                  className="border rounded px-3 py-2 text-center w-12"
                  maxLength={1}
                  onKeyUp={(e: any) => handleKeyUp(e, index)}
                  onPaste={(e: any) => handlePaste(e, form)}
                />
              ))}
            </div>
            <ErrorMessage
              name="otp"
              component="p"
              className="text-red-500 text-sm"
            />

            <button
              type="submit"
              className="bg-[#000D80] text-white py-2 px-4 rounded hover:bg-blue-600 w-full"
            >
              Confirm
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default VerifyOtp;

interface FormValues {
  otp: string[];
}
