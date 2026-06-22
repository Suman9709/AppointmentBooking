import { useQuery } from "@tanstack/react-query";
import { getAdminDashboard, getDoctorDashboard, getPatientDashboard } from "../services/dashboardApi";

const fetchers = { admin: getAdminDashboard, doctor: getDoctorDashboard, patient: getPatientDashboard };

export const useDashboardAnalytics = (role) => useQuery({
  queryKey: ["dashboardAnalytics", role],
  queryFn: fetchers[role],
  staleTime: 30_000,
});

