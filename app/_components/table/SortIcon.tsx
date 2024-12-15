import type { Column } from "@tanstack/react-table";
import React from "react";
import { ArrowDown, ArrowUp, ArrowUpDown } from "lucide-react";
import { useTranslations } from "next-intl";

import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import { FOCUSED_TEXT } from "./helpers";
import { cn } from "@/lib/utils";

interface HeaderProps<TData> {
  column: Column<TData, unknown>;
}

export default function SortIcon<TData>({ column }: HeaderProps<TData>) {
  const t = useTranslations("Filters");
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            onClick={column.getToggleSortingHandler()}
            variant={"ghost"}
            size={"icon"}
          >
            {{
              asc: <ArrowUp className={cn("h-4 w-4", FOCUSED_TEXT)} />,
              desc: <ArrowDown className={cn("h-4 w-4", FOCUSED_TEXT)} />,
            }[column.getIsSorted() as string] ?? (
              <ArrowUpDown className="h-4 w-4" />
            )}
          </Button>
        </TooltipTrigger>
        <TooltipContent>{t("sort_info")}</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
