import { useMutation, useQueryClient } from "@tanstack/react-query";
import {patientLogin} from "../services/authService/authApi";
import { useNavigate } from "react-router-dom";

export const useLogin = () => {
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: patientLogin,
        onSuccess: (patientData) => {
            console.log("Login SuccessFul", patientData);
            queryClient.invalidateQueries({ queryKey: ["patientProfile"] });
            navigate("/patientdashboard");

        },
        onError: (error) => {
            console.log("Login Failed", error);
        }
    })
}