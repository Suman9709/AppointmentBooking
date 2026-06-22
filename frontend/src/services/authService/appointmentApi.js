import APPOINTMENT_API from "../apiClient";



export const bookAppointment = async (appointmentData) => {
    try {
        const response = await APPOINTMENT_API.post("api/patient/bookAppointment", appointmentData);
        console.log("Appointment booked successfully", response.data);
        return response.data;
    } catch (error) {
        console.error("Error booking appointment", error.response?.data || error.message);
        throw error;
    }
}

export const getPatientAppointments = async () => {
    try {
        const response = await APPOINTMENT_API.get("/api/patient/getPatientAppointments");
        console.log("Patient appointments", response.data);
        return response.data;
    } catch (error) {
        console.error("Error fetching patient appointments", error.response?.data || error.message);
        throw error;
    }
}

export const getTodaysAppointmentsForDoctor = async () => {
    try {
        const response = await APPOINTMENT_API.get("/api/doctor/slots/allslots");
        console.log("Today's appointments for doctor", response.data);
        return response.data;
    } catch (error) {
        console.error("Error fetching today's appointments for doctor", error.response?.data || error.message);
        throw error;
    }
}

export const deleteAppointment = async (appointmentId) => {
    const response = await APPOINTMENT_API.delete(`/api/patient/cancelAppointment/${appointmentId}`);
    return response.data;
}

export const getAllAppointmentsForAdmin = async () => {
    try {
        const response = await APPOINTMENT_API.get("/api/adminaccess/getallslots");
        console.log('Todays all appointment for admin', response.data);
        return response.data;
    } catch (error) {
        console.error("Error fetching today's appointments for admin", error.response?.data || error.message);
        throw error;
    }
}
