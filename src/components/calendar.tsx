import {
  type CalendarState,
  getCalendarState,
  dayKeys,
  type CalendarEvent,
  type CalendarStateFlags,
} from "@/lib/date";
import Days from "./days";
import Header from "./header";

type CalendarProps = Pick<CalendarState, "viewingDate"> & {
  events: CalendarEvent[];
  flags: CalendarStateFlags;
};

export function Calendar({ viewingDate, events = [], flags }: CalendarProps) {
  const calendarState = getCalendarState({
    viewingDate,
    events,
    flags,
  });

  return (
    <div className="my-10">
      <Header viewingDate={calendarState.viewingDate} />
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
          <Days
            key={date.dateString}
            date={date}
            viewingDate={calendarState.viewingDate}
            flags={calendarState.flags}
          />
        ))}
      </div>
    </div>
  );
}
