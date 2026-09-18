import { createRequire } from "node:module";
import { spawn } from "node:child_process";
import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";
const require = createRequire(import.meta.url);
const { chromium } = require(process.env.PLAYWRIGHT_MODULE || "playwright");
const cli =
  process.env.LIGHTHOUSE_CLI || require.resolve("lighthouse/cli/index.js");
const output = path.resolve("../audit-2026-09-13/implementation");
const rows = [];
// Let Playwright own Chrome. Lighthouse's Windows temporary-profile cleanup
// can otherwise throw EPERM after it has already written a valid report.
for (const [name, route, desktop] of [
  ["home-mobile", "/", false],
  ["home-desktop", "/", true],
  ["service-mobile", "/en/services/facial-treatment-da-nang", false],
]) {
  for (let run = 1; run <= 3; run++) {
    const browser = await chromium.launch({
      executablePath:
        process.env.CHROME_PATH ||
        "C:/Program Files/Google/Chrome/Application/chrome.exe",
      headless: true,
      args: ["--remote-debugging-port=9225"],
    });
    const file = path.join(output, "lighthouse-" + name + "-" + run + ".json");
    try {
      await new Promise((resolve, reject) => {
        const child = spawn(
          process.execPath,
          [
            cli,
            "http://127.0.0.1:3040" + route,
            "--port=9225",
            "--quiet",
            "--output=json",
            "--output-path=" + file,
            ...(desktop ? ["--preset=desktop"] : []),
          ],
          { windowsHide: true, stdio: ["ignore", "inherit", "inherit"] },
        );
        child.on("error", reject);
        child.on("exit", (code) =>
          code === 0 ? resolve() : reject(new Error("Lighthouse exit " + code)),
        );
      });
      const r = JSON.parse(await readFile(file, "utf8"));
      if (r.runtimeError) throw new Error(JSON.stringify(r.runtimeError));
      const network = r.audits["network-requests"].details.items;
      rows.push({
        name,
        run,
        version: r.lighthouseVersion,
        score: r.categories.performance.score * 100,
        accessibility: r.categories.accessibility.score * 100,
        seo: r.categories.seo.score * 100,
        fcpMs: r.audits["first-contentful-paint"].numericValue,
        lcpMs: r.audits["largest-contentful-paint"].numericValue,
        cls: r.audits["cumulative-layout-shift"].numericValue,
        tbtMs: r.audits["total-blocking-time"].numericValue,
        bytes: r.audits["total-byte-weight"].numericValue,
        requests: network.length,
        videos: network
          .filter((item) => item.url.includes(".mp4"))
          .map((item) => ({
            url: item.url,
            transferSize: item.transferSize,
            resourceSize: item.resourceSize,
          })),
        warnings: r.runWarnings,
      });
      console.log(name + " run " + run + ": " + rows.at(-1).score);
    } finally {
      await browser.close();
    }
  }
}
const median = (values) =>
  [...values].sort((a, b) => a - b)[Math.floor(values.length / 2)];
const summary = [...new Set(rows.map((row) => row.name))].map((name) => {
  const runs = rows.filter((row) => row.name === name);
  return {
    name,
    runs: runs.length,
    ...Object.fromEntries(
      [
        "score",
        "accessibility",
        "seo",
        "fcpMs",
        "lcpMs",
        "cls",
        "tbtMs",
        "bytes",
        "requests",
      ].map((key) => [key, median(runs.map((row) => row[key]))]),
    ),
  };
});
await writeFile(
  path.join(output, "performance-after.json"),
  JSON.stringify(
    {
      environment:
        "localhost production build, simulated throttling, not field CWV",
      rows,
      summary,
    },
    null,
    2,
  ),
);
console.log(JSON.stringify(summary, null, 2));
