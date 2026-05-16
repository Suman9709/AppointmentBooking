import { useMutation, useQueryClient } from "@tanstack/react-query";

import { useNavigate } from "react-router-dom";

import { adminLogout } from "../services/authService/adminApi";
import { doctorLogout } from "../services/authService/doctorApi";
import { logout as patientLogout } from "../services/authService/authApi";

export const useLogout = () => {

    const queryClient = useQueryClient();

    const navigate = useNavigate();

    return useMutation({

        mutationFn: (role) => {

            switch (role) {

                case "ADMIN":
                    return adminLogout();

                case "DOCTOR":
                    return doctorLogout();

                case "PATIENT":
                    return patientLogout();

                default:
                    throw new Error("Invalid role");
            }
        },

        onSuccess: (_, role) => {

            // ================= CLEAR QUERIES =================

            switch (role) {

                case "ADMIN":

                    queryClient.removeQueries({
                        queryKey: ["adminProfile"]
                    });

                    break;

                case "DOCTOR":

                    queryClient.removeQueries({
                        queryKey: ["doctorProfile"]
                    });

                    break;

                case "PATIENT":

                    queryClient.removeQueries({
                        queryKey: ["patientProfile"]
                    });

                    break;

                default:
                    break;
            }

            // ================= CLEAR ALL CACHE =================
            
            queryClient.clear();

            console.log(`${role} Logout Successful`);

            navigate("/login");
        },

        onError: (error) => {

            console.log(
                "Logout Failed",
                error.response?.data || error.message
            );
        }

    });
};