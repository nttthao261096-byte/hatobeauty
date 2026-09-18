import { createServer } from "node:http";
import { spawn } from "node:child_process";

// Local-only PostgREST test double. Never use live credentials or real guests.
export async function startLeadTestServer(port = 3043, articles = []) {
  const saved = [];
  const control = { fail: false, delay: 0 };
  const database = createServer(async (req, res) => {
    const url = new URL(req.url, "http://127.0.0.1");
    const send = (data, status = 200) => {
      res.writeHead(status, { "Content-Type": "application/json" });
      res.end(JSON.stringify(data));
    };
    if (control.delay)
      await new Promise((resolve) => setTimeout(resolve, control.delay));
    if (control.fail) return send({ message: "Isolated test failure" }, 500);
    if (url.pathname === "/rest/v1/services") {
      const id = url.searchParams.get("slug")?.replace(/^eq\./, "");
      return send(
        [
          "skin",
          "scalp",
          "body",
          "brow-lash",
          "hair-removal",
          "waxing",
        ].includes(id)
          ? [{ slug: id }]
          : [],
      );
    }
    if (url.pathname === "/rest/v1/journal_articles") return send(articles);
    if (
      ["/rest/v1/contact_requests", "/rest/v1/booking_requests"].includes(
        url.pathname,
      ) &&
      req.method === "POST"
    ) {
      let body = "";
      for await (const part of req) body += part;
      saved.push({
        table: url.pathname.split("/").at(-1),
        ...JSON.parse(body),
      });
      return send({}, 201);
    }
    send([]);
  });
  await new Promise((resolve) => database.listen(0, "127.0.0.1", resolve));
  const db = `http://127.0.0.1:${database.address().port}`;
  let log = "";
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
        SUPABASE_URL: db,
        SUPABASE_SECRET_KEY: "fixture-only",
        SUPABASE_PUBLISHABLE_KEY: "fixture-only",
      },
      stdio: ["ignore", "pipe", "pipe"],
    },
  );
  child.stdout.on("data", (data) => {
    log += data;
  });
  child.stderr.on("data", (data) => {
    log += data;
  });
  const origin = `http://127.0.0.1:${port}`;
  const stop = async () => {
    child.kill();
    database.closeAllConnections();
    await new Promise((resolve) => database.close(resolve));
  };
  for (let attempt = 0; attempt < 100; attempt++) {
    try {
      if ((await fetch(origin)).status === 200)
        return {
          origin,
          saved,
          control,
          stop,
          get log() {
            return log;
          },
        };
    } catch {
      /* Server not listening yet. */
    }
    await new Promise((resolve) => setTimeout(resolve, 100));
  }
  await stop();
  throw new Error("QA server did not start: " + log);
}
