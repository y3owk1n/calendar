import {
  type CalendarState,
  getCalendarState,
  dayKeys,
  type CalendarEvent,
} from "@/lib/date";
import Days from "./days";
import Header from "./header";

type CalendarProps = Pick<CalendarState, "viewingDate" | "type" | "flags"> & {
  events: CalendarEvent[];
};

export function Calendar({
  type,
  viewingDate,
  events = [],
  flags,
}: CalendarProps) {
  const calendarState = getCalendarState({
    type,
    viewingDate,
    events,
    flags,
  });

  return (
    <div className="my-10 flex flex-col gap-4">
      <Header {...calendarState} />
      <div>
        <div className="hidden border-slate-200 lg:grid grid-cols-1 lg:grid-cols-7">
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
            <Days key={date.dateString} date={date} {...calendarState} />
          ))}
        </div>
      </div>
    </div>
  );
}
