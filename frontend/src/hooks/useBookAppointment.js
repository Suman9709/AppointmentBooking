import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { bookAppointment } from "../services/authService/appointmentApi";

export const useBookAppointment = () => {


    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: bookAppointment,
        onSuccess: () => {
            alert("Appointment booked successfully");
            // Refresh and fetch the updated list of appointments after booking
            queryClient.invalidateQueries({ queryKey: ["getSlotByDepartment"] })
            queryClient.invalidateQueries({ queryKey: ["getPatientAppointments"] })
        },
        onError: (error) => {
            alert("Error booking appointment: " + (error.response?.data?.message || error.message));
        }

    })
}