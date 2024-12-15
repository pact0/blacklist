import React, { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import Papa from "papaparse";
import { RefreshBlacklist } from "./RefreshBlacklist";
import { parse } from "date-fns";
import { useTranslations } from "next-intl";
import { type BlacklistEntry as BlacklistEntryType } from "@/app/_models/BlacklistEntry";
import { BlacklistEntry, BlacklistEntryNotFound } from "./BlacklistEntry";
import { UpdatedAt } from "../DataAge";
import { Input } from "@/components/ui/input";

import { useVirtualizer } from "@tanstack/react-virtual";
import { AppealLink, AppealLinkLong } from "./AppealLink";
import { FloatingLabelInput } from "@/components/ui/floating-label-input";
import { RefreshData } from "../RefreshData";

const CSV_LINK =
  "https://raw.githubusercontent.com/The-Forbidden-Trove/ForbiddenTroveBlacklist/main/blacklist.csv";

const parseActiveField = (value: unknown): boolean => {
  if (value == null) return false;

  const normalizedValue = String(value).toLowerCase().trim();
  const positiveValues = ["y", "yes", "t", "true"];
  const negativeValues = ["n", "no", "f", "false"];

  if (positiveValues.includes(normalizedValue)) return true;
  if (negativeValues.includes(normalizedValue)) return false;

  return false;
};

const parseDate = (dateString: string): Date => {
  const cleanedDate = cleanText(dateString);

  const dateFormat = "dd/MM/yyyy";
  const parsedDate = parse(cleanedDate, dateFormat, new Date());

  return parsedDate;
};

const cleanText = (text: unknown): string => {
  if (text == null) return "";
  return String(text).trim().replace(/^"|"$/g, "").replace(/\s+/g, " ").trim();
};

const parseDiscordId = (id: unknown): number | null => {
  if (id == null || id === "") return null;

  const cleanedId = cleanText(id);
  const parsedId = parseInt(cleanedId, 10);

  return isNaN(parsedId) ? null : parsedId;
};

const fetchBlacklistData = async (): Promise<BlacklistEntryType[]> => {
  const response = await fetch(CSV_LINK);

  if (!response.ok) {
    throw new Error("Network response was not ok");
  }

  const csvText = await response.text();
  console.log(csvText);

  return new Promise((resolve, reject) => {
    Papa.parse<BlacklistEntryType>(csvText, {
      header: true,
      transformHeader: (header: string) => header.toLowerCase().trim(),
      skipEmptyLines: true,
      escapeChar: '"',
      complete: (results) => {
        const processedEntries = results.data
          .filter((entry: any) => {
            const accountName = cleanText(entry.account_name);
            return accountName !== "";
          })
          .map((entry: any) => ({
            account_name: cleanText(entry.account_name),
            discord_id: parseDiscordId(entry.discord_id),
            blacklisted_on: parseDate(entry.blacklisted_on),
            reason: cleanText(entry.reason),
            active: parseActiveField(entry.active),
          }));

        resolve(processedEntries);
      },
      error: () => {
        reject(new Error("Error parsing CSV"));
      },
    });
  });
};

const BlacklistFetcher: React.FC = () => {
  const {
    data: blacklist,
    dataUpdatedAt,
    isLoading,
    isError,
    refetch,
  } = useQuery<BlacklistEntryType[]>({
    queryKey: ["blacklist"],
    queryFn: fetchBlacklistData,
    staleTime: 1000 * 60 * 5,
    refetchInterval: 1000 * 60 * 5,
  });
  const t = useTranslations("BlacklistPage");
  const [filter, setFilter] = React.useState<string>("");

  if (isLoading) return <div>{t("loading_blacklist")}</div>;
  if (isError) return <div>{t("failed_blacklist")}</div>;
  if (!blacklist) return <div>{t("failed_blacklist")}</div>;

  return (
    <div className="min-h-[90vh] p-4">
      <div>
        <FloatingLabelInput
          disabled={isLoading}
          label={t("find_user")}
          placeholder={t("filter_by")}
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        />
        <RefreshData isLoading={isLoading} refetch={refetch} />
        <UpdatedAt dataUpdatedAt={new Date(dataUpdatedAt)} />
      </div>

      <BlacklistDisplay filter={filter} blacklist={blacklist} />
    </div>
  );
};

const BlacklistDisplay = ({
  blacklist,
  filter,
}: {
  blacklist: BlacklistEntryType[];
  filter: string;
}) => {
  const filteredBlacklist = blacklist?.filter((entry) => {
    const accountName = entry.account_name.toLowerCase();
    const discordId = entry.discord_id?.toString() || "";
    const reason = entry.reason.toLowerCase();
    return (
      accountName.includes(filter) ||
      discordId.includes(filter) ||
      reason.includes(filter)
    );
  });

  const parentRef = React.useRef(null);

  const rowVirtualizer = useVirtualizer({
    count: filteredBlacklist.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 35,
    overscan: 5,
  });
  const t = useTranslations("BlacklistPage");

  if (filter === "") return <div></div>;

  return (
    <div className="flex flex-col items-center justify-center">
      <div>{t("if_this_is_your_profile")}</div>
      <AppealLink />

      <div
        ref={parentRef}
        className="List"
        style={{
          height: `40vh`,
          width: `100vw`,
          overflow: "auto",
        }}
      >
        <div
          style={{
            height: `${rowVirtualizer.getTotalSize()}px`,
            width: "100%",
            position: "relative",
          }}
        >
          {rowVirtualizer.getVirtualItems().map((virtualRow) => {
            const entry = filteredBlacklist[virtualRow.index];
            const { account_name, discord_id, reason } = entry;
            return (
              <div
                key={virtualRow.index}
                className={
                  virtualRow.index % 2 ? "ListItemOdd" : "ListItemEven"
                }
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  transform: `translateY(${virtualRow.start}px)`,
                }}
              >
                <BlacklistEntry
                  key={`blEntry-${discord_id}-${account_name}-${reason}-${virtualRow.index}`}
                  entry={entry}
                />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default BlacklistFetcher;
