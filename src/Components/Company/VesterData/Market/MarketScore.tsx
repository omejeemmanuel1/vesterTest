/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { marketscoreSchema } from "./marketValidate";
import { Link } from "react-router-dom";
import {
  MdOutlineKeyboardDoubleArrowRight,
  MdOutlineKeyboardDoubleArrowLeft,
} from "react-icons/md";

interface MarketScoreProps {
  onSubmit: (values: typeof initialValues) => void;
  initialValues: typeof initialValues;
}
const initialValues = {
  servicable_adressable_market: "",
  total_adressable_market: "",
  servicable_obtainable_market: "",
};

const MarketScore: React.FC<MarketScoreProps> = ({
  onSubmit,
  initialValues,
}) => {
  return (
    <div className="min-h-screen flex md:items-center justify-center md:-mt-16">
      <Formik
        initialValues={initialValues}
        enableReinitialize={true}
        validationSchema={marketscoreSchema}
        onSubmit={onSubmit}
      >
        <Form className="bg-white m-6 p-8 rounded-2xl shadow-md border border-gray-400 font-cabinet w-[422px]">
          <h2 className="text-[24px] font-semibold">
            What's your Market like?
          </h2>
          <p className="italic text-xs text-red-500 font-thin mb-4">
            * indicates required
          </p>
          <div className="mb-4">
            <label htmlFor="total_adressable_market" className="block text-sm">
              What is the US dollar value of your Total addressable market?
              <span className="text-red-500">*</span>
            </label>
            <Field
              as="select"
              id="total_adressable_market"
              name="total_adressable_market"
              className="mt-1 p-2 w-full border rounded"
            >
              <option value="">Select total addressable market</option>
              <option value="Over $1 trillion">Over $1 trillion</option>
              <option value="$500bn - $1trillion">$500bn - $1trillion</option>
              <option value="$100bn - $500bn">$100bn - $500bn</option>
              <option value="$50bn - $100bn">$50bn - $100bn</option>
              <option value="$10bn - $50bn">$10bn - $50bn</option>
              <option value="$1bn - $10bn">$1bn - $10bn</option>
              <option value="$500m - $1bn">$500m - $1bn</option>
              <option value="$100m - $500m<">$100m - $500m</option>
              <option value="$50m - $100m">$50m - $100m</option>
              <option value="$10m - $50m">$10m - $50m</option>
              <option value="$5m - $10m">$5m - $10m</option>
              <option value="Under $5m">Under $5m</option>
            </Field>
            <ErrorMessage
              name="total_adressable_market"
              component="p"
              className="text-red-500 text-sm"
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="servicable_adressable_market"
              className="block text-sm"
            >
              What is the US dollar value of your serviceable addressable
              market?
              <span className="text-red-500">*</span>
            </label>
            <Field
              as="select"
              id="servicable_adressable_market"
              name="servicable_adressable_market"
              className="mt-1 p-2 w-full border rounded"
            >
              <option value="">Select serviceable addressable market</option>
              <option value="Over $100bn">Over $100bn</option>
              <option value="$50bn - $100bn">$50bn - $100bn</option>
              <option value="$10bn - $50bn">$10bn - $50bn</option>
              <option value="$5bn - $10bn">$5bn - $10bn</option>
              <option value="$1bn - $5bn">$1bn - $5bn</option>
              <option value="$500m-$1bn">$500m-$1bn</option>
              <option value="$100m-$500m">$100m-$500m</option>
              <option value="$50m-$100m">$50m-$100m</option>
              <option value="$10m - $50m">$10m - $50m</option>
              <option value="$5m - $10m">$5m - $10m</option>
              <option value="$1m - $5m">$1m - $5m</option>
              <option value="Under $1m">Under $1m</option>
            </Field>
            <ErrorMessage
              name="servicable_adressable_market"
              component="p"
              className="text-red-500 text-sm"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="servicable_obtainable_market"
              className="block text-sm"
            >
              What is the US dollar value of your serviceable obtainable market?
              <span className="text-red-500">*</span>
            </label>
            <Field
              as="select"
              id="servicable_obtainable_market"
              name="servicable_obtainable_market"
              className="mt-1 p-2 w-full border rounded"
            >
              <option value="">Select serviceable obtainable market</option>
              <option value="Over $5bn">Over $5bn</option>
              <option value="$5bn - $10bn">$5bn - $10bn</option>
              <option value="$500m-$1bn">$1bn - $5bn</option>
              <option value="$500m-$1bn">$500m-$1bn</option>
              <option value="$100m-$500m">$100m-$500m</option>
              <option value="$50m-$100m">$50m-$100m</option>
              <option value="$10m - $50m">$10m - $50m</option>
              <option value="$5m - $10m">$5m - $10m</option>
              <option value="$1m - $5m">$1m - $5m</option>
              <option value="$500k - $1m">$500k - $1m</option>
              <option value="$100k - $500k">$100k - $500k</option>
              <option value="Under $100k">Under $100k</option>
            </Field>
            <ErrorMessage
              name="servicable_obtainable_market"
              component="p"
              className="text-red-500 text-sm"
            />
          </div>

          <div className="flex space-x-6">
            <Link
              to="/company_dashboard"
              className="flex bg-[#031549] justify-center text-white py-2 px-2 rounded-full hover:bg-blue-600 w-full"
            >
              <button className="flex items-center">
                <MdOutlineKeyboardDoubleArrowLeft />
                Dashboard
              </button>
            </Link>
            <button
              type="submit"
              className="flex bg-[#031549] items-center justify-center text-white py-2 px-2 rounded-full hover:bg-blue-600 w-full"
            >
              Next
              <MdOutlineKeyboardDoubleArrowRight />
            </button>
          </div>
        </Form>
      </Formik>
    </div>
  );
};

export default MarketScore;
