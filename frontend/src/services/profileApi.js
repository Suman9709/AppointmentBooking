import API from "./apiClient";

export const getRoleProfile = async (role) => {
  if (role === "admin") {
    const { data } = await API.get("/api/auth/getAdminProfile");
    return { user: data.data, details: {} };
  }
  if (role === "doctor") {
    const { data } = await API.get("/api/doctor/getdoctorprofile");
    return { user: data.data.loggedinUser, details: data.data.doctorProfile };
  }
  const { data } = await API.get("/api/patient/getPatientDetails");
  return { user: data.data.user, details: data.data.patientProfile };
};

export const updateRoleProfile = async ({ role, values }) => {
  const path = role === "admin" ? "/api/auth/profile"
    : role === "doctor" ? "/api/doctor/profile"
    : "/api/patient/updatePatientProfile";
  return (await API.put(path, values)).data;
};

