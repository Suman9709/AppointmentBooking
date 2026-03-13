import axios from "axios";


const API = axios.create({
    baseURL: "http://localhost:5000/api/patient",
    withCredentials: true,
})


export const patientProfile = async () => {
    const response = await API.get("/getPatientDetails")
    console.log(response.data.data);
    return response.data.data
}