// Lunch Break Business — Analytics Worker
// Deploy this in the Cloudflare Workers dashboard.
//
// Required KV namespace binding: ANALYTICS (bind in Worker settings → KV Namespace Bindings)
// Required secret: DASHBOARD_PASSWORD (set in Worker settings → Variables → Secret)

const ALLOWED_ORIGIN = 'https://realcodytye.com';

export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    if (request.method === 'OPTIONS') {
      return preflight();
    }

    if (request.method === 'POST' && url.pathname === '/track') {
      return handleTrack(request, env);
    }

    if (request.method === 'GET' && url.pathname === '/data') {
      return handleData(request, env);
    }

    return new Response('Not found', { status: 404 });
  },
};

// ─── CORS ─────────────────────────────────────────────────────────────────────

function corsHeaders() {
  return {
    'Access-Control-Allow-Origin': ALLOWED_ORIGIN,
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, X-Password',
  };
}

function preflight() {
  return new Response(null, { status: 204, headers: corsHeaders() });
}

function json(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { ...corsHeaders(), 'Content-Type': 'application/json' },
  });
}

// ─── TRACK ────────────────────────────────────────────────────────────────────

async function handleTrack(request, env) {
  let event;
  try {
    event = await request.json();
  } catch {
    return new Response('Bad request', { status: 400, headers: corsHeaders() });
  }

  const now = new Date();
  const pad = (n, l = 2) => String(n).padStart(l, '0');
  const dateStr =
    now.getUTCFullYear() +
    pad(now.getUTCMonth() + 1) +
    pad(now.getUTCDate());
  const timeStr =
    pad(now.getUTCHours()) +
    pad(now.getUTCMinutes()) +
    pad(now.getUTCSeconds());
  const rand = Math.random().toString(36).slice(2, 7);
  const key = `ev:${dateStr}-${timeStr}-${rand}`;

  await env.ANALYTICS.put(
    key,
    JSON.stringify({ ...event, serverTime: now.toISOString() }),
    { expirationTtl: 60 * 60 * 24 * 90 } // keep 90 days
  );

  return new Response('ok', { status: 200, headers: corsHeaders() });
}

// ─── DASHBOARD DATA ───────────────────────────────────────────────────────────

async function handleData(request, env) {
  const password = request.headers.get('X-Password');
  if (!password || password !== env.DASHBOARD_PASSWORD) {
    return new Response('Unauthorized', { status: 401 });
  }

  const days = 30;
  const cutoff = new Date(Date.now() - days * 86400000);
  const pad = (n, l = 2) => String(n).padStart(l, '0');
  const cutoffStr =
    cutoff.getUTCFullYear() +
    pad(cutoff.getUTCMonth() + 1) +
    pad(cutoff.getUTCDate());

  const events = [];
  let cursor;

  do {
    const result = await env.ANALYTICS.list({
      prefix: 'ev:',
      limit: 1000,
      cursor,
    });

    const fetches = [];
    for (const key of result.keys) {
      const datePart = key.name.slice(3, 11); // ev:YYYYMMDD-...
      if (datePart >= cutoffStr) {
        fetches.push(
          env.ANALYTICS.get(key.name, 'json').then((v) => v && events.push(v))
        );
      }
    }
    await Promise.all(fetches);

    cursor = result.list_complete ? undefined : result.cursor;
  } while (cursor);

  return json(events);
}
