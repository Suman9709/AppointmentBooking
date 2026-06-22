import axios from "axios";

// All cookie-authenticated calls must use the same origin.
const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL || (import.meta.env.PROD
    ? "https://appointmentbooking-mhku.onrender.com"
    : "http://localhost:5000"),
  withCredentials: true,
});

export default apiClient;
