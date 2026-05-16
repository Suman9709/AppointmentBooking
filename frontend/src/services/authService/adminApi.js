import axios from "axios";


const ADMIN_API = axios.create({
    baseURL: "http://localhost:5000",
    withCredentials: true,
})
// const API_URL = "http://localhost:5000/api/patient";




export const adminLogin = async (adminData) => {
    try {
        const response = await ADMIN_API.post("/api/auth/login", adminData);
        return response.data;
    } catch (error) {
        console.error("Error during admin login", error.response?.data || error.message);
        throw error;
    }
}


export const adminProfile = async () => {
    try {
        const response = await ADMIN_API.get("/api/auth/getAdminProfile");
        return response.data;
    } catch (error) {
        console.error("Error fetching admin profile", error.response?.data || error.message);
        throw error;
    }
}

export const adminLogout = async () => {
    try {
        const response = await ADMIN_API.post("/api/auth/logout");
        return response.data;
    } catch (error) {
        console.error("Error during admin logout", error.response?.data || error.message);
        throw error;
    }
}


export const getALlDoctors = async()=>{
    try {
        const response = await ADMIN_API.get("/api/adminaccess/getall/doctors");
        return response.data;
    } catch (error) {
        console.error("Error fetching all doctors", error.response?.data || error.message);
        throw error;
    }
}


export const createDoctor = async(doctorData)=>{
    try {
        const response = await ADMIN_API.post("/api/adminaccess/create/doctor", doctorData);
        return response.data;
    } catch (error) {
        console.error("Error creating doctor", error.response?.data || error.message);
        throw error;
    }
}

export const createDepartment = async(departmentData)=>{
    try {
        const response = await ADMIN_API.post("/api/department/createDepartment", departmentData);
        return response.data;
    } catch (error) {
        console.error("Error creating department", error.response?.data || error.message);
        throw error;
    }
}