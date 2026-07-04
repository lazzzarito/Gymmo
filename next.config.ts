import type { NextConfig } from "next";
import withSerwistInit from "@serwist/next";

const withSerwist = withSerwistInit({
    swSrc: "sw.ts",
    swDest: "public/sw.js",
});

const nextConfig: NextConfig = {
    // serwist handles the service worker
};

export default withSerwist(nextConfig);
