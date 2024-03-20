import dayjs from "dayjs";

type Day = 0 | 1 | 2 | 3 | 4 | 5 | 6;

interface DateDetail {
  date: Date;
  dateString: string;
  day: Day;
}

export interface CalendarState {
  today: Date;
  viewingDate: Date;
  viewingStartDate: DateDetail;
  viewingEndDate: DateDetail;
  numberOfDaysInRange: number;
  datesInRange: DateDetail[];
}

export function getCalendarState(
  viewingDate: CalendarState["viewingDate"],
): CalendarState {
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

export const dayKeys = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

function getStartDate(date: Date): dayjs.Dayjs {
  return dayjs(date).startOf("month").startOf("day");
}

function getStartDateDetails(date: Date): DateDetail {
  return {
    date: getStartDate(date).toDate(),
    dateString: getStartDate(date).toISOString(),
    day: getStartDate(date).day() as Day,
  };
}

function getEndDate(date: Date): dayjs.Dayjs {
  return dayjs(date).endOf("month").endOf("day");
}

function getEndDateDetails(date: Date): DateDetail {
  return {
    date: getEndDate(date).toDate(),
    dateString: getEndDate(date).toISOString(),
    day: getEndDate(date).day() as Day,
  };
}

function getNumberOfDaysInRange(start: Date, end: Date): number {
  const startDate = dayjs(start);
  const endDate = dayjs(end);
  const diff = endDate.diff(startDate, "day");
  return diff;
}

function getDaysBetween(start: Date, end: Date): DateDetail[] {
  const range = [];
  const startDate = dayjs(start);
  const endDate = dayjs(end);
  let current = startDate;

  while (!current.isAfter(endDate)) {
    range.push(current);
    current = current.add(1, "days");
  }

  return range.map((d) => ({
    date: d.toDate(),
    dateString: d.toISOString(),
    day: d.day() as Day,
  }));
}

function getLeftOverflowDetails(day: Day) {
  if (day === 0) return null;

  const leftOverflow = day - 1;

  return {
    leftOverflow,
  };
}
