"use client";

import dayjs from "dayjs";
import { Button } from "./ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useQueryString } from "@/hooks/use-querystring";
import { useCallback } from "react";
import { nextViewingDate, previousViewingDate } from "@/lib/date";
import { ButtonGroup } from "./ui/button-group";

interface HeaderProps {
  viewingDate: Date;
}

export default function Header({ viewingDate }: HeaderProps) {
  const { redirectWithQs } = useQueryString([viewingDate]);

  const goNextViewingDate = useCallback(() => {
    const nextDate = nextViewingDate(viewingDate, 1, "month").toISOString();
    redirectWithQs("viewingDate", nextDate);
  }, [redirectWithQs, viewingDate]);

  const goPrevViewingDate = useCallback(() => {
    const prevDate = previousViewingDate(viewingDate, 1, "month").toISOString();
    redirectWithQs("viewingDate", prevDate);
  }, [redirectWithQs, viewingDate]);

  return (
    <div className="flex items-center gap-4 mb-4">
      <h2 className="text-2xl font-bold flex-1">
        {dayjs(viewingDate).format("MMMM YYYY")}
      </h2>
      <ButtonGroup>
        <Button onClick={goPrevViewingDate} variant="outline" size="icon">
          <ChevronLeft className="h-4 w-4" />
        </Button>
        <Button onClick={goNextViewingDate} variant="outline" size="icon">
          <ChevronRight className="h-4 w-4" />
        </Button>
      </ButtonGroup>
    </div>
  );
}
