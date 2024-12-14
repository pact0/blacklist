"use client";

import React from "react";
import { useQueryClient } from "@tanstack/react-query";
import { useTranslations } from "next-intl";

export const RefreshBlacklist = () => {
  const t = useTranslations("BlacklistPage");
  const queryClient = useQueryClient();

  return (
    <button
      onClick={() => {
        queryClient.invalidateQueries({
          queryKey: ["blacklist"],
          exact: true,
        });
      }}
    >
      {t("refresh_blacklist")}
    </button>
  );
};
