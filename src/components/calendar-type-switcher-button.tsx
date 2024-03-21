"use client";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";
import { Toggle } from "./ui/toggle";
import type { CalendarState, CalendarType } from "@/lib/date";
import { ButtonGroup } from "./ui/button-group";
import { useQueryString } from "@/hooks/use-querystring";
import type { ReactNode } from "react";
import { Columns3, Columns4 } from "lucide-react";

const calendarButtonTypes: {
  type: CalendarType;
  label: string;
  icon: ReactNode;
}[] = [
  {
    type: "week",
    label: "Week View",
    icon: <Columns3 className="h-4 w-4" />,
  },
  {
    type: "month",
    label: "Month View",
    icon: <Columns4 className="h-4 w-4" />,
  },
];

export function CalendarTypeSwitcher(props: CalendarState) {
  return (
    <div className="border border-input rounded-md flex p-1 gap-1">
      {calendarButtonTypes.map((type) => (
        <CalendarTypeSwitcherButton
          key={type.type}
          buttonProps={type}
          {...props}
        />
      ))}
    </div>
  );
}

function CalendarTypeSwitcherButton(
  props: CalendarState & {
    buttonProps: (typeof calendarButtonTypes)[number];
  },
) {
  const { redirectWithQs } = useQueryString([props.type, props.viewingDate]);

  function switchCalendarType() {
    redirectWithQs("calendarType", props.buttonProps.type);
  }

  return (
    <TooltipProvider>
      <Tooltip>
        <Toggle
          defaultPressed={props.type === props.buttonProps.type}
          pressed={props.type === props.buttonProps.type}
          onPressedChange={switchCalendarType}
          aria-label={props.buttonProps.label}
          asChild
        >
          <TooltipTrigger>{props.buttonProps.icon}</TooltipTrigger>
        </Toggle>
        <TooltipContent>
          <p>{props.buttonProps.label}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
