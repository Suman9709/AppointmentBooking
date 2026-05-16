import { useQuery } from "@tanstack/react-query"
import { getALlDoctors } from "../services/authService/adminApi"



export const useAllDoctor = () => {
    return useQuery({
        queryKey: ["getAllDoctor"],
        queryFn: getALlDoctors,
        retry: false,
        refetchOnWindowFocus: false
    })
}