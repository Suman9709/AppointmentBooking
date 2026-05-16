import axios from "axios";

const API = axios.create({
    // baseURL: "http://localhost:5000/api/doctor/",
    baseURL: "https://appointmentbooking-mhku.onrender.com",
    withCredentials: true,
})

// http://localhost:5000/api/doctor/slots/allslots



export const createSlot = async (slotData) => {
    try {
        const response = await API.post("/api/doctor/slots/create", slotData)
        console.log("create slot response", response.data);
        return response.data
    } catch (error) {
        console.error("Error creating slot", error);
        throw error;
    }
}


export const getAllSlots = async (doctorId) => {
    try {
        const response = await API.get(`/api/doctor/slots/allslots`);
        console.log("get all slots response", response.data);
        return response.data.slots
    } catch (error) {
        console.error("Error fetching all slots", error);
        throw error;
    }
}



export const deleteSlot = async(slotID)=>{
    try {
        const response = await API.delete(`/api/doctor/slots/delete${slotID}`);
        console.log("delete slot response", response.data);
        return response.data;
    } catch (error) {
        console.error("Error deleting slot", error);
        throw error;
    }
}