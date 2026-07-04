// @ts-check
const { spawnSync } = require("node:child_process");
const { serwist } = require("@serwist/next/config");

const revision =
    spawnSync("git", ["rev-parse", "HEAD"], { encoding: "utf-8" }).stdout?.trim() ??
    crypto.randomUUID();

/** @type {import("@serwist/cli").InjectManifestOptions} */
const config = serwist({
    swSrc: "sw.ts",
    swDest: "public/sw.js",
    additionalPrecacheEntries: [{ url: "/~offline", revision }],
});

module.exports = config;
