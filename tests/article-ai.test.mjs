import { test } from "node:test";
import assert from "node:assert/strict";
import { createServer } from "node:http";
import {
  parseInput,
  parseDraft,
  uniqueSlug,
  callArticleAI,
} from "../app/admin/_lib/article-ai.ts";
const draft = {
  title_vi: "Chăm sóc da",
  title_en: "Skin care",
  slug_vi: "cham-soc-da",
  slug_en: "skin-care",
  excerpt_vi: "Mô tả",
  excerpt_en: "Description",
  content_vi: "Trả lời.\n\n## Chăm sóc\nNội dung.",
  content_en: "Answer.\n\n## Care\nContent.",
};
test("input rejects invalid payloads and bounds editorial notes", () => {
  for (const x of [
    null,
    {},
    { topic: "ok" },
    { topic: "Test topic", length: "huge" },
    { topic: "Test topic", length: "short", notes: "x".repeat(6001) },
  ])
    assert.throws(() => parseInput(x));
});
test("draft normalization requires bilingual fields and rejects HTML", () => {
  assert.equal(parseDraft(JSON.stringify(draft)).reading_time_en, "1 min read");
  assert.throws(() =>
    parseDraft(
      JSON.stringify({ ...draft, content_en: "<script>alert(1)</script>" }),
    ),
  );
  assert.throws(() => parseDraft(JSON.stringify({ ...draft, title_vi: null })));
  assert.throws(() =>
    parseDraft(JSON.stringify({ ...draft, content_en: "no headings" })),
  );
  assert.equal(
    uniqueSlug("Đẹp dịu dàng", ["dep-diu-dang", "dep-diu-dang-2"]),
    "dep-diu-dang-3",
  );
});
test("provider contract handles exact model, truncated output and upstream auth errors without exposing secrets", async () => {
  let mode = "ok";
  const original = { ...process.env };
  const server = createServer(async (req, res) => {
    let body = "";
    for await (const part of req) body += part;
    const payload = JSON.parse(body);
    assert.equal(req.url, "/v1/chat/completions");
    assert.equal(req.headers.authorization, "Bearer test-private-key");
    assert.equal(payload.model, "ag/gemini-3.7-flash-medium");
    res.setHeader("Content-Type", "application/json");
    if (mode === "auth") {
      res.statusCode = 401;
      res.end(JSON.stringify({ error: "test-private-key" }));
      return;
    }
    res.end(
      JSON.stringify({
        choices: [
          {
            finish_reason: mode === "truncated" ? "length" : "stop",
            message: { content: JSON.stringify(draft) },
          },
        ],
      }),
    );
  });
  await new Promise((resolve) => server.listen(0, "127.0.0.1", resolve));
  process.env.ARTICLE_AI_BASE_URL =
    "http://127.0.0.1:" + server.address().port + "/v1";
  process.env.ARTICLE_AI_API_KEY = "test-private-key";
  process.env.ARTICLE_AI_MODEL = "ag/gemini-3.7-flash-medium";
  delete process.env.VERCEL;
  try {
    const input = parseInput({ topic: "Test article", length: "short" });
    assert.equal((await callArticleAI(input, {})).title_en, "Skin care");
    mode = "truncated";
    await assert.rejects(callArticleAI(input, {}), /cắt ngắn/);
    mode = "auth";
    await assert.rejects(
      callArticleAI(input, {}),
      (e) =>
        !e.message.includes("test-private-key") &&
        e.message.includes("khóa API"),
    );
    process.env.VERCEL = "1";
    await assert.rejects(callArticleAI(input, {}), /localhost/);
  } finally {
    for (const key of [
      "ARTICLE_AI_BASE_URL",
      "ARTICLE_AI_API_KEY",
      "ARTICLE_AI_MODEL",
      "VERCEL",
    ]) {
      if (original[key] === undefined) delete process.env[key];
      else process.env[key] = original[key];
    }
    await new Promise((resolve) => server.close(resolve));
  }
});
