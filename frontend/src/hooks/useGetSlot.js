import { useQuery } from "@tanstack/react-query";
import { getAllSlots } from "../services/appointmentService/getAppointment";


export const useGetSlot = (doctorId) => {
    return useQuery({
        queryKey: ["getSlot", doctorId],
        queryFn: getAllSlots,
        enabled: !!doctorId,
        retry: false,
    })
}