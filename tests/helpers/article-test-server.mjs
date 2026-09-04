// Isolated fake auth, database and provider. Never points at production services.
import { createServer } from "node:http";
import { spawn } from "node:child_process";
export const fixture = {
  title_vi: "Chăm sóc da thử nghiệm",
  title_en: "Test skin care guide",
  slug_vi: "cham-soc-da-thu-nghiem",
  slug_en: "test-skin-care-guide",
  excerpt_vi: "Hướng dẫn thử nghiệm phục vụ kiểm tra chức năng.",
  excerpt_en: "A fixture for testing the editorial workflow.",
  content_vi:
    "Câu trả lời trực tiếp.\n\n## Chăm sóc da\n- Làm sạch nhẹ\n- Dưỡng ẩm\n\n## Câu hỏi thường gặp\n### Khi nào cần tư vấn?\nKhi da khó chịu.",
  content_en:
    "A direct answer.\n\n## Skin care\n- Cleanse gently\n- Moisturise\n\n## FAQ\n### When to seek advice?\nWhen skin feels uncomfortable.",
};
export async function startTestServer(port = 3041) {
  const rows = [];
  let providerCalls = 0;
  const server = createServer(async (req, res) => {
    let raw = "";
    for await (const part of req) raw += part;
    const body = raw ? JSON.parse(raw) : {};
    const url = new URL(req.url, "http://localhost");
    const path = url.pathname;
    function send(data, status = 200) {
      res.writeHead(status, { "Content-Type": "application/json" });
      res.end(JSON.stringify(data));
    }
    if (path === "/auth/v1/token") {
      if (
        body.email !== "editor@example.test" ||
        body.password !== "fixture-password"
      )
        return send({}, 401);
      return send({
        access_token: "fixture-session",
        expires_in: 3600,
        user: { id: "fixture-admin", email: body.email },
      });
    }
    if (path === "/auth/v1/user")
      return send(
        { id: "fixture-admin", email: "editor@example.test" },
        req.headers.authorization === "Bearer fixture-session" ? 200 : 401,
      );
    if (path === "/rest/v1/admin_users")
      return send([
        { user_id: "fixture-admin", display_name: "Hato • Kiểm thử" },
      ]);
    if (path === "/v1/chat/completions") {
      providerCalls++;
      if (req.headers.authorization !== "Bearer fixture-api-key")
        return send({}, 401);
      return send({
        choices: [
          {
            finish_reason: "stop",
            message: { content: JSON.stringify(fixture) },
          },
        ],
      });
    }
    if (path === "/rest/v1/journal_articles") {
      if (req.method === "POST") {
        const row = {
          ...body,
          id: rows.length + 1,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        };
        rows.push(row);
        return send([row], 201);
      }
      if (req.method === "PATCH") {
        const row = rows.find(
          (x) => "eq." + x.id === url.searchParams.get("id"),
        );
        if (row) Object.assign(row, body);
        return send(row ? [row] : []);
      }
      let results = rows;
      if (url.searchParams.get("is_published") === "eq.true")
        results = results.filter((x) => x.is_published);
      return send(results);
    }
    if (path.startsWith("/rest/v1/")) return send([]);
    return send({}, 404);
  });
  await new Promise((resolve) => server.listen(0, "127.0.0.1", resolve));
  const base = "http://127.0.0.1:" + server.address().port;
  const child = spawn(
    process.execPath,
    [
      "node_modules/next/dist/bin/next",
      "start",
      "--hostname",
      "127.0.0.1",
      "--port",
      String(port),
    ],
    {
      windowsHide: true,
      env: {
        ...process.env,
        SUPABASE_URL: base,
        SUPABASE_PUBLISHABLE_KEY: "fixture-public",
        SUPABASE_SECRET_KEY: "fixture-secret",
        ARTICLE_AI_BASE_URL: base + "/v1",
        ARTICLE_AI_API_KEY: "fixture-api-key",
        ARTICLE_AI_MODEL: "ag/gemini-3.7-flash-medium",
      },
      stdio: ["ignore", "pipe", "pipe"],
    },
  );
  let log = "";
  child.stdout.on("data", (x) => (log += x));
  child.stderr.on("data", (x) => (log += x));
  const origin = "http://127.0.0.1:" + port;
  for (let i = 0; i < 100; i++) {
    try {
      if ((await fetch(origin + "/admin/login")).status === 200)
        return {
          origin,
          rows,
          get providerCalls() {
            return providerCalls;
          },
          stop: async () => {
            if (log.includes("Error")) console.error(log);
            child.kill();
            await new Promise((resolve) => server.close(resolve));
          },
        };
    } catch {}
    await new Promise((resolve) => setTimeout(resolve, 100));
  }
  child.kill();
  server.close();
  throw new Error("Test app did not start: " + log);
}
if (process.argv.includes("--browser")) {
  const app = await startTestServer();
  console.log("Isolated test admin: " + app.origin + "/admin/login");
  process.on("SIGINT", async () => {
    await app.stop();
    process.exit();
  });
}
