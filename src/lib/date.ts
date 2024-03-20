import dayjs from "dayjs";
import isoWeek from "dayjs/plugin/isoWeek";
import isToday from "dayjs/plugin/isToday";

dayjs.extend(isoWeek);
dayjs.extend(isToday);

type DayNumber = 0 | 1 | 2 | 3 | 4 | 5 | 6;
type DayText = "SUN" | "MON" | "TUE" | "WED" | "THU" | "FRI" | "SAT";

export interface CalendarEvent {
  id: string;
  title: string;
  start: Date;
  end: Date;
  description?: string;
  source?: string;
}

export interface DateDetail {
  date: Date;
  dateString: string;
  day: DayNumber;
  events: CalendarEvent[];
}

export interface CalendarState {
  today: Date;
  viewingDate: Date;
  viewingStartDate: DateDetail;
  viewingEndDate: DateDetail;
  numberOfDaysInRange: number;
  datesInRange: DateDetail[];
}

export const dayKeys: DayText[] = [
  "MON",
  "TUE",
  "WED",
  "THU",
  "FRI",
  "SAT",
  "SUN",
];

export const dayKeysMap: Record<DayNumber, DayText> = {
  0: "SUN",
  1: "MON",
  2: "TUE",
  3: "WED",
  4: "THU",
  5: "FRI",
  6: "SAT",
};

export function getCalendarState({
  viewingDate,
  events,
}: {
  viewingDate: Date;
  events: CalendarEvent[];
}): CalendarState {
  const today = dayjs().toDate();
  const viewingStartDate = getStartDateDetails(viewingDate);
  const viewingEndDate = getEndDateDetails(viewingDate);
  const numberOfDaysInRange = getNumberOfDaysInRange(
    viewingStartDate.date,
    viewingEndDate.date,
  );
  const datesInRange = getDaysBetween(
    viewingStartDate.date,
    viewingEndDate.date,
    events,
  );

  return {
    today,
    viewingDate,
    viewingStartDate,
    viewingEndDate,
    numberOfDaysInRange,
    datesInRange,
  };
}

export function parseParamsDate(date: string | string[] | undefined): Date {
  if (Array.isArray(date)) {
    return dayjs(date[0]).toDate();
  }
  return dayjs(date).toDate();
}

function getStartDate(date: Date): dayjs.Dayjs {
  return dayjs(date).startOf("month").startOf("day");
}

function getStartWeek(date: Date): dayjs.Dayjs {
  return dayjs(date).startOf("isoWeek").startOf("day");
}

function getStartDateDetails(date: Date): DateDetail {
  return {
    date: getStartDate(date).toDate(),
    dateString: getStartDate(date).toISOString(),
    day: getStartDate(date).day() as DayNumber,
    events: [],
  };
}

function getEndDate(date: Date): dayjs.Dayjs {
  return dayjs(date).endOf("month").endOf("day");
}

function getEndWeek(date: Date): dayjs.Dayjs {
  return dayjs(date).endOf("isoWeek").endOf("day");
}

function getEndDateDetails(date: Date): DateDetail {
  return {
    date: getEndDate(date).toDate(),
    dateString: getEndDate(date).toISOString(),
    day: getEndDate(date).day() as DayNumber,
    events: [],
  };
}

export function isDateToday(date: Date): boolean {
  return dayjs(date).isToday();
}

export function isDateInMonth(date: Date, viewingDate: Date): boolean {
  return getStartDate(date).isSame(viewingDate, "month");
}

function getNumberOfDaysInRange(start: Date, end: Date): number {
  const startDate = dayjs(start);
  const endDate = dayjs(end);
  const diff = endDate.diff(startDate, "day");
  return diff;
}

function getDaysBetween(
  start: Date,
  end: Date,
  events: CalendarEvent[],
): DateDetail[] {
  const range = [];
  const startDate = getStartWeek(start);
  const endDate = getEndWeek(end);
  let current = startDate;

  while (!current.isAfter(endDate)) {
    range.push(current);
    current = current.add(1, "days");
  }

  return range.map((d) => ({
    date: d.toDate(),
    dateString: d.toISOString(),
    day: d.day() as DayNumber,
    events: mergeEventsToDates(d.toDate(), events),
  }));
}

function mergeEventsToDates(
  currentDate: Date,
  events: CalendarEvent[],
): CalendarEvent[] {
  const filteredEvents = events.filter((event) =>
    dayjs(event.start).isSame(currentDate, "day"),
  );
  const sortedFilteredEvents = filteredEvents.sort((a, b) =>
    dayjs(a.start).diff(dayjs(b.start)),
  );

  return sortedFilteredEvents;
}

export function nextViewingDate(
  currentViewingDate: Date,
  numberOfDays: number,
  type: dayjs.ManipulateType,
) {
  return dayjs(currentViewingDate).add(numberOfDays, type).toDate();
}

export function previousViewingDate(
  currentViewingDate: Date,
  numberOfDays: number,
  type: dayjs.ManipulateType,
) {
  return dayjs(currentViewingDate).subtract(numberOfDays, type).toDate();
}
