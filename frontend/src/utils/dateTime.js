const INDIA_TIME_ZONE = "Asia/Kolkata";

// Always render appointments in the hospital timezone, independent of the
// patient's device timezone (for example, while travelling abroad).
export const formatIndianDate = (value) => new Intl.DateTimeFormat("en-IN", {
  timeZone: INDIA_TIME_ZONE,
  day: "2-digit",
  month: "short",
  year: "numeric",
}).format(new Date(value));

export const formatIndianTime = (value) => new Intl.DateTimeFormat("en-IN", {
  timeZone: INDIA_TIME_ZONE,
  hour: "2-digit",
  minute: "2-digit",
  hour12: true,
}).format(new Date(value));

export const isFutureAppointment = (value) => new Date(value).getTime() > Date.now();

