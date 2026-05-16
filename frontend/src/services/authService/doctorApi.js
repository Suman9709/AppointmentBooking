import axios from "axios";


const DOCTOR_API = axios.create({
    baseURL: "http://localhost:5000",
    withCredentials: true,
})


export const doctorLogin = async (doctorData) => {
    try {
        const response = await DOCTOR_API.post('/api/doctor/login', doctorData);
        console.log("Doctor login response", response.data);
        return response.data;
    } catch (error) {
        console.error("Error during doctor login", error.response?.data || error.message);
        throw error;
    }
}

export const doctorProfile = async () => {
    try {
        const response = await DOCTOR_API.get('/api/doctor/getdoctorprofile')
        console.log("Doctor profile response", response.data);
        return response.data;
    } catch (error) {
        console.error("Error fetching doctor profile", error.response?.data || error.message);
        throw error;
    }
}

export const doctorLogout = async () => {
    try {
        const response = await DOCTOR_API.post('/api/doctor/logout');
        return response.data;
    } catch (error) {
        console.error("Error during doctor logout", error.response?.data || error.message);
        throw error;
    }
}

export const doctorCreateSlot = async (slotData) => {
    try {
        const response = await DOCTOR_API.post('/api/doctor/slots/create', slotData);
        return response.data;
    } catch (error) {
        console.error("Error creating doctor slot", error.response?.data || error.message);
        throw error;
    }
}



export const doctorDeleteSlot = async (slotId) => {
    try {
        const response = await DOCTOR_API.delete(`/api/doctor/slots/delete/${slotId}`);
        return response.data;
    } catch (error) {
        console.error("Error deleting doctor slot", error.response?.data || error.message);
        throw error;
    }
}