import {
  type CalendarState,
  getCalendarState,
  dayKeys,
  type CalendarEvent,
} from "@/lib/date";
import Days from "./days";
import Header from "./header";

type CalendarProps = Pick<CalendarState, "viewingDate"> & {
  events: CalendarEvent[];
};

export function Calendar({ viewingDate, events = [] }: CalendarProps) {
  const calendarState = getCalendarState({ viewingDate, events });

  return (
    <div className="my-10">
      <Header viewingDate={viewingDate} />
      <div className="hidden lg:grid grid-cols-1 lg:grid-cols-7">
        {dayKeys.map((key) => (
          <div
            className="border-[0.5px] border-slate-200 bg-slate-200 text-center p-4 font-bold text-sm"
            key={key}
          >
            {key}
          </div>
        ))}
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-7">
        {calendarState.datesInRange.map((date) => (
          <Days key={date.dateString} date={date} viewingDate={viewingDate} />
        ))}
      </div>
    </div>
  );
}
