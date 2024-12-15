import type { Column } from "@tanstack/react-table";
import React, { useState } from "react";
import { useTranslations } from "next-intl";

interface SelectFilterProps<TData> {
  column: Column<TData, unknown>;
}

export default function SelectFilter<TData>({
  column,
}: SelectFilterProps<TData>) {
  const t = useTranslations("Filters");
  const [filterValue, setFilterValue] = useState<string | undefined>("");

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const sortedUniqueValues: any[] = React.useMemo(
    () =>
      // eslint-disable-next-line @typescript-eslint/no-unsafe-return
      Array.from(column.getFacetedUniqueValues().keys()).sort().slice(0, 5000),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [column.getFacetedUniqueValues()],
  );

  return (
    <select
      onChange={async (e) => {
        setFilterValue(e.target.value);
        column.setFilterValue(e.target.value);
      }}
      value={filterValue?.toString()}
    >
      <option value="">{t("all")}</option>
      {sortedUniqueValues.map((value) => (
        //dynamically generated select options from faceted values feature
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        <option value={value} key={value}>
          {value}
        </option>
      ))}
    </select>
  );
}
