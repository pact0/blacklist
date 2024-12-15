"use client";

import * as React from "react";
import { CalendarIcon } from "lucide-react";
import { DateRange } from "react-day-picker";
import { useFormatter } from "next-intl";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Column } from "@tanstack/react-table";
import { startOfMonth, subMonths, endOfToday } from "date-fns";

interface FilterProps<TData> {
  column: Column<TData, unknown>;
  className?: string;
}

export function DatePickerWithRange<TData>({
  column,
  className,
}: FilterProps<TData>) {
  const format = useFormatter();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const sortedUniqueValues: any[] = React.useMemo(
    () =>
      // eslint-disable-next-line @typescript-eslint/no-unsafe-return
      Array.from(column.getFacetedUniqueValues().keys()).sort().slice(0, 5000),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [column.getFacetedUniqueValues()],
  );

  const start =
    sortedUniqueValues.at(0) ?? startOfMonth(subMonths(new Date(), 1));
  const end = endOfToday();

  const [date, setLocalDate] = React.useState<DateRange | undefined>({
    from: start,
    to: end,
  });

  const setDate = (date: DateRange) => {
    if (!date) return;

    if (!date.from) {
      date.from = start;
    }
    if (!date.to) {
      date.to = end;
    }
    setLocalDate(date);
    column.setFilterValue([date.from?.getTime(), date.to?.getTime()]);
  };

  return (
    <div className={cn("grid gap-2", className)}>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant={"outline"}
            className={cn(
              "w-[300px] justify-start text-left font-normal",
              !date && "text-muted-foreground",
            )}
          >
            <CalendarIcon />
            {date?.from ? (
              date.to ? (
                <>
                  {format.dateTime(date.from, {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })}{" "}
                  -{" "}
                  {format.dateTime(date.to, {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })}
                </>
              ) : (
                format.dateTime(date.from, {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                })
              )
            ) : (
              <span>Pick a date</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            initialFocus
            mode="range"
            defaultMonth={date?.from}
            selected={date}
            // @ts-ignore
            onSelect={setDate}
            numberOfMonths={2}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}
