"use client";

import { cn } from "@/lib/utils";
import type { HeaderContext } from "@tanstack/react-table";
import { useTranslations } from "next-intl";
import React from "react";
import SortIcon from "./SortIcon";
import FilterIcon from "./FilterIcon";
import GroupIcon from "./GroupIcon";

interface HeaderProps<TData> {
  header: HeaderContext<TData, unknown>;
  name?: string;
  justifyLeft?: boolean;
  justifyRight?: boolean;
  icon?: React.ReactNode;
}

export default function DefaultHeader<TData>({
  header: { column },
  name,
  justifyLeft,
  justifyRight,
  icon,
}: HeaderProps<TData>) {
  const t = useTranslations("TableHeader");
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center",
        justifyLeft && "items-start",
        justifyRight && "items-end",
      )}
    >
      <div className={cn("flex items-center justify-center gap-x-1")}>
        {icon}
        {name ? t(name) : column.id}
      </div>

      <div>
        {column.getCanGroup() && <GroupIcon column={column} />}
        {/**/}
        {column.getCanSort() && <SortIcon column={column} />}
        {/**/}
        {column.getCanFilter() && <FilterIcon column={column} />}
      </div>
    </div>
  );
}
