import API from "../apiClient";

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


export const getAllSlots = async () => {
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
        const response = await API.delete(`/api/doctor/slots/delete/${slotID}`);
        console.log("delete slot response", response.data);
        return response.data;
    } catch (error) {
        console.error("Error deleting slot", error);
        throw error;
    }
}
