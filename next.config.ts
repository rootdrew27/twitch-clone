import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // webpack: https://github.com/replicate/replicate-javascript/issues/225#issuecomment-2065499818
  webpack: (config) => {
    config.externals.push({
      'node:crypto': 'commonjs crypto',
    });
    return config;
  },
};

export default nextConfig;
