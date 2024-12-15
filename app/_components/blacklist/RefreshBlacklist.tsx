"use client";

import React from "react";
import { useQueryClient } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";

export const RefreshBlacklist = () => {
  const t = useTranslations("BlacklistPage");
  const queryClient = useQueryClient();

  return (
    <Button
      variant={"secondary"}
      onClick={() => {
        queryClient.invalidateQueries({
          queryKey: ["blacklist"],
          exact: true,
        });
      }}
    >
      {t("refresh_blacklist")}
    </Button>
  );
};
