import axios from "axios";


const API = axios.create({
    baseURL: "https://appointmentbooking-mhku.onrender.com",
    withCredentials: true,
})
// const API_URL = "http://localhost:5000/api/patient";



export const patientRegister = async (patientData) => {
    try {
        const response = await API.post("/api/patient/patientRegister", patientData)
        // console.log("Register patient data", response.data);
        return response.data
    } catch (error) {
        console.error("Error during patient registration", error.response?.data || error.message);
        throw error;
    }
}

export const patientLogin = async (patientData) => {
    try {
        const response = await API.post("/api/patient/patientLogin", patientData)
        return response.data
    } catch (error) {
        console.error("Error during patient login", error.response?.data || error.message);
        throw error;
    }
}


export const logout = async () => {
    try {
        const response = await API.post("/api/patient/patientlogout")
        return response.data
    } catch (error) {
        console.error("Error during patient logout", error);
        throw error;
    }
}

