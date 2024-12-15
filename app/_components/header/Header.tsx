import React from "react";
import TFTLogo from "@public/icons/TFT.png";
import Image from "next/image";
import ThemeSelector from "../ThemeSelector";
import LocaleSwitcher from "../locale/LocaleSwitcher";
import { Links } from "./Links";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 flex h-16 items-center justify-between border-b bg-background/80 px-4 backdrop-blur-md md:px-6">
      <div className="container flex max-w-[2190px] items-center justify-between">
        <div className="flex items-center justify-center gap-x-2">
          <Image src={TFTLogo} alt="TFT Logo" width={64} height={64} />
          <span>TFT Blacklist Viewer</span>
        </div>

        <Links />

        <div>
          <LocaleSwitcher />
          <ThemeSelector />
        </div>
      </div>
    </header>
  );
}
