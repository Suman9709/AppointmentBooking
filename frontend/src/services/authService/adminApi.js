import axios from "axios";


const ADMIN_API = axios.create({
    baseURL: "http://localhost:5000/api/auth",
    withCredentials: true,
})
// const API_URL = "http://localhost:5000/api/patient";




export const adminLogin = async (adminData) => {
    try {
        const response = await ADMIN_API.post("/login", adminData);
        return response.data;
    } catch (error) {
        console.error("Error during admin login", error.response?.data || error.message);
        throw error;
    }
}


export const adminProfile = async () => {
    try {
        const response = await ADMIN_API.get("/getAdminProfile");
        return response.data;
    } catch (error) {
        console.error("Error fetching admin profile", error.response?.data || error.message);
        throw error;
    }
}

export const adminLogout = async () => {
    try {
        const response = await ADMIN_API.post("/logout");
        return response.data;
    } catch (error) {
        console.error("Error during admin logout", error.response?.data || error.message);
        throw error;
    }
}