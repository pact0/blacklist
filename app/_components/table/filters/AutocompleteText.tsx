import type { Column } from "@tanstack/react-table";
import React, { useState } from "react";
import { useTranslations } from "next-intl";

import DebouncedInput from "./DebounceInput";
import { BASE_INPUT_STYLE } from "./utils";
import { cn } from "@/lib/utils";

interface AutocompleteTextProps<TData> {
  column: Column<TData, unknown>;
}

export default function AutocompleteText<TData>({
  column,
}: AutocompleteTextProps<TData>) {
  const t = useTranslations("Filters");

  const [filterValue, setFilterValue] = useState<string | undefined>(undefined);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const sortedUniqueValues: any[] = React.useMemo(
    () =>
      // eslint-disable-next-line @typescript-eslint/no-unsafe-return
      Array.from(column.getFacetedUniqueValues().keys()).sort().slice(0, 5000),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [column.getFacetedUniqueValues()],
  );

  return (
    <>
      {/* Autocomplete suggestions from faceted values feature */}
      <datalist className="bg-background" id={column.id + "list"}>
        {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          sortedUniqueValues.map((value: any) => (
            <option
              className="bg-background"
              // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
              value={value}
              // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
              key={value}
            />
          ))
        }
      </datalist>
      <DebouncedInput
        type="text"
        value={(filterValue ?? "") as string}
        onChange={async (value) => {
          setFilterValue(String(value));
          column.setFilterValue(value);
        }}
        placeholder={`${t("search")} (${column.getFacetedUniqueValues().size})`}
        className={cn(BASE_INPUT_STYLE)}
        list={column.id + "list"}
      />
    </>
  );
}
