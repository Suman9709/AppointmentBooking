import axios from "axios";


const API = axios.create({
    baseURL: "http://localhost:5000",
    withCredentials: true,
})


export const patientProfile = async () => {
    const response = await API.get("/api/patient/getPatientDetails")
    console.log(response.data.data);
    return response.data.data
}


export const getAllDepartments = async () => {
    try {
        const response = await API.get("/api/department/getalldepartments");
        console.log("All Departments", response.data);
        return response.data;
    } catch (error) {
        console.error("Error fetching all departments", error.response?.data || error.message);
        throw error;
    }
}

export const doctorGetSlotByDepartment = async (departmentId) => {
    try {
        const response = await API.get(`/api/doctor/slots/slotbydepartment/${departmentId}`);
        return response.data;
    } catch (error) {
        console.error("Error fetching slots by department", error.response?.data || error.message);
        throw error;
    }
}