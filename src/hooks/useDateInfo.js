import dayjs from "dayjs";
import { useMemo } from "react";
import "dayjs/locale/fi";
import weekOfYear from "dayjs/plugin/weekOfYear";

export default function useDateInfo() {
    dayjs.locale("fi");
    dayjs.extend(weekOfYear); 

    const workdays = useMemo(() => {
        const days = [];
        const today = dayjs().startOf("day");
        const start = today.subtract(20, "day");
        const end = today.add(90, "day");

        let current = start;
        while (current.isBefore(end) || current.isSame(end, "day")) {
            const dayOfWeek = current.day(); // 0 = Sunday, 1 = Monday, ..., 6 = Saturday
            if (dayOfWeek >= 1 && dayOfWeek <= 5) { // Monday–Friday
                days.push({
                    date: current.format('YYYY-MM-DD'), // <-- always matches other values
                    dayName: current.format("dddd"),
                    dayNumber: current.format("D"),
                    monthName: current.format("MMMM"),
                    full: current.format("dddd D.M."),
                    weekNumber: current.week()
                });
            }
            current = current.add(1, "day");
        }
        return days;
    }, []); 

    return { workdays };
}
