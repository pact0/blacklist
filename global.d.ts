import { type RankingInfo } from "@tanstack/match-sorter-utils";

//
// Use type safe message keys with `next-intl`
type Messages = typeof import("./i18n/messages/en.json");
declare interface IntlMessages extends Messages {}

// declare module "@tanstack/react-table" {
//   interface ColumnMeta<TData extends RowData, TValue> {
//     filterVariant?: "text" | "range" | "select" | "multi" | "custom";
//     customComponent?: React.ComponentType<CustomComponentProps<TData, TValue>>;
//     filterValues?: string[];
//   }
//
//   //add fuzzy filter to the filterFns
//   interface FilterFns {
//     fuzzy: FilterFn<unknown>;
//   }
//   interface FilterMeta {
//     itemRank: RankingInfo;
//   }
//
//   // eslint-disable-next-line @typescript-eslint/no-unused-vars
//   interface ColumnMeta<TData extends RowData, TValue> {
//     headerClassName?: string;
//     cellClassName?: string;
//   }
// }
