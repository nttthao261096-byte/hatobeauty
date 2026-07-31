import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

async function render() {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);

  return worker.fetch(
    new Request("http://localhost/", { headers: { accept: "text/html" } }),
    { ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) } },
    { waitUntil() {}, passThroughOnException() {} },
  );
}

test("server-renders the finished hato Beauty experience", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

  const html = await response.text();
  assert.match(html, /<html lang="en">/i);
  assert.match(html, /<title>hato Beauty \| Beauty, made personal<\/title>/i);
  assert.match(html, /aria-label="hato Beauty"/i);
  assert.match(html, />EN<\/button><span>\/<\/span><button[^>]*>VI<\/button>/i);
  assert.match(html, /aria-roledescription="carousel"/i);
  assert.match(html, /Ways to connect with Hato/i);
  assert.match(html, /Book a consultation/i);
  assert.doesNotMatch(html, /codex-preview|Building your site|react-loading-skeleton/i);
});

test("ships accessible slide controls and bilingual content", async () => {
  const response = await render();
  const html = await response.text();
  const source = await readFile(new URL("../app/HatoHome.tsx", import.meta.url), "utf8");

  assert.match(html, /aria-label="Hero slides"/i);
  assert.match(html, /aria-label="Previous service"/i);
  assert.match(html, /aria-label="Next service"/i);
  assert.match(html, /<span class="hato-word">hato<\/span>/i);
  assert.match(source, /Khoảnh khắc của bạn bắt đầu từ đây/i);
  assert.match(source, /aria-modal="true"/i);
});
