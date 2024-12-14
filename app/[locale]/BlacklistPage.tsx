import React from "react";
import { useQuery } from "@tanstack/react-query";
import Papa from "papaparse";
import { RefreshBlacklist } from "./RefreshBlacklist";
import { format, isValid, parse } from "date-fns";
import { enUS, fr, es, pl } from "date-fns/locale";
// Updated interface to match enhanced parsing
interface BlacklistEntry {
  account_name: string;
  discord_id: number | null;
  blacklisted_on: Date;
  reason: string;
  active: boolean;
}

// Helper function to parse active field
const parseActiveField = (value: unknown): boolean => {
  if (value == null) return false;

  const normalizedValue = String(value).toLowerCase().trim();
  const positiveValues = ["y", "yes", "t", "true"];
  const negativeValues = ["n", "no", "f", "false"];

  if (positiveValues.includes(normalizedValue)) return true;
  if (negativeValues.includes(normalizedValue)) return false;

  return false; // default to false if unrecognized
};

// Helper function to parse date
const parseDate = (dateString: string): Date => {
  const cleanedDate = cleanText(dateString);

  const dateFormat = "dd/MM/yyyy";
  const parsedDate = parse(cleanedDate, dateFormat, new Date());

  return parsedDate;
};

// Helper function to clean text
const cleanText = (text: unknown): string => {
  if (text == null) return "";

  return String(text)
    .trim()
    .replace(/^"|"$/g, "") // Remove surrounding quotes
    .replace(/\s+/g, " ") // Normalize whitespace
    .trim();
};

// Helper function to parse discord ID
const parseDiscordId = (id: unknown): number | null => {
  if (id == null || id === "") return null;

  const cleanedId = cleanText(id);
  const parsedId = parseInt(cleanedId, 10);

  return isNaN(parsedId) ? null : parsedId;
};

// Fetch function for React Query
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
    error,
  } = useQuery<BlacklistEntry[]>({
    queryKey: ["blacklist"],
    queryFn: fetchBlacklistData,
    staleTime: 1000 * 60 * 5, // 1 hour
    refetchInterval: 1000 * 60 * 5, // 24 hours
  });

  if (isLoading) return <div>Loading blacklist...</div>;
  if (isError)
    return (
      <div>
        Error: {error instanceof Error ? error.message : "Unknown error"}
      </div>
    );

  return (
    <div>
      <h2>Blacklisted Entries</h2>
      <RefreshBlacklist />
      {blacklist?.map((entry) => {
        const { account_name, discord_id, blacklisted_on, reason, active } =
          entry;

        const formattedDate = isValid(blacklisted_on)
          ? format(blacklisted_on, "PPPP", { locale: pl })
          : "Unknown";

        console.log(blacklisted_on, formattedDate);
        return (
          <div
          // key={`blEntry-${discord_id}-${account_name}-${reason}-${blacklisted_on.toISOString()}`}
          >
            {account_name} ({discord_id}) - {reason} - {formattedDate}
          </div>
        );
      })}
    </div>
  );
};

export default BlacklistFetcher;
