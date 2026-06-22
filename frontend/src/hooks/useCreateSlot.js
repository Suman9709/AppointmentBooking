import { useMutation, useQueryClient } from "@tanstack/react-query"
import { doctorCreateSlot } from "../services/authService/doctorApi"



export const useCreateSlot = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: doctorCreateSlot,
        onSuccess: () => {
            alert("Slot created successfully");
            // Refresh both dashboard aliases because they read the same slot list.
            queryClient.invalidateQueries({ queryKey: ["getAllAppointments"] });
            queryClient.invalidateQueries({ queryKey: ["getSlot"] });
            queryClient.invalidateQueries({ queryKey: ["dashboardAnalytics", "doctor"] });
        },
        onError: (error) => {
            console.error("Error creating slot", error.response?.data || error.message);
            alert("Error creating slot: " + (error.response?.data?.message || error.message));
        }
    })
}
