import axios from "axios";


const API = axios.create({
    baseURL: "http://localhost:5000/api/patient",
    withCredentials: true,
})
// const API_URL = "http://localhost:5000/api/patient";


export const patientRegister = async (patientData) => {
    const response = await API.post("/patientRegister", patientData)
    // console.log("Register patient data", response.data);

    return response.data
}

export const patientLogin = async (patientData) => {
    try {
        const response = await API.post("/patientLogin", patientData)
        return response.data
    } catch (error) {
console.log();

    }
}


export const logout = async () => {
    const response = await API.post("/patientlogout")
    return response.data
}