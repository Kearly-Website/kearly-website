import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  skipTrailingSlashRedirect: true,
  outputFileTracingIncludes: {
    "/**": ["./wedding/**/*"],
  },
};

export default nextConfig;
