import React from "react";
import { useTranslations } from "next-intl";
import { DataAge } from "@/components/ui/data-age";
import { LocalizedDate } from "./LocalizedDate";

interface Props {
  dataUpdatedAt: Date;
}

export const BlacklistedOn = ({ dataUpdatedAt }: Props) => {
  const t = useTranslations("DataAge");

  return (
    <DataAge
      tooltipContent={
        <div className="flex flex-col items-center justify-center">
          <p className="text-primary">{t("blacklisted_on")}</p>
          <LocalizedDate date={dataUpdatedAt} />
        </div>
      }
    />
  );
};

export const UpdatedAt = ({ dataUpdatedAt }: Props) => {
  const t = useTranslations("DataAge");

  return (
    <DataAge
      tooltipContent={
        <div className="flex flex-col items-center justify-center">
          <p className="text-primary">{t("updated_at")}</p>
          <LocalizedDate date={dataUpdatedAt} />
        </div>
      }
    />
  );
};
