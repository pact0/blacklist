"use client";

import type { ReactNode } from "react";
import { useEffect } from "react";
import { useTranslations } from "next-intl";

import { Button } from "@/components/ui/button";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";

export interface PaginationWithLinksProps {
  pageIndex: number;
  pageSize: number;
  setPageSize: (newPage: number) => void;
  setPageIndex: (newPage: number) => void;

  pageSizeSelectOptions?: {
    pageSizeSearchParam?: string;
    pageSizeOptions: number[];
    defaultPageSize?: number;
  };

  selectedItemsOptions?: {
    filteredSelectedItems: number;
    selectedItems: number;
  };

  totalCount: number;
  manualPagination?: boolean;
}

export function PaginationWithLinks({
  pageIndex,
  pageSize,
  setPageIndex,
  setPageSize,

  pageSizeSelectOptions,
  manualPagination,
  totalCount,
  selectedItemsOptions,
}: PaginationWithLinksProps) {
  const t = useTranslations("Table");

  const totalPageCount = Math.max(Math.ceil(totalCount / pageSize) - 1, 0);

  useEffect(() => {
    if (pageIndex > totalPageCount && !manualPagination) {
      setPageIndex(totalPageCount);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [totalPageCount, pageIndex, totalCount]);

  const renderPageNumbers = () => {
    const items: ReactNode[] = [];
    const maxVisiblePages = 5;

    if (totalPageCount <= maxVisiblePages) {
      for (let i = 0; i <= totalPageCount; i++) {
        items.push(
          <PaginationItem key={i}>
            <PaginationLink
              onClick={() => setPageIndex(i)}
              isActive={pageIndex === i}
            >
              <Button variant="ghost" size="icon">
                {i + 1}
              </Button>
            </PaginationLink>
          </PaginationItem>,
        );
      }
    } else {
      items.push(
        <PaginationItem key={1}>
          <PaginationLink
            onClick={() => setPageIndex(0)}
            isActive={pageIndex === 0}
          >
            <Button variant="ghost" size="icon">
              1
            </Button>
          </PaginationLink>
        </PaginationItem>,
      );

      if (pageIndex > 3) {
        items.push(
          <PaginationItem key="ellipsis-start">
            <PaginationEllipsis />
          </PaginationItem>,
        );
      }

      const start = Math.max(2, pageIndex - 1);
      const end = Math.min(totalPageCount - 1, pageIndex + 1);

      for (let i = start; i <= end; i++) {
        items.push(
          <PaginationItem key={i}>
            <PaginationLink
              onClick={() => setPageIndex(i - 1)}
              isActive={pageIndex === i - 1}
            >
              <Button variant="ghost" size="icon">
                {i}
              </Button>
            </PaginationLink>
          </PaginationItem>,
        );
      }

      if (pageIndex < totalPageCount - 2) {
        items.push(
          <PaginationItem key="ellipsis-end">
            <PaginationEllipsis />
          </PaginationItem>,
        );
      }

      items.push(
        <PaginationItem key={totalPageCount}>
          <PaginationLink
            onClick={() => setPageIndex(totalPageCount)}
            isActive={pageIndex === totalPageCount}
          >
            {totalPageCount}
          </PaginationLink>
        </PaginationItem>,
      );
    }

    return items;
  };

  return (
    <div className="flex w-full flex-col items-center gap-3 md:flex-row">
      {selectedItemsOptions && (
        <span className="text-sm text-muted-foreground">
          {t("currently_selected", {
            current: selectedItemsOptions.selectedItems,
            total: selectedItemsOptions.filteredSelectedItems,
          })}
        </span>
      )}

      {manualPagination && (
        <span className="text-sm text-muted-foreground">
          {t("currently_showing", { total: totalCount })}
        </span>
      )}

      <Pagination
        className={cn("", { "md:justify-center": pageSizeSelectOptions })}
      >
        <PaginationContent className="max-sm:gap-0">
          <PaginationItem>
            <PaginationPrevious
              label={t("previous")}
              onClick={() => setPageIndex(Math.max(pageIndex - 1, 0))}
              aria-disabled={pageIndex === 0}
              tabIndex={pageIndex === 0 ? -1 : undefined}
              className={cn(
                pageIndex === 0 ? "pointer-events-none opacity-50" : undefined,
                "cursor-pointer",
              )}
            />
          </PaginationItem>

          {renderPageNumbers()}

          <PaginationItem>
            <PaginationNext
              label={t("next")}
              onClick={() =>
                setPageIndex(Math.min(pageIndex + 1, totalPageCount))
              }
              aria-disabled={pageIndex === totalPageCount}
              tabIndex={pageIndex === totalPageCount ? -1 : undefined}
              className={cn(
                pageIndex === totalPageCount
                  ? "pointer-events-none opacity-50"
                  : undefined,
                "cursor-pointer",
              )}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>

      {pageSizeSelectOptions && (
        <SelectRowsPerPage
          options={pageSizeSelectOptions.pageSizeOptions}
          setPageSize={setPageSize}
          pageSize={pageSize}
        />
      )}
    </div>
  );
}

function SelectRowsPerPage({
  options,
  setPageSize,
  pageSize,
}: {
  options: number[];
  setPageSize: (newSize: number) => void;
  pageSize: number;
}) {
  const t = useTranslations("Table");

  return (
    <div className="flex items-center gap-4">
      <span className="whitespace-nowrap text-sm">{t("items_per_page")}</span>

      <Select
        value={String(pageSize)}
        onValueChange={(value) => setPageSize(Number(value))}
      >
        <SelectTrigger>
          <SelectValue placeholder="Select page size">
            {String(pageSize)}
          </SelectValue>
        </SelectTrigger>
        <SelectContent>
          {options.map((option) => (
            <SelectItem key={option} value={String(option)}>
              {option}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
