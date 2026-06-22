import API from "./apiClient";

export const getAdminDashboard = async () => (await API.get("/api/adminaccess/dashboard-analytics")).data.data;
export const getDoctorDashboard = async () => (await API.get("/api/doctor/dashboard-analytics")).data.data;
export const getPatientDashboard = async () => (await API.get("/api/patient/dashboard-analytics")).data.data;
