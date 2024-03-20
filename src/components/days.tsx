"use client";

import {
  dayKeysMap,
  isDateInMonth,
  isDateToday,
  type DateDetail,
} from "@/lib/date";
import dayjs from "dayjs";
import Event from "@/components/event";
import { cn } from "@/lib/utils";
import { useMediaQuery } from "@/hooks/use-media-query";

interface DaysProps {
  date: DateDetail;
  viewingDate: Date;
}

export default function Days({ date, viewingDate }: DaysProps) {
  const isInMonth = isDateInMonth(date.date, viewingDate);
  const isToday = isDateToday(date.date);

  const isDesktop = useMediaQuery("(min-width: 1024px)");

  if (!isDesktop && !isInMonth) {
    return null;
  }

  return (
    <div>
      <div className="border-[0.5px] border-slate-200 bg-slate-200 text-left lg:text-center p-2 font-bold text-sm lg:hidden">
        {dayjs(date.dateString).format("DD/MM")}, {dayKeysMap[date.day]}
      </div>
      <div className="border-[0.5px] p-2 flex flex-col h-full gap-2 border-slate-200 text-left lg:text-center text-sm">
        <div className="hidden lg:inline-block">
          <span
            className={cn(
              "p-1 text-xs",
              !isInMonth && "opacity-25",
              isToday && "font-bold rounded-full bg-red-500 text-white",
            )}
          >
            {dayjs(date.dateString).format("DD")}
          </span>
        </div>
        {isInMonth && (
          <div className="lg:min-h-10 h-full flex flex-col gap-1">
            {date.events.map((event) => (
              <Event key={event.id} event={event} />
            ))}

            {!isDesktop && date.events.length <= 0 ? (
              <span className="text-slate-400">No events</span>
            ) : null}
          </div>
        )}
      </div>
    </div>
  );
}
