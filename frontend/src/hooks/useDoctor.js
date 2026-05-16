import { useQuery } from "@tanstack/react-query";
import { doctorProfile } from "../services/authService/doctorApi";



export const useDoctor = ()=>{
return useQuery({
    queryKey:["doctorProfile"],
    queryFn: doctorProfile,
    retry: false,
    refetchOnWindowFocus: false
})
}