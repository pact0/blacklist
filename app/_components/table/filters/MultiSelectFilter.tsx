import type { Column } from "@tanstack/react-table";
import React, { useState } from "react";
import { useTranslations } from "next-intl";

import { MultiSelect } from "@/components/ui/multi-select";

interface MultiSelectFilterProps<TData> {
  column: Column<TData, unknown>;
  selectValues?: string[];
}

export default function MultiSelectFilter<TData>({
  column,
  selectValues,
}: MultiSelectFilterProps<TData>) {
  const t = useTranslations("Filters");
  const [filterValue, setFilterValue] = useState<string[]>([]);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const sortedUniqueValues: any[] = React.useMemo(
    () =>
      // eslint-disable-next-line @typescript-eslint/no-unsafe-return
      selectValues ??
      Array.from(column.getFacetedUniqueValues().keys()).sort().slice(0, 5000),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [column.getFacetedUniqueValues()],
  );

  return (
    <MultiSelect
      className="w-[260px] text-xs"
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      options={sortedUniqueValues.map((v) => ({ value: v, label: v }))}
      onValueChange={async (e) => {
        setFilterValue(e);
        column.setFilterValue(e);
      }}
      defaultValue={filterValue as string[]}
      placeholder={`${t("search")} (${column.getFacetedUniqueValues().size})`}
      variant="secondary"
      animation={2}
      maxCount={3}
    />
  );
}
