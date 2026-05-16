import { useQuery } from "@tanstack/react-query"
import { doctorGetSlotByDepartment } from "../services/authService/patientdetails"



export const useGetSlotByDepartment = (departmentId) => {
    return useQuery({
        queryKey: ["getSlotByDepartment", departmentId],
        queryFn: () => doctorGetSlotByDepartment(departmentId),
        enabled: !!departmentId,
        retry: false,
        refetchOnWindowFocus: false
    })
}