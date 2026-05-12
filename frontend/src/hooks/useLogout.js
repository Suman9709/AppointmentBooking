// import { useMutation, useQueryClient } from "@tanstack/react-query";
// import { logout } from "../services/authService/authApi";
// import { useNavigate } from "react-router-dom";


// export const useLogout = () => {
//     const queryClient = useQueryClient();
//     const navigate = useNavigate();
//     return useMutation({
//         mutationFn: logout,
//         onSuccess: () => {
//             queryClient.removeQueries(["patientProfile"])
//             navigate("/login");
//             console.log("Logout Successful");
//         }
//     })
// }


import { useMutation, useQueryClient } from "@tanstack/react-query";
import { adminLogout } from "../services/authService/adminApi";
import { logout } from "../services/authService/authApi";

import { useNavigate } from "react-router-dom";



export const useLogout = () => {

    const queryClient = useQueryClient();

    const navigate = useNavigate();



    return useMutation({

        mutationFn: (role) => {

            switch (role) {

                case "ADMIN":
                    return adminLogout();

                // case "DOCTOR":
                //     return doctorLogout();

                default:
                    return logout();
            }
        },



        onSuccess: (_, role) => {

            // REMOVE QUERIES

            if (role === "ADMIN") {

                queryClient.removeQueries({
                    queryKey: ["adminProfile"]
                });

            }

            // else if (role === "DOCTOR") {

            //     queryClient.removeQueries({
            //         queryKey: ["doctorProfile"]
            //     });

            // }

            else {

                queryClient.removeQueries({
                    queryKey: ["patientProfile"]
                });
            }



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