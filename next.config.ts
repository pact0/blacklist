import { fileURLToPath } from "url";
import type { NextConfig } from "next";
import createJiti from "jiti";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin();

const { version } = createJiti(fileURLToPath(import.meta.url))(
  "./package.json",
);

const config: NextConfig = {
  output: "export",
  basePath: "/blacklist",

  publicRuntimeConfig: {
    version,
  },
};

export default withNextIntl(config);
