/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { Formik, Form, FieldArray, Field, ErrorMessage } from "formik";
import { BsTrash } from "react-icons/bs";
import * as Yup from "yup";

interface MarketScore2props {
  onSubmit: (values: typeof initialValues) => void;
}

const initialValues = {
  competitors: [{ name: "", website: "" }],
  servicable_adressable_market: "",
  evidenceUrl: "",
};

const validationSchema = Yup.object().shape({
  competitors: Yup.array().of(
    Yup.object().shape({
      name: Yup.string().required("Name is required"),
      website: Yup.string().required("Website is required"),
    })
  ),

  servicable_adressable_market: Yup.string().required(
    "select the serviceable addreassable market"
  ),
  evidenceUrl: Yup.string()
    .url("Please enter a valid URL")
    .required("Link to to your market claim is required"),
});

const MarketScore2: React.FC<MarketScore2props> = ({ onSubmit }) => {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        {(formikProps) => (
          <Form className="m-6 p-8 rounded-2xl shadow-md border border-gray-400 font-cabinet w-[422px]">
            <div className="mb-4">
              <label htmlFor="competitors" className="block text-sm">
                Share the website link(s) of your most direct competitor(s) in
                the market <span className="text-red-500">*</span>
              </label>
              <FieldArray name="competitors">
                {(arrayHelpers: any) => (
                  <div>
                    {formikProps.values.competitors.map((_, index: number) => (
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
                    ))}
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
              <label
                htmlFor="servicable_adressable_market"
                className="block text-sm"
              >
                What is your serviceable addressable market
                <span className="text-red-500">*</span>
              </label>
              <Field
                as="select"
                id="servicable_adressable_market"
                name="servicable_adressable_market"
                className="mt-1 p-2 w-full border rounded"
              >
                <option value="">Select serviceable addressable market</option>
                <option value="Over $10bn">Over $10bn</option>
                <option value="0ver $5bn">Over $5bn</option>
                <option value="Over $1bn">Over $1bn</option>
                <option value="$500m-$1bn">$500m-$1bn</option>
                <option value="$100m-$500m">$100m-$500m</option>
              </Field>
              <ErrorMessage
                name="serviceableAddreassableMarket"
                component="p"
                className="text-red-500 text-sm"
              />
            </div>

            <div className="mb-4">
              <label htmlFor=" evidenceUrl" className="block text-sm">
                Share a link to a report or reputable source that shows to the
                size of your market and provides a commercial market size
                estimate (preferably in dollars):{" "}
                <span className="text-red-500">*</span>
              </label>
              <Field
                type="text"
                id="evidenceUrl"
                name="evidenceUrl"
                className="mt-1 p-2 w-full border rounded"
              />
              <ErrorMessage
                name="evidenceUrl"
                component="p"
                className="text-red-500 text-sm"
              />
            </div>

            <button
              type="submit"
              className="bg-[#000D80] text-white py-2 px-4 rounded hover:bg-blue-600 w-full"
            >
              Next
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default MarketScore2;
