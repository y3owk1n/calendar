import type { CalendarEvent } from "@/lib/date";

interface EventDetailProps {
  event: CalendarEvent;
}

export function EventDetails({ event }: EventDetailProps) {
  return (
    <div>
      <span>{event.title}</span>
    </div>
  );
}
