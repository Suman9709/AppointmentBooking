import { useMutation, useQueryClient } from "@tanstack/react-query";
import { logout } from "../services/authService/authApi";
import { useNavigate } from "react-router-dom";


export const useLogout = () => {
    const queryClient = useQueryClient();
    const navigate = useNavigate();
    return useMutation({
        mutationFn: logout,
        onSuccess: () => {
            queryClient.removeQueries(["patientProfile"])
            navigate("/login");
            console.log("Logout Successful");
        }
    })
}