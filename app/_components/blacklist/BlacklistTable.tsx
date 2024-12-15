import React from "react";
import { useTranslations } from "next-intl";
import { type BlacklistEntry as BlacklistEntryType } from "@/app/_models/BlacklistEntry";
import { UpdatedAt } from "../DataAge";

import { FloatingLabelInput } from "@/components/ui/floating-label-input";
import { RefreshData } from "../RefreshData";
import GenericTable from "../table/GenericTable";
import {
  FilterFn,
  getCoreRowModel,
  getExpandedRowModel,
  getFacetedMinMaxValues,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getGroupedRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { columns } from "./tableColumns";
import { PaginationWithLinks } from "../table/Pagination";
import { Button } from "@/components/ui/button";
import { FilterX } from "lucide-react";

import { rankItem } from "@tanstack/match-sorter-utils";

// Define a custom fuzzy filter function that will apply ranking info to rows (using match-sorter utils)
const fuzzyFilter: FilterFn<any> = (row, columnId, value, addMeta) => {
  // Rank the item
  const itemRank = rankItem(row.getValue(columnId), value);

  // Store the itemRank info
  addMeta({
    itemRank,
  });

  // Return if the item should be filtered in/out
  return itemRank.passed;
};

interface Props {
  isLoading: boolean;
  blacklist: BlacklistEntryType[];
  dataUpdatedAt: number;
  refetch: () => void;
}

export default function BlacklistTable({
  isLoading,
  blacklist,
  dataUpdatedAt,
  refetch,
}: Props) {
  const t = useTranslations("BlacklistPage");
  const [pagination, setPagination] = React.useState({
    pageIndex: 0,
    pageSize: 10,
  });

  const [sorting, setSorting] = React.useState([
    {
      id: "account_name",
      desc: false,
    },
  ]);

  const [globalFilter, setGlobalFilter] = React.useState("");

  const table = useReactTable({
    data: blacklist ?? [],
    columns: columns,

    // global filter
    onGlobalFilterChange: setGlobalFilter,
    // @ts-ignore
    globalFilterFn: "fuzzy", //apply fuzzy filter to the global

    autoResetExpanded: false,

    enableRowSelection: true, //enable row selection for all rows
    getCoreRowModel: getCoreRowModel(),

    paginateExpandedRows: false,
    // sorting
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    // pagination
    getPaginationRowModel: getPaginationRowModel(),
    //grouping
    getGroupedRowModel: getGroupedRowModel(),
    getExpandedRowModel: getExpandedRowModel(),
    // filtering
    getFilteredRowModel: getFilteredRowModel(), //client-side filtering
    // client-side faceting
    getFacetedRowModel: getFacetedRowModel(), // client-side faceting
    getFacetedUniqueValues: getFacetedUniqueValues(), // generate unique values for select filter/autocomplete
    getFacetedMinMaxValues: getFacetedMinMaxValues(), // generate min/max values for range filter
    filterFns: {
      fuzzy: fuzzyFilter, //define as a filter function that can be used in column definitions
    },

    state: {
      globalFilter,
      sorting,
      pagination,
    },
  });

  const totalRowCount = React.useMemo(() => table.getRowCount(), [table]);
  return (
    <div>
      <div className="flex items-center mb-2">
        <FloatingLabelInput
          id="filter-label"
          className="w-96"
          disabled={isLoading}
          label={t("find_user")}
          value={globalFilter}
          onChange={(e) => setGlobalFilter(e.target.value)}
        />
        <RefreshData isLoading={isLoading} refetch={refetch} />
        <UpdatedAt dataUpdatedAt={new Date(dataUpdatedAt)} />

        <Button
          onClick={() => {
            setGlobalFilter("");
            table.resetColumnFilters();
          }}
          size={"icon"}
          variant={"outline"}
        >
          <FilterX className="w-4 h-4" />
        </Button>
      </div>

      <GenericTable table={table} columns={columns} isLoading={isLoading} />
      <PaginationWithLinks
        pageSize={pagination.pageSize}
        pageIndex={pagination.pageIndex}
        totalCount={totalRowCount}
        setPageSize={(pageSize) => {
          setPagination((prev) => ({ ...prev, pageSize }));
        }}
        setPageIndex={(pageIndex) => {
          setPagination((prev) => ({ ...prev, pageIndex }));
        }}
        pageSizeSelectOptions={{
          defaultPageSize: 10,
          pageSizeOptions: [10, 25, 50, 100],
        }}
        selectedItemsOptions={{
          selectedItems: table.getRowModel().rows.length,
          filteredSelectedItems: table.getFilteredRowModel().rows.length,
        }}
      />
    </div>
  );
}
