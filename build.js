#!/usr/bin/env node
/*
 * Lunch Break Business — site generator.
 *
 * Publishes only ship notes tagged for this brand. Reads:
 *   - distribution/published/<slug>.md   (ship note — frontmatter drives inclusion)
 *   - production/finished/<slug>-final.md (the body content)
 *
 * A post appears on the site when its published ship note has:
 *   - `lbb` in the `platforms:` list
 *   - `status:` of `live` or `scheduled` (case-insensitive)
 *
 * Outputs:
 *   - distribution/site/blog/<slug>.html   (one per post)
 *   - distribution/site/blog/index.html    (archive list)
 *
 * Zero dependencies. Run with: node build.js
 */

const fs = require('fs');
const path = require('path');

const SITE_DIR = __dirname;
const VAULT_ROOT = path.resolve(SITE_DIR, '..', '..');
const PUBLISHED_DIR = path.join(VAULT_ROOT, 'distribution', 'published');
const FINISHED_DIR = path.join(VAULT_ROOT, 'production', 'finished');
const BLOG_DIR = path.join(SITE_DIR, 'blog');

const CTA_URL = 'https://followrs.store/realcodytye/lunch-break-business-starter-kit?t=45a16743f381';
const SITE_TAG = 'lbb';
const PUBLISHABLE_STATUSES = new Set(['live', 'scheduled']);

// ─── UTILS ────────────────────────────────────────────────────────

