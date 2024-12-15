import React from "react";
import Image from "next/image";
import TFTLogo from "@public/icons/TFT.png";

export const Spinner = () => {
  return (
    <div className="relative">
      <div className="absolute inset-0 animate-pulse rounded-full bg-gradient-to-br from-primary to-secondary opacity-80 blur-xl" />
      <div className="animate-spin">
        <Image
          src={TFTLogo}
          alt="logo"
          className="h-20 w-20 text-primary-foreground"
          priority
        />
      </div>
    </div>
  );
};
