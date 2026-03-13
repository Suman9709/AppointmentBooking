import { useMutation } from "@tanstack/react-query";

import { useNavigate } from "react-router-dom";
import { patientRegister } from "../services/authService/authApi";


export const useSignup = () => {
    const navigate = useNavigate();
    return useMutation({
        mutationFn: patientRegister,
        onSuccess: (patientData) => {
            console.log("Signup SuccessFul", patientData);
            navigate("/login");
        },
        onError: (error) => {
            console.log("Signup Failed", error);
        }
    })
}