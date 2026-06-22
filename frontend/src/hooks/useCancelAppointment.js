import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteAppointment } from "../services/authService/appointmentApi";

export const useCancelAppointment = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteAppointment,
    onSuccess: () => {
      alert("Appointment cancelled successfully");
      queryClient.invalidateQueries({ queryKey: ["getPatientAppointments"] });
      queryClient.invalidateQueries({ queryKey: ["getSlotByDepartment"] });
      queryClient.invalidateQueries({ queryKey: ["dashboardAnalytics", "patient"] });
    },
    onError: (error) => {
      alert(error.response?.data?.message || "Could not cancel the appointment");
    },
  });
};
