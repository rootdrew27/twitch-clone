import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // webpack: https://github.com/replicate/replicate-javascript/issues/225#issuecomment-2065499818
  webpack: (config) => {
    // solves issue with livekit using crypto package
    config.externals.push({
      'node:crypto': 'commonjs crypto',
    });
    // solves node issue caused by using livekit
    config.module.rules.push({
      test: /\.mjs$/,
      include: /node_modules/,
      type: "javascript/auto"
    });
    return config;
  },
};

export default nextConfig;
