import React from "react";
import { useQuery } from "@tanstack/react-query";
import Papa from "papaparse";
import { parse } from "date-fns";
import { useTranslations } from "next-intl";
import { type BlacklistEntry as BlacklistEntryType } from "@/app/_models/BlacklistEntry";
import BlacklistTable from "./BlacklistTable";

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

  if (isError) return <div>{t("failed_blacklist")}</div>;

  return (
    <div className="min-h-[90vh] p-10">
      <div className="flex flex-col items-center justify-center">
        <h1 className="text-3xl font-bold">{t("title")}</h1>
        <h2 className="text-lg">{t("subtitle")}</h2>
      </div>
      <BlacklistTable
        isLoading={isLoading}
        blacklist={blacklist ?? []}
        dataUpdatedAt={dataUpdatedAt}
        refetch={refetch}
      />
    </div>
  );
};

export default BlacklistFetcher;
