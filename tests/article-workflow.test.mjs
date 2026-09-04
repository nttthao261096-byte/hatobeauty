import { test } from "node:test";
import assert from "node:assert/strict";
import { startTestServer, fixture } from "./helpers/article-test-server.mjs";
test("authenticated generation, draft isolation, publishing, metadata, sitemap and unpublishing", async () => {
  const app = await startTestServer(3042);
  const origin = app.origin;
  let cookie = "";
  const request = (path, body, headers = {}) =>
    fetch(origin + path, {
      method: "POST",
      headers: {
        origin,
        "Content-Type": "application/json",
        cookie,
        ...headers,
      },
      body: JSON.stringify(body),
    });
  try {
    const input = { topic: "Chăm sóc da tại spa", length: "short" };
    assert.equal(
      (await request("/api/admin/articles/generate", input)).status,
      401,
    );
    assert.equal(
      (
        await request("/api/admin/articles/generate", input, {
          origin: "https://attacker.invalid",
        })
      ).status,
      403,
    );
    assert.equal(app.providerCalls, 0);
    const login = await request("/api/admin/auth/login", {
      email: "editor@example.test",
      password: "fixture-password",
    });
    assert.equal(login.status, 200);
    cookie = login.headers.get("set-cookie").split(";")[0];
    assert.equal(
      (await request("/api/admin/articles/generate", { topic: "x" })).status,
      400,
    );
    assert.equal(app.providerCalls, 0);
    const generated = await request("/api/admin/articles/generate", input);
    assert.equal(generated.status, 200);
    const { data } = await generated.json();
    assert.equal(data.is_published, false);
    assert.equal(Object.keys(data).length, 14);
    assert.equal(data.title_vi, fixture.title_vi);
    const saved = await request("/api/admin/articles", data);
    assert.equal(saved.status, 201);
    const path = "/kien-thuc/" + data.slug_vi + "/";
    assert.equal((await fetch(origin + path)).status, 404);
    assert.ok(
      !(await (await fetch(origin + "/sitemap.xml")).text()).includes(
        data.slug_vi,
      ),
    );
    const id = app.rows[0].id;
    const patch = (published) =>
      fetch(origin + "/api/admin/articles/" + id, {
        method: "PATCH",
        headers: { origin, "Content-Type": "application/json", cookie },
        body: JSON.stringify({ is_published: published }),
      });
    assert.equal((await patch(true)).status, 200);
    const page = await fetch(origin + path);
    assert.equal(page.status, 200);
    const html = await page.text();
    assert.ok(html.includes(fixture.title_vi));
    assert.ok(html.includes("BlogPosting"));
    assert.ok(html.includes('rel="canonical"'));
    assert.match(html, /hreflang="en"/i);
    assert.ok(html.includes("<h2>Chăm sóc da</h2>"));
    assert.ok(
      (await (await fetch(origin + "/kien-thuc/")).text()).includes(
        data.slug_vi,
      ),
    );
    assert.ok(
      (await (await fetch(origin + "/sitemap.xml")).text()).includes(
        data.slug_en,
      ),
    );
    assert.equal(
      (await fetch(origin + "/en/journal/" + data.slug_en + "/")).status,
      200,
    );
    assert.equal((await patch(false)).status, 200);
    assert.equal((await fetch(origin + path)).status, 404);
  } finally {
    await app.stop();
  }
});
