import { useQuery } from "@tanstack/react-query";
import { adminProfile } from "../services/authService/adminApi";

export const useAdmin = () => {
    return useQuery({
        queryKey: ["adminProfile"],
        queryFn: adminProfile,
        retry: false,
        refetchOnWindowFocus: false
    })
}