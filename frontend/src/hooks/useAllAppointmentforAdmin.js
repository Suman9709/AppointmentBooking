import { useQuery } from "@tanstack/react-query"

import { getAllAppointmentsForAdmin } from "../services/authService/appointmentApi"

export const getAllAppointmentsForAdminData = () => {
    return useQuery({
        queryKey: ["getAllAppointmentsForAdmin"],
        queryFn: getAllAppointmentsForAdmin,
        retry: false,
        refetchOnWindowFocus: false
    })
}