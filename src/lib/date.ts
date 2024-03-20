import dayjs from "dayjs";
import isoWeek from "dayjs/plugin/isoWeek";
import isToday from "dayjs/plugin/isToday";

dayjs.extend(isoWeek);
dayjs.extend(isToday);

/**
 * Represents the day of the week as a number, where 0 is Sunday and 6 is Saturday.
 */
type DayNumber = 0 | 1 | 2 | 3 | 4 | 5 | 6;

/**
 * Represents the day of the week as a text, where "SUN" is Sunday and "SAT" is Saturday.
 */
type DayText = "SUN" | "MON" | "TUE" | "WED" | "THU" | "FRI" | "SAT";

/**
 * Represents a calendar event with details such as title, start and end dates, and optional description and source.
 */
export interface CalendarEvent {
  id: string;
  title: string;
  start: Date;
  end: Date;
  description?: string;
  source?: string;
  metadata?: CalendarEventMetadata;
}

/**
 * Represents the metadata associated with a calendar event.
 */
interface CalendarEventMetadata {
  [key: string]: string | number | boolean;
}

/**
 * Represents the details of a date, including the date itself, its string representation, the day of the week, and any events occurring on that date.
 */
export interface DateDetail {
  date: Date;
  dateString: string;
  day: DayNumber;
  events: CalendarEvent[];
}

/**
 * Represents the flags associated with the calendar state.
 */
export interface CalendarStateFlags {
  fadePastEvents: boolean;
}

/**
 * Represents the state of the calendar, including the current date, the date being viewed, the start and end dates of the viewing range, the number of days in the range, and the dates within the range.
 */
export interface CalendarState {
  viewingDate: Date;
  viewingStartDate: DateDetail;
  viewingEndDate: DateDetail;
  numberOfDaysInRange: number;
  datesInRange: DateDetail[];
  flags: CalendarStateFlags;
}

/**
 * An array of day texts representing the days of the week from Monday to Sunday.
 */
export const dayKeys: DayText[] = [
  "MON",
  "TUE",
  "WED",
  "THU",
  "FRI",
  "SAT",
  "SUN",
];

/**
 * A map of day numbers to their corresponding day texts, where 0 is Sunday and 6 is Saturday.
 */
export const dayKeysMap: Record<DayNumber, DayText> = {
  0: "SUN",
  1: "MON",
  2: "TUE",
  3: "WED",
  4: "THU",
  5: "FRI",
  6: "SAT",
};

/**
 * Calculates the calendar state based on the viewing date and events.
 *
 * @param viewingDate - The date being viewed.
 * @param events - The events to be included in the calendar state.
 * @param fadePastEvents - Whether to fade past events.
 * @returns The calculated calendar state.
 */
export function getCalendarState({
  viewingDate = dayjs().toDate(),
  events = [],
  flags: { fadePastEvents = false },
}: {
  viewingDate: Date;
  events: CalendarEvent[];
  flags: CalendarStateFlags;
}): CalendarState {
  const today = dayjs().toDate();
  const isViewingDateValid = dayjs(viewingDate).isValid();
  const parsedViewingDate = isViewingDateValid ? viewingDate : today;

  const viewingStartDate = getStartDateDetails(parsedViewingDate);
  const viewingEndDate = getEndDateDetails(parsedViewingDate);

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
    viewingDate: parsedViewingDate,
    viewingStartDate,
    viewingEndDate,
    numberOfDaysInRange,
    datesInRange,
    flags: {
      fadePastEvents,
    },
  };
}

/**
 * Parses a date string or array of date strings into a Date object.
 *
 * @param date - The date string or array of date strings to parse.
 * @returns The parsed Date object.
 */
export function parseParamsDate(date: string | string[] | undefined): Date {
  if (Array.isArray(date)) {
    return dayjs(date[0]).toDate();
  }
  return dayjs(date).toDate();
}

/**
 * Determines if a given date is today.
 *
 * @param date - The date to check.
 * @returns True if the date is today, false otherwise.
 */
export function isDateToday(date: Date): boolean {
  return dayjs(date).isToday();
}

/**
 * Determines if a given date is within the same month as the viewing date.
 *
 * @param date - The date to check.
 * @param viewingDate - The date being viewed.
 * @returns True if the date is within the same month as the viewing date, false otherwise.
 */
export function isDateInMonth(date: Date, viewingDate: Date): boolean {
  return getStartDate(date).isSame(viewingDate, "month");
}

