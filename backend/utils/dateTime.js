const INDIA_OFFSET = "+05:30";

// Doctor inputs are Indian wall-clock values. Adding the explicit offset keeps
// the stored UTC instant identical even when the API runs in another timezone.
export const parseIndianDateTime = (date, time) => {
    if (!/^\d{4}-\d{2}-\d{2}$/.test(date || "") || !/^\d{2}:\d{2}$/.test(time || "")) {
        return null;
    }

    const [year, month, day] = date.split("-").map(Number);
    const [hour, minute] = time.split(":").map(Number);
    const daysInMonth = new Date(Date.UTC(year, month, 0)).getUTCDate();
    if (month < 1 || month > 12 || day < 1 || day > daysInMonth || hour > 23 || minute > 59) {
        return null;
    }

    const value = new Date(`${date}T${time}:00${INDIA_OFFSET}`);
    return Number.isNaN(value.getTime()) ? null : value;
};
