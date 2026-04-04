import { useQuery } from "@tanstack/react-query";
import { patientProfile } from "../services/authService/patientdetails";

export const usePatient = () => {
  // const hasToken = document.cookie.includes("patienttoken");
  return useQuery({
    queryKey: ["patientProfile"],
    queryFn:  patientProfile,   
    // enabled: hasToken,
    retry: false,
    
  });
};