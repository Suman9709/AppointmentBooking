import { useQuery } from "@tanstack/react-query"
import { getTodaysAppointmentsForDoctor } from "../services/authService/appointmentApi"


export const useAllAppointments = () => {
    return useQuery({
        queryKey: ["getAllAppointments"],
        queryFn: getTodaysAppointmentsForDoctor,
        retry: false,
        refetchOnWindowFocus: false
    })
}
