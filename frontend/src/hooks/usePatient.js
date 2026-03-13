import { useQuery } from "@tanstack/react-query";
import { patientProfile } from "../services/authService/patientdetails";

export const usePatient = () => {
  return useQuery({
    queryKey: ["patientProfile"],
    queryFn:  patientProfile,   
    
  });
};