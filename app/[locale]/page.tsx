"use client";

import { useTranslations } from "next-intl";

const ClientPage = () => {
  const t = useTranslations("HomePage");
  return <div>{t("title")}</div>;
};

export default ClientPage;
