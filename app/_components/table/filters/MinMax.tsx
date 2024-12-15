import type { Column } from "@tanstack/react-table";
import React, { useState } from "react";
import { useTranslations } from "next-intl";

import DebouncedInput from "./DebounceInput";
import { BASE_INPUT_STYLE } from "./utils";
import { cn } from "@/lib/utils";

interface MinMaxProps<TData> {
  column: Column<TData, unknown>;
}

export default function MinMax<TData>({ column }: MinMaxProps<TData>) {
  const t = useTranslations("Filters");
  const [value, setValue] = useState<[number, number]>([0, 0]);

  return (
    <div>
      <div className="flex space-x-2">
        <DebouncedInput
          type="number"
          min={Number(column.getFacetedMinMaxValues()?.[0] ?? "")}
          max={Number(column.getFacetedMinMaxValues()?.[1] ?? "")}
          value={(value as [number, number])[0]}
          onChange={async (value) => {
            // @ts-ignore
            setValue((old: [number, number]) => [value, old[1]]);
            column.setFilterValue((old: [number, number] | undefined) => [
              value,
              old?.[1],
            ]);
          }}
          placeholder={`${t("min")} ${
            column.getFacetedMinMaxValues()?.[0] !== undefined
              ? `(${column.getFacetedMinMaxValues()?.[0]})`
              : ""
          }`}
          className={cn(BASE_INPUT_STYLE)}
        />
        <DebouncedInput
          type="number"
          className={cn(BASE_INPUT_STYLE)}
          min={Number(column.getFacetedMinMaxValues()?.[0] ?? "")}
          max={Number(column.getFacetedMinMaxValues()?.[1] ?? "")}
          value={(value as [number, number])[1]}
          onChange={async (value) => {
            // @ts-ignore
            setValue((old: [number, number]) => [old[0], value]);
            column.setFilterValue((old: [number, number] | undefined) => [
              old?.[0],
              value,
            ]);
          }}
          placeholder={`${t("max")}} ${
            column.getFacetedMinMaxValues()?.[1]
              ? `(${column.getFacetedMinMaxValues()?.[1]})`
              : ""
          }`}
        />
      </div>
    </div>
  );
}
