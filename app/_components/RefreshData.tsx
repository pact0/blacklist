"use client";
import React from "react";
import { RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface Props {
  refetch: () => void;
  isLoading: boolean;
}

export const RefreshData = ({ refetch, isLoading }: Props) => {
  return (
    <Button onClick={() => refetch()} size="icon" variant={"ghost"}>
      <RefreshCw className={cn("h-4 w-4", isLoading && "animate-spin")} />
    </Button>
  );
};
