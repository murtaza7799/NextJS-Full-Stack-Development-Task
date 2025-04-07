import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */

  reactStrictMode: true,

  env: {
    API_URL: process.env.API_URL,
    AES_KEY: process.env. AES_KEY,


  },
};

export default nextConfig;
