import assert from "node:assert/strict";
const origin = process.env.TEST_ORIGIN || "http://127.0.0.1:5173";
if (!/^http:\/\/(127\.0\.0\.1|localhost):\d+$/.test(origin))
  throw new Error("Integration tests only run against a local preview.");
const future = new Date(Date.now() + 86400000 * 14).toISOString().slice(0, 10);
const payload = {
  requestId: crypto.randomUUID(),
  startedAt: Date.now() - 10000,
  website: "",
  occasion: "Freundesgruppe",
  desiredDate: future,
  alternativeDate: "",
  participants: 4,
  name: "Lokaler API-Test",
  email: `api-${crypto.randomUUID().slice(0, 8)}@example.test`,
  phone: "",
  shapeWorld: "",
  scentWorld: "Ohne Duft",
  message: "Automatischer lokaler Funktionstest.",
};
async function post(data, headers = {}, localRestartRetries = 2) {
  const response = await fetch(`${origin}/api/inquiries`, {
    method: "POST",
    // Keep deliberately malformed local test requests on separate connections.
    headers: { Origin: origin, "Content-Type": "application/json", Connection: "close", ...headers },
    body: typeof data === "string" ? data : JSON.stringify(data),
  });
  const raw = await response.text();
  // Wrangler's local proxy can replace its downstream worker between requests.
  // Retry only that explicit infrastructure response, with the same request ID.
  // Application 503 responses are never retried or hidden by this harness.
  if (response.status === 503 && raw.startsWith("Your worker restarted mid-request.") && localRestartRetries > 0) {
    return post(data, headers, localRestartRetries - 1);
  }
  let parsed;
  try {
    parsed = JSON.parse(raw);
  } catch {
    parsed = { message: raw };
  }
  return { status: response.status, data: parsed };
}
assert.equal(
  (await post(payload, { Origin: "https://example.invalid" })).status,
  403,
);
assert.equal((await post("{")).status, 400);
assert.equal(
  (await post(payload, { "Content-Type": "text/plain" })).status,
  415,
);
assert.equal(
  (await post({ ...payload, message: "x".repeat(17000) })).status,
  413,
);
assert.equal((await post({ ...payload, website: "spam.invalid" })).status, 400);
const invalid = await post({
  ...payload,
  email: "invalid",
  participants: 0,
  desiredDate: "2026-02-30",
});
assert.equal(invalid.status, 400);
assert.ok(invalid.data.errors.email);
assert.ok(invalid.data.errors.participants);
assert.ok(invalid.data.errors.desiredDate);
assert.equal(
  (await post({ ...payload, shapeWorld: "Unapproved product" })).status,
  400,
);
const saved = await post(payload);
assert.equal(saved.status, 201);
assert.equal(saved.data.ok, true);
const retry = await post(payload);
assert.equal(retry.status, 201);
assert.equal(retry.data.reference, saved.data.reference);
assert.equal(
  (await post({ ...payload, email: "someone-else@example.test" })).status,
  409,
);
for (let i = 0; i < 2; i++)
  assert.equal(
    (await post({ ...payload, requestId: crypto.randomUUID() })).status,
    201,
  );
assert.equal(
  (await post({ ...payload, requestId: crypto.randomUUID() })).status,
  429,
);
console.log(
  "PASS: 13 API checks – origin, JSON, size, spam, validation, persistence, idempotency, conflict and rate limit.",
);
