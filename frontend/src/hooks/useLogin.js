import { useMutation, useQueryClient } from "@tanstack/react-query";
import { patientLogin } from "../services/authService/authApi";
import { useNavigate } from "react-router-dom";
import { adminLogin } from "../services/authService/adminApi";

// export const useLogin = () => {
//     const navigate = useNavigate();
//     const queryClient = useQueryClient();
//     return useMutation({
//         mutationFn: patientLogin,
//         onSuccess: (patientData) => {
//             console.log("Login SuccessFul", patientData);
//             queryClient.invalidateQueries({ queryKey: ["patientProfile"] });
//             navigate("/patientdashboard");

//         },
//         refetchOnWindowFocus: false,
//         retry: false,
//         onError: (error) => {
//             console.log("Login Failed", error);
//         }
//     })
// }


export const useLogin = (role = 'PATIENT') => {
    const navigate = useNavigate();
    const queryClient = useQueryClient();

    const loginFunction = role === 'ADMIN' ? adminLogin : patientLogin;

    return useMutation({
        mutationFn: loginFunction,
       onSuccess: async () => {

    if (role === "ADMIN") {

        await queryClient.refetchQueries({
            queryKey: ["adminProfile"]
        });

        navigate("/admindashboard");

    } else {

        await queryClient.refetchQueries({
            queryKey: ["patientProfile"]
        });

        navigate("/patientdashboard");
    }
},
        refetchOnWindowFocus: false,
        retry: false,
        onError: (error) => {
            console.log("Login Failed", error.response?.data || error.message);
        }
    })
}