import { formatTimeRange, type CalendarEvent } from "@/lib/date";

interface EventDetailProps {
  event: CalendarEvent;
}

export function EventDetails({ event }: EventDetailProps) {
  return (
    <div className="flex flex-col gap-1">
      <span className="font-bold">{event.title}</span>
      <span>{formatTimeRange(event.start, event.end)}</span>
    </div>
  );
}
