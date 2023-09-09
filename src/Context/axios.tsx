/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";

const baseUrl = import.meta.env.VITE_REACT_APP_BASE_URL;

export const apiGet = (path: string) => {
  const config = {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      "x-user-email": sessionStorage.getItem("userEmail"),
    },
  };
  return axios.get(`${baseUrl}${path}`, config);
};

export const apiPost = async (path: string, data: any) => {
  const config = {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("access_token")}`,
    },
  };
  const response = await axios.post(`${baseUrl}${path}`, data, config);
  return response.data;
};
export const apiPassPost = async (path: string, data: any) => {
  const token = sessionStorage.getItem("reset_email");

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.post(`${baseUrl}${path}`, data, config);
  return response.data;
};

export const apiResetPost = async (path: string, data: any) => {
  const company_mail = sessionStorage.getItem("reset_email");

  const config = {
    headers: {
      "Content-Type": "application/json",
      // Send the retrieved email in the headers
      "X-Reset-Email": company_mail,
    },
  };
  const response = await axios.post(`${baseUrl}${path}`, data, config);
  return response.data;
};

export const apiPatch = (path: string, data: any) => {
  const config = {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  };
  return axios.patch(`${baseUrl}${path}`, data, config);
};

export const apiPut = (path: string, data: any) => {
  const config = {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  };
  return axios.put(`${baseUrl}${path}`, data, config);
};

export const apiDelete = (path: string) => {
  const config = {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  };
  return axios.delete(`${baseUrl}${path}`, config);
};
