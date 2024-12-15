import type { BlacklistEntry as BlacklistEntryType } from "@/app/_models/BlacklistEntry";
import React from "react";
import { BlacklistedOn } from "../DataAge";
import { PoeAccountLink } from "./PoeAccountLink";
import { DiscordId } from "./DiscordId";
import { BanReason } from "./BanReason";
import { useTranslations } from "next-intl";
import { ReportLink } from "./ReportLink";

interface Props {
  entry: BlacklistEntryType;
}

export const BlacklistEntry = ({ entry }: Props) => {
  const { account_name, discord_id, reason, blacklisted_on } = entry;
  const t = useTranslations("BlacklistPage");
  return (
    <div className="flex items-center justify-center ">
      <div className="w-36 grid grid-cols-[1fr,1fr,1fr,2fr]">
        <BlacklistedOn dataUpdatedAt={blacklisted_on} />
        <DiscordId discord_id={discord_id} />
        <BanReason reason={reason} />
        <PoeAccountLink accountName={account_name} />
      </div>
    </div>
  );
};

export const BlacklistEntryNotFound = () => {
  const t = useTranslations("BlacklistPage");
  return (
    <div className="flex flex-col items-center justify-center">
      <div>{t("user_not_found")}</div>
      <div>{t("if_you_think_should_be_blacklisted")}</div>
      <ReportLink />
    </div>
  );
};
