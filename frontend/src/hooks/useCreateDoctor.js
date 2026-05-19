import { useMutation, useQueryClient } from "@tanstack/react-query"
import { createDoctor } from "../services/authService/adminApi"

export const useCreateDoctor = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: createDoctor,
        onSuccess: () => {
            console.log("Doctor created successfully");
            alert("Doctor created successfully");
            queryClient.invalidateQueries({
                queryKey: ["getAllDoctor"]
            });
        },
        onError: (error) => {
            console.error("Error creating doctor", error.response?.data || error.message);
            alert("Failed to create doctor: " + (error.response?.data?.message || error.message));
        }
    })
}