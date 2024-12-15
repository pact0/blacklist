import { isValid } from "date-fns";
import { useTranslations, useFormatter } from "next-intl";

import React from "react";

interface Props {
  date: Date;
}

export const LocalizedDate = ({ date }: Props) => {
  const t = useTranslations("Date");
  const format = useFormatter();

  const isValidDate = isValid(date);

  if (!isValidDate) return <span>{t("unknown")}</span>;

  return (
    <span>
      {format.dateTime(date, {
        year: "numeric",
        month: "long",
        day: "numeric",
      })}
    </span>
  );
};
