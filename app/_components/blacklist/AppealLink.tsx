import { Button } from "@/components/ui/button";
import { Hammer } from "lucide-react";
import { useTranslations } from "next-intl";
import React from "react";

export const AppealLink = () => {
  const t = useTranslations("BlacklistPage");
  return (
    <Button variant={"secondary"} asChild>
      <a href="https://banappeal.tftrove.com" target="_blank" rel="noreferrer">
        {t("appeal")}
      </a>
    </Button>
  );
};

export const AppealLinkLong = () => {
  const t = useTranslations("BlacklistPage");
  return (
    <Button variant={"link"} asChild>
      <a href="https://banappeal.tftrove.com" target="_blank" rel="noreferrer">
        <Hammer className="h-4 w-4" />
        {t("ban_appeal")}
      </a>
    </Button>
  );
};
