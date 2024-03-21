import dayjs from "dayjs";
import { ButtonGroup } from "./ui/button-group";
import { NextViewButton, PrevViewButton } from "./navigation-button";
import { formatDateRange, type CalendarState } from "@/lib/date";
import { CalendarTypeSwitcher } from "./calendar-type-switcher-button";
import { cn } from "@/lib/utils";

export default function Header(props: CalendarState) {
  const isWeekView = props.type === "week";

  return (
    <div className="grid grid-cols-3 gap-4 mb-4">
      <div className="col-span-1">
        <h2 className={cn("font-bold", !isWeekView && "text-2xl")}>
          {dayjs(props.viewingDate).format("MMMM YYYY")}
        </h2>
        {isWeekView ? (
          <p className="text-sm text-muted-foreground">
            {formatDateRange(
              props.viewingStartDate.date,
              props.viewingEndDate.date,
            )}
          </p>
        ) : null}
      </div>

      <div className="col-span-1 flex justify-center">
        <CalendarTypeSwitcher {...props} />
      </div>

      <div className="col-span-1 flex justify-end">
        <ButtonGroup className="border border-input rounded-md p-1 gap-1">
          <PrevViewButton {...props} />
          <NextViewButton {...props} />
        </ButtonGroup>
      </div>
    </div>
  );
}
