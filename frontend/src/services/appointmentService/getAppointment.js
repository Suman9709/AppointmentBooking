import axios from "axios";

const API = axios.create({
    baseURL: "http://localhost:5000/api/doctor/",
    withCredentials: true,
})

// http://localhost:5000/api/doctor/slots/allslots



export const createSlot = async (slotData) => {
    try {
        const response = await API.post("slots/create", slotData)
        console.log("create slot response", response.data);
        return response.data
    } catch (error) {
        console.error("Error creating slot", error);
        throw error;
    }
}


export const getAllSlots = async (doctorId) => {
    try {
        const response = await API.get("/slots/allslots");
        console.log("get all slots response", response.data);
        return response.data.slots
    } catch (error) {
        console.error("Error fetching all slots", error);
        throw error;
    }
}



export const deleteSlot = async(slotID)=>{
    try {
        const response = await API.delete(`/slots/delete${slotID}`);
        console.log("delete slot response", response.data);
        return response.data;
    } catch (error) {
        console.error("Error deleting slot", error);
        throw error;
    }
}