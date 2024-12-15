import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin();

const config: NextConfig = {
  output: "export",
  // assetPrefix: "/",
  // basePath: "/blacklist",

  images: { unoptimized: true },
};

export default withNextIntl(config);