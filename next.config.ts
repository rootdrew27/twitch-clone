import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  dev: {
    port: 3000,
    hostname: '0.0.0.0'
  },
  // allows access of AWS S3 Buckets
  images: {
        remotePatterns: [
          {
            protocol: "https",
            hostname: "twitch-clone-thumbnail-bucket.s3.us-east-2.amazonaws.com",
            pathname: "/**"
          }
        ]
  },
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
