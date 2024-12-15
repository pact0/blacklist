"use client";

import DiscordLogo from "@public/icons/discord_logo.png";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useTranslations } from "next-intl";
import React, { useState } from "react";
import Image from "next/image";
import { useToast } from "@/hooks/use-toast";

interface Props {
  discord_id: number | undefined | null;
}

export const DiscordId = ({ discord_id }: Props) => {
  const { toast } = useToast();
  const t = useTranslations("BlacklistPage");
  const toastT = useTranslations("Toast");
  const [isOpen, setIsOpen] = useState(false);

  const toggleTooltip = async () => {
    setIsOpen(true);

    if (!discord_id) return;
    await navigator.clipboard.writeText(String(discord_id));
    toast({
      title: toastT("success"),
      description: toastT("copied_to_clipboard"),
    });
  };

  return (
    <TooltipProvider>
      <Tooltip open={isOpen} onOpenChange={setIsOpen}>
        <TooltipTrigger asChild>
          <Button onClick={toggleTooltip} variant={"ghost"} size={"icon"}>
            <Image
              src={DiscordLogo}
              alt="Discord Logo"
              width={20}
              height={20}
            />
          </Button>
        </TooltipTrigger>
        <TooltipContent className="z-50">
          {discord_id
            ? t("user_discord_id", { discordId: discord_id })
            : t("user_discord_id_unknown")}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};
