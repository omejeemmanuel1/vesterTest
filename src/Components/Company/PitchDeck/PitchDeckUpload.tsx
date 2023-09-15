/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import { useFormik } from "formik";
import axios from "axios";
import { useDropzone } from "react-dropzone";
import DownloadIcon from "../../../assets/Downloading.png";
import { MdOutlineArrowBackIosNew } from "react-icons/md";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import { useNavigate } from "react-router-dom";

const baseUrl = import.meta.env.VITE_REACT_APP_BASE_URL;
interface PitchDeckUploadProps {
  closePitchDeckUploadModal: () => void;
}

const getAccessToken = () => {
  return localStorage.getItem("token");
};

const PitchDeckUpload: React.FC<PitchDeckUploadProps> = ({
  closePitchDeckUploadModal,
}) => {
  const [file, setFile] = useState<File | null>(null);
  //   const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      file: null,
    },

    onSubmit: async (values) => {
      const formData = new FormData();
      formData.append("file", values.file as unknown as File);

      try {
        const accessToken = getAccessToken();

        const config = {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "multipart/form-data",
          },
        };

        const response = await axios.post(
          `${baseUrl}/teamscore/upload-pitchdeck`,
          formData,
          config
        );
        console.log(response.data);
        toast.success("Data submitted successfully");
        window.location.href = "/company_dashboard";
      } catch (error: any) {
        if (error.response) {
          const errorMessage =
            error.response.data?.error || error.response.data?.msg;
          console.log(errorMessage);
          toast.error(errorMessage);
        } else {
          toast.error("Server is not responding. Please try again later.");
        }
      }
    },
  });

  const onDrop = (acceptedFiles: File[]) => {
    formik.setFieldValue("file", acceptedFiles[0]);
    setFile(acceptedFiles[0]);
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: [".pdf", ".docx", ".pptx"] as any,
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <div className="w-[1098px] mx-auto text-center justify-center font-cabinet items-center shadow-md p-6 mt-16 bg-[#F7F9FB]">
        <div className="border-2 border-dashed border-gray-300 rounded-lg">
          <span className="text-3xl text-gray-500 relative top-[84px] left-10 cursor-pointer">
            <MdOutlineArrowBackIosNew onClick={closePitchDeckUploadModal} />{" "}
          </span>
          <h1 className="text-2xl font-semibold mb-2 mt-14">
            Please upload your Investor Deck
          </h1>

          <small className="text-xs">
            We will use this to create your profile.
          </small>

          <div
            {...getRootProps()}
            className={`p-8 rounded text-center cursor-pointer ${
              isDragActive ? "bg-blue-100 border-blue-500" : "border-gray-300"
            }`}
          >
            <input {...getInputProps()} />
            {isDragActive ? (
              <p className="text-blue-500">Drop your file here</p>
            ) : (
              <div>
                <img
                  src={DownloadIcon}
                  alt="upload file"
                  className="mx-auto w-12 m-6"
                />
                <p className="mb-2 text-gray-500">
                  Drag and drop or{" "}
                  <span className="text-blue-500">select </span>files here
                </p>
              </div>
            )}
          </div>
          {file && (
            <div className="mt-4">
              <strong>Selected File:</strong> {file.name}
            </div>
          )}
          {formik.touched.file && formik.errors.file ? (
            <div className="text-red-600 mt-2">{formik.errors.file}</div>
          ) : null}
          <div className="w-[550px] h-[119px] bg-white p-6 m-auto">
            <h4 className="mb-4 text-sm">We keep your data private</h4>
            <p className="text-[#808080] text-sm">
              We do not share your data with anyone - and you will have complete
              control of who you share it with once processed.
            </p>
          </div>
          <button
            type="submit"
            disabled={!file || formik.isSubmitting}
            className="bg-[#000D80] text-white w-[458px] p-4 rounded cursor-pointer hover:bg-blue-700 transition duration-300 mt-6 mb-6"
          >
            Upload Pitch Deck
          </button>
        </div>
      </div>
      <ToastContainer />
    </form>
  );
};

export default PitchDeckUpload;
