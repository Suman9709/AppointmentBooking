import { useMutation, useQueryClient } from "@tanstack/react-query"
import { createDepartment } from "../services/authService/adminApi";

export const useCreateDepartment = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: createDepartment,
        onSuccess: () => {
            console.log("Department created successfully");
            alert("Department created successfully");
            queryClient.invalidateQueries({ queryKey: ["getAllDepartments"] });
        },
        onError: (error) => {
            console.error("Error creating department", error.response?.data || error.message);
            alert("Failed to create department: " + (error.response?.data?.message || error.message));
        }
    })
}