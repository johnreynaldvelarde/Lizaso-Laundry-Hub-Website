import axios from "axios";

const API_URL =
  import.meta.env.VITE_API_URL ||
  "https://web-production-dd1d.up.railway.app/api";

export const axiosPublic = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

export const axiosPrivate = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});