function escapeHtml(s) {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

// Parse YAML-lite frontmatter. Supports scalar values and both list forms:
//   platforms: [threads, lbb]
//   platforms:
//     - threads
//     - lbb
function parseFrontmatter(src) {
  const match = src.match(/^---\n([\s\S]*?)\n---\n?/);
  if (!match) return { meta: {}, body: src };
  const meta = {};
  const lines = match[1].split('\n');
  let currentKey = null;
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    // list item continuation
    const listItem = line.match(/^\s+-\s+(.*)$/);
    if (listItem && currentKey) {
      if (!Array.isArray(meta[currentKey])) meta[currentKey] = [];
      meta[currentKey].push(listItem[1].trim().replace(/^["']|["']$/g, ''));
      continue;
    }
    const kv = line.match(/^([a-z_][a-z0-9_]*):\s*(.*)$/i);
    if (!kv) { currentKey = null; continue; }
    const key = kv[1].trim();
    const rawVal = kv[2].trim();
    if (rawVal === '') {
      // block-style list follows
      meta[key] = [];
      currentKey = key;
      continue;
    }
    // inline list [a, b, c]
    const inline = rawVal.match(/^\[(.*)\]$/);
    if (inline) {
      meta[key] = inline[1].split(',').map(x => x.trim().replace(/^["']|["']$/g, '')).filter(Boolean);
      currentKey = null;
      continue;
    }
    meta[key] = rawVal.replace(/^["']|["']$/g, '');
    currentKey = null;
  }
  return { meta, body: src.slice(match[0].length) };
}

// Strip private outline sections that only belong in the working file.
// Everything from any H2 whose title matches the blocklist onward is dropped.
function stripPrivateSections(body) {
  const BLOCKED_HEADINGS = /^##\s+(skeleton|notes to self|opener)\s*$/i;
  const lines = body.split('\n');
  let cutIdx = -1;
  for (let i = 0; i < lines.length; i++) {
    if (BLOCKED_HEADINGS.test(lines[i].trim())) {
      cutIdx = i;
      break;
    }
  }
  return cutIdx === -1 ? body : lines.slice(0, cutIdx).join('\n').replace(/\n+---\n*$/, '\n').trim() + '\n';
}

// Convert simple markdown to HTML.
function mdToHtml(md) {
  const lines = md.split('\n');
  const out = [];
  let paraBuf = [];
  let inList = null;
  let listBuf = [];

  function flushPara() {
    if (paraBuf.length) {
      const text = paraBuf.join(' ').trim();
      if (text) out.push(`<p>${inline(text)}</p>`);
      paraBuf = [];
    }
  }
  function flushList() {
    if (inList && listBuf.length) {
      out.push(`<${inList}>${listBuf.map(li => `<li>${inline(li)}</li>`).join('')}</${inList}>`);
      listBuf = [];
      inList = null;
    }
  }
  function inline(s) {
    s = escapeHtml(s);
    s = s.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
    s = s.replace(/(^|[\s(])\*([^*\s][^*]*[^*\s]|[^*\s])\*(?=[\s.,!?;:)]|$)/g, '$1<em>$2</em>');
    s = s
      .replace(/(^|[\s(])"([^"]+)"/g, '$1&ldquo;$2&rdquo;')
      .replace(/(^|[\s(])'([^']+)'/g, "$1&lsquo;$2&rsquo;");
    return s;
  }

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    if (/^post\s+\d+\s*$/i.test(line)) continue;
    if (line === '') { flushPara(); flushList(); continue; }
    if (line === '---') { flushPara(); flushList(); out.push('<hr>'); continue; }
    const h = line.match(/^(#{1,3})\s+(.+)$/);
    if (h) {
      flushPara(); flushList();
      out.push(`<h${h[1].length}>${inline(h[2])}</h${h[1].length}>`);
      continue;
    }
    if (line.startsWith('> ')) {
      flushPara(); flushList();
      out.push(`<blockquote>${inline(line.slice(2))}</blockquote>`);
      continue;
    }
    const ul = line.match(/^[-*]\s+(.+)$/);
    if (ul) {
      flushPara();
      if (inList !== 'ul') { flushList(); inList = 'ul'; }
      listBuf.push(ul[1]);
      continue;
    }
    const ol = line.match(/^\d+\.\s+(.+)$/);
    if (ol) {
      flushPara();
      if (inList !== 'ol') { flushList(); inList = 'ol'; }
      listBuf.push(ol[1]);
      continue;
    }
    flushList();
    paraBuf.push(line);
  }
  flushPara(); flushList();
  return out.join('\n');
}

function firstPull(md) {
  const paras = md.split(/\n\s*\n/);
  for (const p of paras) {
    const t = p.trim();
    if (!t || t.startsWith('#') || t === '---') continue;
    if (/^post\s+\d+\s*$/i.test(t)) continue;
    const clean = t.replace(/[*#>_`]/g, '').replace(/\s+/g, ' ').trim();
    if (clean.length < 20) continue;
    return clean.length > 180 ? clean.slice(0, 177) + '...' : clean;
  }
  return '';
}

function extractTitle(md, slug) {
  const m = md.match(/^#\s+(.+)$/m);
  if (m) return m[1].trim();
  return slug.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
}

function niceDate(iso) {
  const [y, m, d] = iso.split('-').map(Number);
  const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  return `${months[m-1]} ${d}, ${y}`;
}

// ─── TEMPLATES ────────────────────────────────────────────────────

const NAV = (activePath) => `
<nav class="nav">
  <a href="${activePath === 'home' ? 'index.html' : '../index.html'}" class="nav-brand">Lunch Break Business<span class="dot">.</span></a>
  <div class="nav-links">
    <a href="${activePath === 'blog-index' || activePath === 'post' ? 'index.html' : 'blog/index.html'}"${activePath === 'blog-index' ? ' class="active"' : ''}>Blog</a>
    <a href="${activePath === 'post' ? '../index.html#starter-kit' : activePath === 'blog-index' ? '../index.html#starter-kit' : 'index.html#starter-kit'}">Starter Kit</a>
  </div>
</nav>`;

const FOOTER = (rel) => `
<footer class="footer">
  <div class="container">
    <span class="wm">Lunch Break Business<span class="dot">.</span></span>
    <p>Built by <a href="https://www.threads.com/@realcodytye" target="_blank" rel="noopener">@realcodytye</a> · <a href="${rel}blog/index.html">Blog</a> · <a href="${rel}index.html#starter-kit">Starter Kit</a></p>
    <p style="margin-top: 12px; opacity: 0.6;">© 2026 Lunch Break Business.</p>
  </div>
</footer>`;

function postPage({ title, dateNice, bodyHtml }) {
  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<title>${escapeHtml(title)} — Lunch Break Business</title>
<link rel="stylesheet" href="../style.css">
</head>
<body>
${NAV('post')}
<article class="essay container">
  <div class="essay-meta">${dateNice} · Blog</div>
  <h1 class="essay-title">${escapeHtml(title)}</h1>
  <div class="essay-body">
${bodyHtml}
  </div>

  <div class="essay-cta">
    <h3>Ready to build yours?</h3>
    <p>Under $100. Skool community + monthly live calls. Built for the person doing it in 30–60 minutes a day.</p>
    <a href="${CTA_URL}" class="btn btn-primary" target="_blank" rel="noopener">Get the Starter Kit<span class="dot">.</span></a>
  </div>

  <a href="index.html" class="essay-back">← All posts</a>
</article>
${FOOTER('../')}
</body>
</html>`;
}

function archivePage(posts) {
  const cards = posts.length ? posts.map(p => `
    <a href="${p.slug}.html" class="essay-card">
      <div class="meta">${p.dateNice}</div>
      <div class="title">${escapeHtml(p.title)}</div>
      <div class="pull">${escapeHtml(p.pull)}</div>
    </a>`).join('\n') : `
    <p class="lede" style="max-width: 620px;">Nothing published yet. New posts land here as they ship.</p>`;

  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<title>Blog — Lunch Break Business</title>
<link rel="stylesheet" href="../style.css">
</head>
<body>
${NAV('blog-index')}

<header class="archive-header">
  <div class="container">
    <div class="eyebrow">The Archive</div>
    <h1 class="h1">Blog.</h1>
    <p class="lede">Everything I've written about building a business in the margins, one post at a time.</p>
  </div>
</header>

<section class="archive-list">
  <div class="container">
    ${cards}
  </div>
</section>

${FOOTER('../')}
</body>
</html>`;
}

// ─── RUN ──────────────────────────────────────────────────────────

function main() {
  if (!fs.existsSync(PUBLISHED_DIR)) {
    console.error(`No published dir: ${PUBLISHED_DIR}`);
    process.exit(1);
  }
  if (!fs.existsSync(FINISHED_DIR)) {
    console.error(`No finished dir: ${FINISHED_DIR}`);
    process.exit(1);
  }
  if (!fs.existsSync(BLOG_DIR)) fs.mkdirSync(BLOG_DIR, { recursive: true });

  const RE_PUB = /^(\d{4}-\d{2}-\d{2})-([a-z0-9-]+)\.md$/;
  const posts = [];
  const skipped = { untagged: 0, wrongStatus: 0, missingBody: 0 };

  for (const f of fs.readdirSync(PUBLISHED_DIR)) {
    const m = f.match(RE_PUB);
    if (!m) continue;
    const dateISO = m[1];
    const shortSlug = m[2];
    const slug = `${dateISO}-${shortSlug}`;

    const src = fs.readFileSync(path.join(PUBLISHED_DIR, f), 'utf8');
    const { meta } = parseFrontmatter(src);

    const platforms = Array.isArray(meta.platforms) ? meta.platforms.map(p => p.toLowerCase()) : [];
    if (!platforms.includes(SITE_TAG)) { skipped.untagged++; continue; }

    const status = String(meta.status || '').toLowerCase();
    if (!PUBLISHABLE_STATUSES.has(status)) { skipped.wrongStatus++; continue; }

    const finalPath = path.join(FINISHED_DIR, `${slug}-final.md`);
    if (!fs.existsSync(finalPath)) {
      console.warn(`  ! Missing body for ${slug} (expected ${finalPath})`);
      skipped.missingBody++;
      continue;
    }

    const bodySrc = fs.readFileSync(finalPath, 'utf8');
    const { body } = parseFrontmatter(bodySrc);
    const clean = stripPrivateSections(body);
    const title = extractTitle(clean, shortSlug);
    const withoutTitle = clean.replace(/^#\s+.+$/m, '').trim();
    const pull = firstPull(withoutTitle);
    const bodyHtml = mdToHtml(withoutTitle);
    const dateNice = niceDate(dateISO);

    posts.push({ slug, dateISO, dateNice, title, pull });
    fs.writeFileSync(path.join(BLOG_DIR, `${slug}.html`), postPage({ title, dateNice, bodyHtml }));
  }

  posts.sort((a, b) => (a.dateISO < b.dateISO ? 1 : -1));
  fs.writeFileSync(path.join(BLOG_DIR, 'index.html'), archivePage(posts));

  console.log(`✓ Built ${posts.length} post(s) + archive.`);
  if (skipped.untagged) console.log(`  Skipped (no '${SITE_TAG}' tag): ${skipped.untagged}`);
  if (skipped.wrongStatus) console.log(`  Skipped (status not live/scheduled): ${skipped.wrongStatus}`);
  if (skipped.missingBody) console.log(`  Skipped (missing -final.md body): ${skipped.missingBody}`);
  console.log(`  Archive: distribution/site/blog/index.html`);
}

main();
