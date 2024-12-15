import React from "react";

import AutocompleteText from "./AutocompleteText";
import MinMax from "./MinMax";
import MultiSelectFilter from "./MultiSelectFilter";
import SelectFilter from "./SelectFilter";
import type { Column } from "@tanstack/react-table";
import { DatePickerWithRange } from "./DateFilter";

export default function Filter<TData>({
  column,
}: {
  column: Column<TData, unknown>;
}) {
  const { filterVariant, filterValues } = column.columnDef.meta ?? {};
  // if (!filterParser || !filterKey) return null;

  switch (filterVariant) {
    case "multi":
      return <MultiSelectFilter column={column} selectValues={filterValues} />;
    case "range":
      return <MinMax column={column} />;
    case "select":
      return <SelectFilter column={column} />;
    case "date":
      return <DatePickerWithRange column={column} />;
    default:
      return <AutocompleteText column={column} />;
  }
}
