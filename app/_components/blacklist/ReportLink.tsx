import { Button } from "@/components/ui/button";
import { MessageCircleWarning } from "lucide-react";
import { useTranslations } from "next-intl";
import React from "react";

const LINK =
  "https://discord.com/channels/645607528297922560/670516162576121877";

export const ReportLink = () => {
  const t = useTranslations("BlacklistPage");
  return (
    <Button variant={"secondary"} asChild>
      <a href={LINK} target="_blank" rel="noreferrer">
        {t("report")}
      </a>
    </Button>
  );
};

export const ReportLinkLong = () => {
  const t = useTranslations("BlacklistPage");
  return (
    <Button variant={"link"} asChild className="">
      <a href={LINK} target="_blank" rel="noreferrer">
        <MessageCircleWarning className="text-red-600 hover:text-red-400 h-4 w-4" />
        {t("report")}
      </a>
    </Button>
  );
};
