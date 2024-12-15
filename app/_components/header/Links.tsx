import React from "react";
import TFTLogo from "@public/icons/TFT.png";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { AppealLinkLong } from "../blacklist/AppealLink";
import { ReportLinkLong } from "../blacklist/ReportLink";

export const Links = () => {
  return (
    <div className="flex items-center justify-center gap-x-1">
      <JoinDiscord />
      <AppealLinkLong />
      <ReportLinkLong />
    </div>
  );
};

const JoinDiscord = () => {
  const t = useTranslations("Links");

  return (
    <a
      href="https://discord.poe-hub.com"
      target="_blank"
      className="flex items-center justify-center cursor-pointer hover:underline gap-x-1"
    >
      <Image src={TFTLogo} alt="TFT Logo" width={36} height={36} />
      <span>{t("join_discord")}</span>
    </a>
  );
};
