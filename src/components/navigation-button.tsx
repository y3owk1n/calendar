"use client";

import { Button } from "./ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useQueryString } from "@/hooks/use-querystring";
import { useCallback } from "react";
import {
  type CalendarState,
  nextViewingDate,
  previousViewingDate,
} from "@/lib/date";

export function PrevViewButton(props: CalendarState) {
  const { redirectWithQs } = useQueryString([props.viewingDate, props.type]);

  const goPrevViewingDate = useCallback(() => {
    const prevDate = previousViewingDate(
      props.viewingDate,
      1,
      props.type,
    ).toISOString();
    redirectWithQs("viewingDate", prevDate);
  }, [redirectWithQs, props.viewingDate, props.type]);

  return (
    <Button onClick={goPrevViewingDate} variant="ghost" size="icon">
      <ChevronLeft className="h-4 w-4" />
    </Button>
  );
}

export function NextViewButton(props: CalendarState) {
  const { redirectWithQs } = useQueryString([props.viewingDate, props.type]);

  const goNextViewingDate = useCallback(() => {
    const nextDate = nextViewingDate(
      props.viewingDate,
      1,
      props.type,
    ).toISOString();
    redirectWithQs("viewingDate", nextDate);
  }, [redirectWithQs, props.viewingDate, props.type]);

  return (
    <Button onClick={goNextViewingDate} variant="ghost" size="icon">
      <ChevronRight className="h-4 w-4" />
    </Button>
  );
}
