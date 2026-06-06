/**
 * Fincept Wallet — Cloudflare Pages Worker backend
 * Serves static assets, injects auth tokens into connect.html,
 * and stubs the Qt bridge endpoints (/callback /tx /result /log).
 */

const SECURITY_HEADERS = {
  "X-Frame-Options": "DENY",
  "X-Content-Type-Options": "nosniff",
  "Referrer-Policy": "strict-origin-when-cross-origin",
  "Permissions-Policy": "camera=(), microphone=(), geolocation=()",
};

const CSP_HEADER =
  "default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; connect-src 'self'; img-src 'self' data:; frame-ancestors 'none'; base-uri 'self'; form-action 'self';";

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const path = url.pathname;

    // Rate limit all routes
    const rateLimitResp = await checkRateLimit(request, env);
    if (rateLimitResp) return rateLimitResp;

    // API routes
    if (path === "/log") return handleLog(request);
    if (path === "/callback") return handleCallback(request);
    if (path === "/tx") return handleTx(request);
    if (path === "/result") return handleResult(request);

    // connect.html needs token injection
    if (path === "/connect.html" || path === "/connect") {
      return serveConnectHtml(request, env);
    }

    // Everything else — static assets via Pages
    return serveAsset(request, env);
  },
};

/* ── Rate limiting (KV-backed) ──────────────────────────────────────── */
async function checkRateLimit(request, env) {
  if (!env.RATE_LIMIT) return null;
  const clientIP = request.headers.get("CF-Connecting-IP") || "unknown";
  const key = `rl:${clientIP}`;
  const now = Math.floor(Date.now() / 1000);
  const windowSeconds = 60;
  const maxRequests = 60;

  try {
    const stored = await env.RATE_LIMIT.get(key);
    let data = stored ? JSON.parse(stored) : { count: 0, windowStart: now };

    if (now - data.windowStart > windowSeconds) {
      data = { count: 1, windowStart: now };
    } else {
      data.count += 1;
    }

    await env.RATE_LIMIT.put(key, JSON.stringify(data), {
      expirationTtl: windowSeconds + 5,
    });

    if (data.count > maxRequests) {
      return jsonResponse({ error: "Rate limit exceeded" }, 429);
    }
  } catch (_) {
    // Fail open if KV is misconfigured
  }
  return null;
}

/* ── API stubs ──────────────────────────────────────────────────────── */
async function handleLog(request) {
  if (request.method !== "POST") return methodNotAllowed();
  // Accept silently; in production this would ship to Logpush / tail
  return new Response(null, { status: 204, headers: SECURITY_HEADERS });
}

async function handleCallback(request) {
  if (request.method !== "POST") return methodNotAllowed();
  try {
    const body = await request.json();
    // Production would: verify signature cryptographically, store session,
    // return a session cookie or JWT.
    return jsonResponse({ ok: true, pubkey: body.pubkey || null });
  } catch (e) {
    return jsonResponse({ ok: false, error: e.message }, 400);
  }
}

async function handleTx(request) {
  // Dummy base64-encoded Solana transaction (0-lamport transfer to self).
  const dummyTx =
    "AQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABAAED" +
    "KdYJQABpf2S2eJ4z3ZS49a1pA4JibGNr6RVmLqt7iA0AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA" +
    "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA";
  return jsonResponse({ tx_base64: dummyTx });
}

async function handleResult(request) {
  if (request.method !== "POST") return methodNotAllowed();
  try {
    const body = await request.json();
    // Production would: persist signature, broadcast to Solana RPC, update UI.
    return new Response(null, { status: 204, headers: SECURITY_HEADERS });
  } catch (e) {
    return jsonResponse({ ok: false, error: e.message }, 400);
  }
}

/* ── Static asset serving ───────────────────────────────────────────── */
async function serveAsset(request, env) {
  const asset = await env.ASSETS.fetch(request);
  const response = new Response(asset.body, asset);
  // Layer security headers on every response
  const headers = new Headers(response.headers);
  Object.entries(SECURITY_HEADERS).forEach(([k, v]) => headers.set(k, v));
  headers.set("Content-Security-Policy", CSP_HEADER);
  return new Response(response.body, { status: response.status, headers });
}

/* ── connect.html with token injection ──────────────────────────────── */
async function serveConnectHtml(request, env) {
  // Fetch the template (not a publicly-routed static file) so Pages
  // doesn't serve it directly and bypass the Worker.
  const templateUrl = new URL(request.url);
  templateUrl.pathname = "/connect-template.html";
  const asset = await env.ASSETS.fetch(new Request(templateUrl, request));
  let html = await asset.text();

  const nonce = generateHex(16);
  const token = generateHex(32);

  html = html.replace(/__NONCE_HEX__/g, nonce);
  html = html.replace(/__CALLBACK_TOKEN__/g, token);

  const headers = new Headers({
    "Content-Type": "text/html; charset=utf-8",
    "Content-Security-Policy": CSP_HEADER,
    ...SECURITY_HEADERS,
  });
  return new Response(html, { status: 200, headers });
}

/* ── Helpers ────────────────────────────────────────────────────────── */
function jsonResponse(obj, status = 200) {
  return new Response(JSON.stringify(obj), {
    status,
    headers: {
      "Content-Type": "application/json",
      ...SECURITY_HEADERS,
    },
  });
}

function methodNotAllowed() {
  return jsonResponse({ error: "Method not allowed" }, 405);
}

function generateHex(bytes) {
  const arr = new Uint8Array(bytes);
  crypto.getRandomValues(arr);
  return Array.from(arr, (b) => b.toString(16).padStart(2, "0")).join("");
}
