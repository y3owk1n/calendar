"use client";

import { Button } from "./ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useQueryString } from "@/hooks/use-querystring";
import { type ReactNode, useCallback } from "react";
import {
  type CalendarState,
  nextViewingDate,
  previousViewingDate,
} from "@/lib/date";
import { ButtonGroup } from "./ui/button-group";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";

const navigationButtonTypes: {
  type: "prev" | "next";
  label: string;
  icon: ReactNode;
}[] = [
  {
    type: "prev",
    label: "Prev",
    icon: <ChevronLeft className="h-4 w-4" />,
  },
  {
    type: "next",
    label: "Next",
    icon: <ChevronRight className="h-4 w-4" />,
  },
];

export function CalendarNavigationButtons(props: CalendarState) {
  return (
    <ButtonGroup className="border border-input rounded-md p-1 gap-1">
      {navigationButtonTypes.map((type) => (
        <CalendarNavigationButton
          key={type.type}
          buttonProps={type}
          {...props}
        />
      ))}
    </ButtonGroup>
  );
}

function CalendarNavigationButton(
  props: CalendarState & {
    buttonProps: (typeof navigationButtonTypes)[number];
  },
) {
  const { redirectWithQs } = useQueryString([props.type, props.viewingDate]);

  const navigate = useCallback(() => {
    let nextDate: string;

    if (props.buttonProps.type === "prev") {
      nextDate = previousViewingDate(
        props.viewingDate,
        1,
        props.type,
      ).toISOString();
    } else {
      nextDate = nextViewingDate(
        props.viewingDate,
        1,
        props.type,
      ).toISOString();
    }

    redirectWithQs("viewingDate", nextDate);
  }, [redirectWithQs, props.viewingDate, props.type, props.buttonProps.type]);

  return (
    <TooltipProvider>
      <Tooltip>
        <Button
          aria-label={props.buttonProps.label}
          onClick={navigate}
          variant="ghost"
          size="icon"
          asChild
        >
          <TooltipTrigger>{props.buttonProps.icon}</TooltipTrigger>
        </Button>
        <TooltipContent>
          <p>{props.buttonProps.label}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
