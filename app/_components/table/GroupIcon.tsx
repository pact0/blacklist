import type { Column } from "@tanstack/react-table";
import React from "react";
import { Group, Ungroup } from "lucide-react";
import { useTranslations } from "next-intl";

import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import { FOCUSED_TEXT } from "./filters/utils";
import { cn } from "@/lib/utils";

interface HeaderProps<TData> {
  column: Column<TData, unknown>;
}

export default function GroupIcon<TData>({ column }: HeaderProps<TData>) {
  const t = useTranslations("Filters");
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            onClick={column.getToggleGroupingHandler()}
            variant={"ghost"}
            size={"icon"}
          >
            {column.getIsGrouped() ? (
              <Ungroup className={cn("h-4 w-4", FOCUSED_TEXT)} />
            ) : (
              <Group className={cn("h-4 w-4")} />
            )}
          </Button>
        </TooltipTrigger>
        <TooltipContent>{t("group_info")}</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