/**
 * Calculates the number of days between two dates.
 *
 * @private
 * @param start - The start date.
 * @param end - The end date.
 * @returns The number of days between the start and end dates.
 */
function getNumberOfDaysInRange(start: Date, end: Date): number {
  const startDate = dayjs(start);
  const endDate = dayjs(end);
  const diff = endDate.diff(startDate, "day");
  return diff;
}

/**
 * Retrieves all dates between two given dates, including events for each date.
 *
 * @private
 * @param start - The start date.
 * @param end - The end date.
 * @param events - The events to be included in the dates.
 * @returns An array of DateDetail objects representing each date between the start and end dates, including their events.
 */
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

/**
 * Merges events into their corresponding dates.
 *
 * @private
 * @param currentDate - The date to merge events into.
 * @param events - The events to be merged.
 * @returns An array of CalendarEvent objects filtered and sorted for the given date.
 */
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

/**
 * Calculates the next viewing date based on the current viewing date, number of days, and type of manipulation.
 *
 * @param currentViewingDate - The current date being viewed.
 * @param numberOfDays - The number of days to add or subtract.
 * @param type - The type of manipulation (add or subtract).
 * @returns The next viewing date.
 */
export function nextViewingDate(
  currentViewingDate: Date,
  numberOfDays: number,
  type: dayjs.ManipulateType,
) {
  return dayjs(currentViewingDate).add(numberOfDays, type).toDate();
}

/**
 * Calculates the previous viewing date based on the current viewing date, number of days, and type of manipulation.
 *
 * @param currentViewingDate - The current date being viewed.
 * @param numberOfDays - The number of days to add or subtract.
 * @param type - The type of manipulation (add or subtract).
 * @returns The previous viewing date.
 */
export function previousViewingDate(
  currentViewingDate: Date,
  numberOfDays: number,
  type: dayjs.ManipulateType,
) {
  return dayjs(currentViewingDate).subtract(numberOfDays, type).toDate();
}

// Helper functions
//
/**
 * Retrieves the start date of a given date, adjusted to the start of the month and day.
 *
 * @private
 * @param date - The date to adjust.
 * @returns The adjusted start date.
 */
function getStartDate(date: Date): dayjs.Dayjs {
  return dayjs(date).startOf("month").startOf("day");
}

/**
 * Retrieves the start of the ISO week for a given date, adjusted to the start of the day.
 *
 * @private
 * @param date - The date to adjust.
 * @returns The adjusted start of the ISO week.
 */
function getStartWeek(date: Date): dayjs.Dayjs {
  return dayjs(date).startOf("isoWeek").startOf("day");
}

/**
 * Retrieves the details of the start date for a given date, including the date itself, its string representation, the day of the week, and an empty events array.
 *
 * @private
 * @param date - The date to retrieve details for.
 * @returns The details of the start date.
 */
function getStartDateDetails(date: Date): DateDetail {
  return {
    date: getStartDate(date).toDate(),
    dateString: getStartDate(date).toISOString(),
    day: getStartDate(date).day() as DayNumber,
    events: [],
  };
}

/**
 * Retrieves the end date of a given date, adjusted to the end of the month and day.
 *
 * @private
 * @param date - The date to adjust.
 * @returns The adjusted end date.
 */
function getEndDate(date: Date): dayjs.Dayjs {
  return dayjs(date).endOf("month").endOf("day");
}

/**
 * Retrieves the end of the ISO week for a given date, adjusted to the end of the day.
 *
 * @private
 * @param date - The date to adjust.
 * @returns The adjusted end of the ISO week.
 */
function getEndWeek(date: Date): dayjs.Dayjs {
  return dayjs(date).endOf("isoWeek").endOf("day");
}

/**
 * Retrieves the details of the end date for a given date, including the date itself, its string representation, the day of the week, and an empty events array.
 *
 * @private
 * @param date - The date to retrieve details for.
 * @returns The details of the end date.
 */
function getEndDateDetails(date: Date): DateDetail {
  return {
    date: getEndDate(date).toDate(),
    dateString: getEndDate(date).toISOString(),
    day: getEndDate(date).day() as DayNumber,
    events: [],
  };
}

/**
 * Formats a time range from a start and end date.
 *
 * @param start - The start date.
 * @param end - The end date.
 * @returns Formatted time range as string.
 */
export function formatTimeRange(start: Date, end: Date): string {
  const formattedStart = dayjs(start).format("h:mm a");
  const formattedEnd = dayjs(end).format("h:mm a");
  return `${formattedStart} - ${formattedEnd}`;
}
