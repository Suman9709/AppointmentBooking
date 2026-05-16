import { useQuery } from "@tanstack/react-query"
import { getAllDepartments } from "../services/authService/patientdetails"

export const useAllDepartments = () => {
    return useQuery({
        queryKey: ["getAllDepartments"],
        queryFn: getAllDepartments,
        retry: false,
        refetchOnWindowFocus: false
    })
}