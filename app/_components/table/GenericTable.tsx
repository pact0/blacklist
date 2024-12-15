import type { ColumnDef, Table as TableType } from "@tanstack/react-table";
import React from "react";
import { flexRender } from "@tanstack/react-table";
import { ChevronDown, ChevronRight } from "lucide-react";
import { useTranslations } from "next-intl";

import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { Spinner } from "../Spinner";
import { cn } from "@/lib/utils";
import { ReportLink } from "../blacklist/ReportLink";

interface Props<T> {
  table: TableType<T>;
  isLoading?: boolean;
  columns: ColumnDef<T>[];
}

export default function GenericTable<T>({
  table,
  isLoading,
  columns,
}: Props<T>) {
  const t = useTranslations("BlacklistPage");

  return (
    <Table>
      <TableHeader>
        {table.getHeaderGroups().map((headerGroup) => (
          <TableRow key={headerGroup.id}>
            {headerGroup.headers.map((header) => {
              return (
                <TableHead
                  // @ts-ignore
                  className={header.column.columnDef.meta?.headerClassName}
                  key={header.id}
                >
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext(),
                      )}
                </TableHead>
              );
            })}
          </TableRow>
        ))}
      </TableHeader>

      <TableBody className="h-[40svh]">
        {isLoading ? (
          <TableRow>
            <TableCell colSpan={columns.length} className="h-64 text-center">
              <div className="flex h-full items-center justify-center">
                <Spinner />
              </div>
            </TableCell>
          </TableRow>
        ) : table.getRowModel().rows.length ? (
          table.getRowModel().rows.map((row) => (
            <TableRow
              key={row.id}
              data-state={row.getIsSelected() && "selected"}
            >
              {row.getVisibleCells().map((cell) => (
                <TableCell
                  // @ts-ignore
                  className={cn(cell.column.columnDef.meta?.cellClassName)}
                  key={cell.id}
                >
                  {cell.getIsGrouped() ? (
                    <Button
                      variant={"outline"}
                      className={cn(
                        "flex items-center justify-start bg-transparent",
                      )}
                      onClick={row.getToggleExpandedHandler()}
                      {...{
                        style: {
                          cursor: row.getCanExpand() ? "pointer" : "normal",
                        },
                      }}
                    >
                      {row.getIsExpanded() ? <ChevronDown /> : <ChevronRight />}
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                      ({row.subRows.length})
                    </Button>
                  ) : cell.getIsAggregated() ? (
                    flexRender(
                      cell.column.columnDef.aggregatedCell ??
                        cell.column.columnDef.cell,
                      cell.getContext(),
                    )
                  ) : cell.getIsPlaceholder() ? null : (
                    flexRender(cell.column.columnDef.cell, cell.getContext())
                  )}
                </TableCell>
              ))}
            </TableRow>
          ))
        ) : (
          <TableRow>
            <TableCell colSpan={columns.length} className="h-24 text-center">
              <div className="flex flex-col items-center justify-center">
                <div>{t("user_not_found")}</div>
                <div>{t("if_you_think_should_be_blacklisted")}</div>
                <ReportLink />
              </div>
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}
