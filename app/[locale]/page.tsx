"use client";

import { useTranslations } from "next-intl";
import BlacklistPage from "./BlacklistPage";

const ClientPage = () => {
  const t = useTranslations("HomePage");
  return (
    <div>
      <h1>{t("title")}</h1>
      <BlacklistPage />
    </div>
  );
};

export default ClientPage;
