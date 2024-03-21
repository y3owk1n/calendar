"use client";

import type { CalendarEvent, CalendarStateFlags } from "@/lib/date";
import Link from "next/link";
import { EventDetails } from "./event-detail";
import dayjs from "dayjs";
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";

interface EventProps {
  flags: CalendarStateFlags;
  event: CalendarEvent;
  callback?: (event: CalendarEvent) => void;
  href?: string;
}

export default function Event({ event, flags, ...props }: EventProps) {
  const eventIsBeforeToday = dayjs(event.start).isBefore(
    dayjs().startOf("day"),
  );

  if (props.callback) {
    const callback = props.callback;
    return (
      <Button
        variant="unstyled"
        className={cn(
          "bg-slate-50 border border-slate-300 text-left text-xs px-2 py-1 rounded-md",
          flags.fadePastEvents && eventIsBeforeToday && "opacity-30",
        )}
        onClick={() => callback(event)}
      >
        <EventDetails event={event} />
      </Button>
    );
  }

  if (props.href) {
    const href = props.href;
    return (
      <Link
        href={href}
        className={cn(
          "bg-slate-50 border border-slate-300 text-left text-xs px-2 py-1 rounded-md",
          flags.fadePastEvents && eventIsBeforeToday && "opacity-30",
        )}
      >
        <EventDetails event={event} />
      </Link>
    );
  }

  return (
    <div
      className={cn(
        "bg-slate-50 border border-slate-300 text-left text-xs px-2 py-1 rounded-md",
        flags.fadePastEvents && eventIsBeforeToday && "opacity-30",
      )}
    >
      <EventDetails event={event} />
    </div>
  );
}
