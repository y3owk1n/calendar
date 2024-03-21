"use client";

import {
  dayKeysMap,
  isDateInMonth,
  isDateToday,
  type DateDetail,
  type CalendarState,
} from "@/lib/date";
import dayjs from "dayjs";
import Event from "@/components/event";
import { cn } from "@/lib/utils";

interface DaysProps extends CalendarState {
  date: DateDetail;
}

export default function Days(props: DaysProps) {
  const isInMonth = isDateInMonth(props.date.date, props.viewingDate);
  const isToday = isDateToday(props.date.date);

  return (
    <div className={cn(!isInMonth && "hidden lg:inline-block")}>
      <div className="border-[0.5px] border-slate-200 bg-slate-200 text-left lg:text-center p-2 font-bold text-sm lg:hidden">
        {dayjs(props.date.dateString).format("DD/MM")},{" "}
        {dayKeysMap[props.date.day]}
      </div>
      <div className="border-[0.5px] p-2 flex flex-col h-full gap-2 border-slate-200 text-left lg:text-center text-sm">
        <div className="hidden lg:inline-block text-left">
          <span
            className={cn(
              "p-1 text-xs",
              !isInMonth && "opacity-25",
              isToday && "font-bold rounded-full bg-red-500 text-white",
            )}
          >
            {dayjs(props.date.dateString).format("DD")}
          </span>
        </div>
        {isInMonth && (
          <div className="lg:min-h-10 h-full flex flex-col gap-1">
            {props.date.events.map((event) => (
              <Event
                key={event.id}
                event={event}
                flags={props.flags}
                callback={() => alert(event.title)}
              />
            ))}

            {props.date.events.length <= 0 ? (
              <span className="lg:hidden text-sm text-slate-400">
                No events
              </span>
            ) : null}
          </div>
        )}
      </div>
    </div>
  );
}
