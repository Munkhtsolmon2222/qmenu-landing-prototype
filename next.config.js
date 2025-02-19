// import type { NextConfig } from "next";

// const nextConfig: NextConfig = {
//   /* config options here */
// };yna

// export default nextConfig;

/** @type {import('next').NextConfig} */
const path = require("path");
const basenameProd = "https://qmenu.mn/";

module.exports = {
  images: {
    domains: ['images.qrms.mn','s3.ap-east-1.amazonaws.com'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 's3.amazonaws.com',
        port: '',
        pathname: '/my-bucket/**',
        search: '',
      },
    ],
  },
  reactStrictMode: true,
  // basePath: process.env.NODE_ENV === "production" ? basenameProd : "",
  webpack(config) {
    config.resolve.alias = {
      ...config.resolve.alias,
      process: "process/browser",
      "@vis.gl/react-google-maps/examples.js":
        "https://visgl.github.io/react-google-maps/scripts/examples.js",
      "@": path.resolve(__dirname, "./src"),
      "@public": path.resolve(__dirname, "./public"),
    };
    return config;
  },
  env: {
    BASE_URL: process.env.NODE_ENV === "production" ? basenameProd : "http://localhost:5173/",
    APP_REGION: process.env.APP_REGION,
    NEXT_PUBLIC_APP_STAGE: process.env.NEXT_PUBLIC_APP_STAGE,
    GOOGLE_MAPS_API: process.env.GOOGLE_MAPS_API,
    GOOGLE_URL: process.env.GOOGLE_URL,
    GOOGLE_TRANSLATE_KEY: process.env.GOOGLE_TRANSLATE_KEY
  },
};
