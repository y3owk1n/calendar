import type { CalendarEvent } from "@/lib/date";
import Link from "next/link";
import { EventDetails } from "./event-detail";

interface EventProps {
  event: CalendarEvent;
  callback?: (event: CalendarEvent) => void;
  href?: string;
}

export default function Event({ event, ...props }: EventProps) {
  if (props.callback) {
    const callback = props.callback;
    return (
      <div
        role="button"
        className="bg-slate-200 text-left text-xs px-2 py-1 rounded-md"
        onClick={() => callback(event)}
      >
        <EventDetails event={event} />
      </div>
    );
  }

  if (props.href) {
    const href = props.href;
    return (
      <Link
        href={href}
        className="bg-slate-200 text-left text-xs px-2 py-1 rounded-md"
      >
        <EventDetails event={event} />
      </Link>
    );
  }

  return (
    <div className="bg-slate-200 text-left text-xs px-2 py-1 rounded-md">
      <EventDetails event={event} />
    </div>
  );
}
