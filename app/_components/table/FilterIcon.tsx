"use client";

import type { Column } from "@tanstack/react-table";
import React from "react";
import { Filter as FilterI } from "lucide-react";
import { useTranslations } from "next-intl";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import Filter from "./filters/Filter";
import { FOCUSED_TEXT } from "./helpers";
import { cn } from "@/lib/utils";

interface HeaderProps<TData> {
  column: Column<TData, unknown>;
}

export default function FilterIcon<TData>({ column }: HeaderProps<TData>) {
  const t = useTranslations("Filters");
  return (
    <Popover>
      <PopoverTrigger>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              {
                // WARNING: copy button styles for the div, fixing hydration issue, button can't be descendant of button
              }
              <div className="inline-flex h-10 w-10 items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50">
                <FilterI
                  className={cn(
                    "h-4 w-4",
                    !!column.getFilterValue() && FOCUSED_TEXT,
                  )}
                />
              </div>
            </TooltipTrigger>
            <TooltipContent>{t("filter_info")}</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </PopoverTrigger>

      <PopoverContent className="w-full">
        {column.getCanFilter() ? <Filter column={column} /> : null}
      </PopoverContent>
    </Popover>
  );
}
