import { useQuery } from "@tanstack/react-query"
import { getTodaysAppointmentsForDoctor } from "../services/authService/appointmentApi"


export const getAllAppointments = () => {
    return useQuery({
        queryKey: ["getAllAppointments"],
        queryFn: getTodaysAppointmentsForDoctor,
        retry: false,
        refetchOnWindowFocus: false
    })
}