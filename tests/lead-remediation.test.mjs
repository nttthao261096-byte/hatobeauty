import test from "node:test";
import assert from "node:assert/strict";
import { startLeadTestServer } from "./helpers/lead-test-server.mjs";

test("H05/M09: selected-channel validation, payload preservation and truthful errors", async () => {
  const app = await startLeadTestServer(3044);
  const request = (path, body) =>
    fetch(app.origin + path, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
  const base = {
    name: "QA Fixture",
    service: "skin",
    date: "2099-01-01",
    locale: "en",
    consent: true,
  };
  try {
    for (const body of [
      null,
      [],
      {},
      { ...base, name: "x" },
      { ...base, service: "invented", phone: "+84999999999" },
    ]) {
      assert.equal((await request("/api/bookings", body)).status, 400);
    }
    const invalid = [
      { preference: "email", email: "" },
      { preference: "email", email: "bad@" },
      { preference: "whatsapp", phone: "0901234567" },
      { preference: "instagram", social: "https://evil.invalid/person" },
      { preference: "facebook", social: "https://facebook.com/" },
      { preference: "facebook", social: "javascript:alert(1)" },
      { preference: "phone", phone: "123" },
      { preference: "unsupported" },
    ];
    for (const details of invalid)
      for (const path of ["/api/contact", "/api/bookings"]) {
        assert.equal(
          (await request(path, { ...base, ...details })).status,
          400,
          JSON.stringify(details),
        );
      }
    assert.equal(app.saved.length, 0);
    const valid = [
      { preference: "phone", phone: "0901234567" },
      { preference: "email", email: "qa@example.test" },
      { preference: "whatsapp", phone: "+84901234567" },
      { preference: "instagram", social: "@qa.fixture" },
      { preference: "facebook", social: "https://www.facebook.com/qa.fixture" },
    ];
    for (const details of valid)
      for (const path of ["/api/contact", "/api/bookings"]) {
        const response = await request(path, {
          ...base,
          ...details,
          phone: details.phone ?? "unrelated value must not be stored",
        });
        assert.equal(response.status, 201, await response.text());
        const saved = app.saved.at(-1);
        assert.equal(saved.contact_preference, details.preference);
        assert.equal(saved.phone, details.phone ?? null);
        assert.equal(saved.email, details.email ?? null);
        assert.equal(saved.social_contact, details.social ?? null);
        assert.ok(!("confirmed" in saved));
        if (path.includes("bookings")) assert.equal(saved.service_slug, "skin");
      }
    const count = app.saved.length;
    assert.equal(
      (await request("/api/contact", { ...base, ...valid[1], consent: false }))
        .status,
      400,
    );
    assert.equal(
      (
        await request("/api/contact", {
          ...base,
          ...valid[1],
          message: "x".repeat(2001),
        })
      ).status,
      400,
    );
    assert.equal(
      (
        await request("/api/bookings", {
          ...base,
          ...valid[1],
          option: "unapproved-option",
        })
      ).status,
      400,
    );
    assert.equal(
      (
        await request("/api/bookings", {
          ...base,
          ...valid[1],
          date: "2020-01-01",
        })
      ).status,
      400,
    );
    assert.equal(app.saved.length, count);
    app.control.fail = true;
    assert.equal(
      (await request("/api/contact", { ...base, ...valid[1] })).status,
      502,
    );
    assert.equal(
      (await request("/api/bookings", { ...base, ...valid[1] })).status,
      502,
    );
    assert.equal(app.saved.length, count);
  } finally {
    await app.stop();
  }
});
