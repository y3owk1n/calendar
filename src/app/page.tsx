import { Calendar } from "@/components/calendar";
import {
  type CalendarEvent,
  parseParamsDate,
  type CalendarType,
} from "@/lib/date";
import dayjs from "dayjs";

const events: CalendarEvent[] = [
  {
    id: "1",
    title: "Event 1",
    start: dayjs("2024-03-01 12:00").toDate(),
    end: dayjs("2024-03-01 13:00").toDate(),
    description: "This is an event",
    source: "kylewong",
    metadata: {
      something: "else",
    },
  },
  {
    id: "2",
    title: "Event 2",
    start: dayjs("2024-03-01 13:00").toDate(),
    end: dayjs("2024-03-01 14:00").toDate(),
    description: "This is an event",
    source: "kylewong",
  },
  {
    id: "3",
    title: "Event 3",
    start: dayjs("2024-03-21 13:00").toDate(),
    end: dayjs("2024-03-21 14:00").toDate(),
    description: "This is an event",
    source: "kylewong",
  },
  {
    id: "4",
    title: "Event 4",
    start: dayjs("2024-03-19 13:00").toDate(),
    end: dayjs("2024-03-19 14:00").toDate(),
    description: "This is an event",
    source: "kylewong",
  },
];

interface HomeProps {
  searchParams?: Record<string, string | string[] | undefined>;
}

export default function Home({ searchParams }: HomeProps) {
  const viewingDate = parseParamsDate(searchParams?.viewingDate);
  const calendarType = searchParams?.calendarType;

  return (
    <main className="container mx-auto">
      <Calendar
        type={calendarType as CalendarType}
        viewingDate={viewingDate}
        events={events}
        flags={{
          fadePastEvents: true,
        }}
      />
    </main>
  );
}
