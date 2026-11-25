import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins: [
    "ais-dev-kt5evsqfmxrtq2ef7cssr7-551747526550.europe-west2.run.app",
    "127.0.0.1",
    "localhost",
  ],
  skipTrailingSlashRedirect: true,
  outputFileTracingIncludes: {
    "/**": ["./wedding/**/*"],
  },
};

export default nextConfig;
