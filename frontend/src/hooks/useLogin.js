// import { useMutation, useQueryClient } from "@tanstack/react-query";
// import { patientLogin } from "../services/authService/authApi";
// import { useNavigate } from "react-router-dom";
// import { adminLogin } from "../services/authService/adminApi";

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


import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

import { patientLogin } from "../services/authService/authApi";
import { adminLogin } from "../services/authService/adminApi";
import { doctorLogin } from "../services/authService/doctorApi";

export const useLogin = (role = "PATIENT") => {

    const navigate = useNavigate();

    const queryClient = useQueryClient();

    // ================= LOGIN FUNCTION =================

    let loginFunction;

    switch (role) {

        case "ADMIN":
            loginFunction = adminLogin;
            break;

        case "DOCTOR":
            loginFunction = doctorLogin;
            break;

        case "PATIENT":
        default:
            loginFunction = patientLogin;
            break;
    }

    return useMutation({

        mutationFn: loginFunction,

        onSuccess: async () => {

            // ================= ADMIN =================

            if (role === "ADMIN") {

                await queryClient.refetchQueries({
                    queryKey: ["adminProfile"]
                });

                navigate("/admindashboard");
            }

            // ================= DOCTOR =================

            else if (role === "DOCTOR") {

                await queryClient.refetchQueries({
                    queryKey: ["doctorProfile"]
                });

                navigate("/doctordashboard");
            }

            // ================= PATIENT =================

            else {

                await queryClient.refetchQueries({
                    queryKey: ["patientProfile"]
                });

                navigate("/patientdashboard");
            }
        },

        retry: false,

        refetchOnWindowFocus: false,

        onError: (error) => {

            console.log(
                "Login Failed",
                error.response?.data || error.message
            );
        }
    });
};