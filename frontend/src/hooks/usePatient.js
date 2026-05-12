import { useQuery } from "@tanstack/react-query";
import { patientProfile } from "../services/authService/patientdetails";
import { adminProfile } from "../services/authService/adminApi";
import { use } from "react";

export const usePatient = () => {
  // const hasToken = document.cookie.includes("patienttoken");
  return useQuery({
    queryKey: ["patientProfile"],
    queryFn:  patientProfile,   
    retry: false,
    refetchOnWindowFocus: false
  });
};


