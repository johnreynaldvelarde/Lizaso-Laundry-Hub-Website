import axios from 'axios';

const API_URL = 'http://localhost:3002/api'; 

export const axiosPublic = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true, 
});

export const axiosPrivate = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true, 
});
