import { spawn } from "node:child_process";
import { createReadStream } from "node:fs";
import { stat } from "node:fs/promises";
import { createServer, request as proxyRequest } from "node:http";
import net from "node:net";
import path from "node:path";

const args = process.argv.slice(2);

function optionValue(names, fallback) {
  for (let index = 0; index < args.length; index += 1) {
    const value = args[index];
    if (names.includes(value) && args[index + 1]) return args[index + 1];
    const matched = names.find((name) => value.startsWith(`${name}=`));
    if (matched) return value.slice(matched.length + 1);
  }
  return fallback;
}

const port = Number(optionValue(["--port", "-p"], process.env.PORT ?? "3000"));
const hostname = optionValue(["--hostname", "--host", "-H"], "0.0.0.0");
const internalPort = port + 1;
const projectRoot = process.cwd();
const clientDir = path.resolve(projectRoot, "dist", "client");
const vinextCli = path.resolve(projectRoot, "node_modules", "vinext", "dist", "cli.js");

if (!Number.isInteger(port) || port < 1 || port > 65534) {
  throw new Error(`Invalid port: ${port}`);
}

const contentTypes = {
  ".avif": "image/avif",
  ".css": "text/css; charset=utf-8",
  ".gif": "image/gif",
  ".html": "text/html; charset=utf-8",
  ".ico": "image/x-icon",
  ".jpeg": "image/jpeg",
  ".jpg": "image/jpeg",
  ".js": "application/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".mp4": "video/mp4",
  ".png": "image/png",
  ".svg": "image/svg+xml",
  ".webp": "image/webp",
  ".woff": "font/woff",
  ".woff2": "font/woff2",
};

async function staticFileFor(requestUrl) {
  const pathname = new URL(requestUrl ?? "/", "http://localhost").pathname;
  let decoded;
  try {
    decoded = decodeURIComponent(pathname);
  } catch {
    return null;
  }

  const candidate = path.resolve(clientDir, decoded.replace(/^\/+/, ""));
  const clientPrefix = `${clientDir}${path.sep}`;
  if (candidate !== clientDir && !candidate.startsWith(clientPrefix)) return null;

  try {
    const details = await stat(candidate);
    return details.isFile() ? { candidate, details } : null;
  } catch {
    return null;
  }
}

function waitForPort(targetPort, attempts = 100) {
  return new Promise((resolve, reject) => {
    const connect = (remaining) => {
      const socket = net.createConnection({ host: "127.0.0.1", port: targetPort });
      socket.once("connect", () => {
        socket.end();
        resolve();
      });
      socket.once("error", () => {
        socket.destroy();
        if (remaining <= 1) reject(new Error("Vinext server did not become ready"));
        else setTimeout(() => connect(remaining - 1), 50);
      });
    };
    connect(attempts);
  });
}

const vinext = spawn(process.execPath, [vinextCli, "start", "-p", String(internalPort), "-H", "127.0.0.1"], {
  cwd: projectRoot,
  env: process.env,
  stdio: "inherit",
});

vinext.once("exit", (code) => {
  if (code && code !== 0) process.exitCode = code;
});

await waitForPort(internalPort);

const server = createServer(async (request, response) => {
  const staticFile = await staticFileFor(request.url);
  if (staticFile) {
    const extension = path.extname(staticFile.candidate).toLowerCase();
    response.writeHead(200, {
      "Cache-Control": request.url?.startsWith("/assets/")
        ? "public, max-age=31536000, immutable"
        : "public, max-age=3600",
      "Content-Length": String(staticFile.details.size),
      "Content-Type": contentTypes[extension] ?? "application/octet-stream",
    });
    if (request.method === "HEAD") response.end();
    else createReadStream(staticFile.candidate).pipe(response);
    return;
  }

  const upstream = proxyRequest({
    headers: request.headers,
    host: "127.0.0.1",
    method: request.method,
    path: request.url,
    port: internalPort,
  }, (upstreamResponse) => {
    response.writeHead(upstreamResponse.statusCode ?? 502, upstreamResponse.headers);
    upstreamResponse.pipe(response);
  });

  upstream.once("error", (error) => {
    if (!response.headersSent) response.writeHead(502, { "Content-Type": "text/plain; charset=utf-8" });
    response.end(`Local production proxy error: ${error.message}`);
  });
  request.pipe(upstream);
});

server.listen(port, hostname, () => {
  console.log(`[hato] Local production server running at http://${hostname}:${port}`);
});

function shutdown() {
  server.close(() => vinext.kill());
  setTimeout(() => vinext.kill(), 1000).unref();
}

process.once("SIGINT", shutdown);
process.once("SIGTERM", shutdown);
