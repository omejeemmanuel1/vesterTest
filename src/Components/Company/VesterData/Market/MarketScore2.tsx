/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";
import { Formik, Form, FieldArray, Field, ErrorMessage } from "formik";
import { BsTrash } from "react-icons/bs";
import * as Yup from "yup";
import {
  MdOutlineKeyboardDoubleArrowRight,
  MdOutlineKeyboardDoubleArrowLeft,
} from "react-icons/md";

interface MarketScore2props {
  onSubmit: (values: typeof initialValues) => void;
  isSubmitting: boolean;
  handleBack: () => void;
}

const initialValues = {
  competitors: [{ name: "", website: "" }],
  competitiveAdvantage: "",
};

const validationSchema = Yup.object().shape({
  competitors: Yup.array().of(
    Yup.object().shape({
      name: Yup.string().required("Name is required"),
      website: Yup.string().required("Website is required"),
    })
  ),
  competitiveAdvantage: Yup.string()
    .required("Competitive advantage is required")
    .max(100, "Competitive advantage must be 100 characters or less"),
});

const MarketScore2: React.FC<MarketScore2props & { step: number }> = ({
  onSubmit,
  isSubmitting,
  handleBack,
  step,
}) => {
  const [formSubmitted] = useState(false);

  useEffect(() => {
    if (formSubmitted) {
      const storedFormValues = localStorage.getItem("marketFormValues2");
      if (storedFormValues) {
        try {
          const parsedValues = JSON.parse(storedFormValues);
          onSubmit(parsedValues);
        } catch (error) {
          console.error("Error parsing stored form values:", error);
        }
      }
    }
  }, [formSubmitted, onSubmit]);

  const initializeFormValues = () => {
    const storedValues = localStorage.getItem("marketFormValues2");
    if (storedValues) {
      try {
        const parsedValues = JSON.parse(storedValues);
        // Ensure the correct structure, including competitors
        return {
          ...initialValues,
          ...parsedValues, // Merge stored values with initial values
          competitors: parsedValues.competitors || initialValues.competitors,
        };
      } catch (error) {
        console.error("Error parsing stored form values:", error);
      }
    }
    return {
      ...initialValues,
      competitors: initialValues.competitors,
    };
  };

  const initialFormValues = initializeFormValues();

  return (
    <div className="min-h-screen flex items-center justify-center md:-mt-10">
      {isSubmitting && (
        <div className="fixed inset-0 flex items-center justify-center space-x-4">
          <div className="absolute inset-0 bg-black opacity-80"></div>
          <div className="w-24 h-24 border-t-4 border-blue-400 border-solid rounded-full animate-spin z-10"></div>
          <p className="z-50 text-white">
            Please wait while your data is being processed...
          </p>
        </div>
      )}
      <Formik
        initialValues={initialFormValues}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          localStorage.setItem("marketFormValues2", JSON.stringify(values));
          onSubmit(values);
        }}
      >
        {(formikProps) => (
          <Form className="bg-white m-6 p-8 rounded-2xl shadow-md border border-gray-400 font-cabinet w-[422px]">
            <div className="mb-4">
              <label htmlFor="competitors" className="block text-sm">
                Share the website link(s) of your most direct competitor(s) in
                the market <span className="text-red-500">*</span>
              </label>
              <FieldArray name="competitors">
                {(arrayHelpers: any) => (
                  <div>
                    {formikProps.values.competitors.map(
                      (_: any, index: number) => (
                        <div key={index} className="mb-2">
                          <div className="flex items-center">
                            <Field
                              type="text"
                              name={`competitors[${index}].name`}
                              placeholder={`Competitor ${index + 1} Name`}
                              className="p-1 w-1/2 border rounded mr-2 text-sm"
                            />
                            <Field
                              type="text"
                              name={`competitors[${index}].website`}
                              placeholder={`Competitor ${index + 1} Website`}
                              className="p-1 w-1/2 border rounded text-sm"
                            />
                            <button
                              type="button"
                              onClick={() => arrayHelpers.remove(index)}
                              className="text-red-500 py-2 px-4 text-xl rounded hover:text-red-700"
                            >
                              <BsTrash />
                            </button>
                          </div>
                          <ErrorMessage
                            name={`competitors[${index}].name`}
                            component="p"
                            className="text-red-500 text-sm"
                          />
                          <ErrorMessage
                            name={`competitors[${index}].website`}
                            component="p"
                            className="text-red-500 text-sm"
                          />
                        </div>
                      )
                    )}
                    {formikProps.values.competitors.length < 3 && (
                      <button
                        type="button"
                        onClick={() =>
                          arrayHelpers.push({ name: "", website: "" })
                        }
                        className="bg-[#000D80] text-white py-1 px-2 rounded hover:bg-blue-600"
                      >
                        Add Competitor
                      </button>
                    )}
                  </div>
                )}
              </FieldArray>
            </div>
            <div className="mb-4">
              <label htmlFor="competitiveAdvantage" className="block text-sm">
                In 100 words or less, tell us what your competitive advantage is
                over the two competitors. Think about what makes you unique -
                technology, speed, cost, quality, convenience, efficiency,
                something else?<span className="text-red-500">*</span>
              </label>
              <Field
                as="textarea"
                id="competitiveAdvantage"
                name="competitiveAdvantage"
                rows={4}
                className="mt-1 p-2 w-full border rounded"
              />
              <ErrorMessage
                name="competitiveAdvantage"
                component="p"
                className="text-red-500 text-sm"
              />
            </div>

            <div className="flex space-x-6">
              {step > 1 && (
                <button
                  onClick={handleBack}
                  className="flex bg-[#031549] items-center justify-center text-white py-2 px-2 rounded-full hover:bg-blue-600 w-full"
                >
                  <MdOutlineKeyboardDoubleArrowLeft />
                  Previous
                </button>
              )}
              <button
                type="submit"
                className="flex bg-[#031549] items-center justify-center text-white py-2 px-2 rounded-full hover:bg-blue-600 w-full"
              >
                Submit form
                <MdOutlineKeyboardDoubleArrowRight />
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default MarketScore2;
