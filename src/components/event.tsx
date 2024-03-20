import type { CalendarEvent } from "@/lib/date";

interface EventProps {
  event: CalendarEvent;
}

export default function Event({ event }: EventProps) {
  return (
    <div className="bg-slate-400 text-left text-xs px-2 py-1 rounded-md">
      <span>{event.title}</span>
    </div>
  );
}
