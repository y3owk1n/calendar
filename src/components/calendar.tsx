import { type CalendarState, getCalendarState, dayKeys } from "@/lib/date";
import dayjs from "dayjs";

type CalendarProps = Pick<CalendarState, "viewingDate">;

export function Calendar({ viewingDate }: CalendarProps) {
  const calendarState = getCalendarState(viewingDate);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-7">
      {dayKeys.map((key) => (
        <div key={key}>{key}</div>
      ))}
      {calendarState.datesInRange.map((date) => (
        <div key={date.dateString}>{dayjs(date.dateString).format("DD")}</div>
      ))}
    </div>
  );
}
