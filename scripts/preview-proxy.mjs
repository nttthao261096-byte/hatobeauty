import { createReadStream, existsSync, statSync } from "node:fs";
import { createServer, request as httpRequest } from "node:http";
import { extname, join, resolve, sep } from "node:path";

const clientRoot = resolve("dist/client");
const mimeTypes = {
  ".css": "text/css; charset=utf-8",
  ".gif": "image/gif",
  ".ico": "image/x-icon",
  ".jpeg": "image/jpeg",
  ".jpg": "image/jpeg",
  ".js": "text/javascript; charset=utf-8",
  ".mp4": "video/mp4",
  ".png": "image/png",
  ".svg": "image/svg+xml",
  ".webp": "image/webp",
  ".woff": "font/woff",
  ".woff2": "font/woff2",
};

function serveFile(req, res, filePath) {
  const size = statSync(filePath).size;
  const type = mimeTypes[extname(filePath).toLowerCase()] ?? "application/octet-stream";
  const range = req.headers.range?.match(/bytes=(\d*)-(\d*)/);

  if (range) {
    const start = range[1] ? Number(range[1]) : 0;
    const end = range[2] ? Math.min(Number(range[2]), size - 1) : size - 1;
    res.writeHead(206, {
      "Accept-Ranges": "bytes",
      "Content-Length": end - start + 1,
      "Content-Range": `bytes ${start}-${end}/${size}`,
      "Content-Type": type,
    });
    createReadStream(filePath, { start, end }).pipe(res);
    return;
  }

  res.writeHead(200, { "Accept-Ranges": "bytes", "Content-Length": size, "Content-Type": type });
  createReadStream(filePath).pipe(res);
}

createServer((req, res) => {
  const requestUrl = new URL(req.url ?? "/", "http://preview.local");
  const pathname = decodeURIComponent(requestUrl.pathname);
  if (pathname === "/_vinext/image") {
    const sourcePath = requestUrl.searchParams.get("url");
    const imageCandidate = sourcePath ? resolve(join(clientRoot, sourcePath.replace(/^\/+/, ""))) : "";
    if (imageCandidate.startsWith(`${clientRoot}${sep}`) && existsSync(imageCandidate) && statSync(imageCandidate).isFile()) {
      serveFile(req, res, imageCandidate);
      return;
    }
  }
  const candidate = resolve(join(clientRoot, pathname.replace(/^\/+/, "")));
  if (candidate.startsWith(`${clientRoot}${sep}`) && existsSync(candidate) && statSync(candidate).isFile()) {
    serveFile(req, res, candidate);
    return;
  }

  const upstream = httpRequest({ hostname: "127.0.0.1", port: 3000, path: req.url, method: req.method, headers: req.headers }, (upstreamResponse) => {
    res.writeHead(upstreamResponse.statusCode ?? 502, upstreamResponse.headers);
    upstreamResponse.pipe(res);
  });
  upstream.on("error", () => { res.writeHead(502); res.end("Preview server unavailable"); });
  req.pipe(upstream);
}).listen(3002, "0.0.0.0");
