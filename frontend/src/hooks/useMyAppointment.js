import { useQuery } from "@tanstack/react-query"
import { getPatientAppointments } from "../services/authService/appointmentApi"

export const useMyAppointment = () => {

    return useQuery({
        queryKey: ["getPatientAppointments"],
        queryFn: () => getPatientAppointments(),
        retry: false,
        refetchOnWindowFocus: false
    })
}