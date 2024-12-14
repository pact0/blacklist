import React from "react";
import { useQuery } from "@tanstack/react-query";
import Papa from "papaparse";
import { RefreshBlacklist } from "./RefreshBlacklist";
import { parse } from "date-fns";
import { LocalizedDate } from "./LocalizedDate";
import { useTranslations } from "next-intl";

interface BlacklistEntry {
  account_name: string;
  discord_id: number | null;
  blacklisted_on: Date;
  reason: string;
  active: boolean;
}

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

const fetchBlacklistData = async (): Promise<BlacklistEntry[]> => {
  const csvUrl =
    "https://raw.githubusercontent.com/The-Forbidden-Trove/ForbiddenTroveBlacklist/main/blacklist.csv";

  const response = await fetch(csvUrl);

  if (!response.ok) {
    throw new Error("Network response was not ok");
  }

  const csvText = await response.text();
  console.log(csvText);

  return new Promise((resolve, reject) => {
    Papa.parse<BlacklistEntry>(csvText, {
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
    isLoading,
    isError,
  } = useQuery<BlacklistEntry[]>({
    queryKey: ["blacklist"],
    queryFn: fetchBlacklistData,
    staleTime: 1000 * 60 * 5,
    refetchInterval: 1000 * 60 * 5,
  });
  const t = useTranslations("BlacklistPage");

  if (isLoading) return <div>{t("loading_blacklist")}</div>;
  if (isError) return <div>{t("failed_blacklist")}</div>;

  return (
    <div>
      <h2>Blacklisted Entries</h2>
      <RefreshBlacklist />
      {blacklist?.map((entry, idx) => {
        const { account_name, discord_id, blacklisted_on, reason } = entry;

        return (
          <div key={`blEntry-${discord_id}-${account_name}-${reason}-${idx}`}>
            {account_name} ({discord_id}) - {reason}
            <LocalizedDate date={blacklisted_on} />
          </div>
        );
      })}
    </div>
  );
};

export default BlacklistFetcher;
