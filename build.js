#!/usr/bin/env node
/*
 * Lunch Break Business — site generator.
 * Reads production/finished/*-final.md (master versions only, no platform suffix)
 * and generates:
 *   - distribution/site/essays/<slug>.html   (one per essay)
 *   - distribution/site/essays/index.html    (archive list)
 *
 * Zero dependencies. Run with: node build.js
 * Re-run whenever a new essay lands in production/finished/.
 */

const fs = require('fs');
const path = require('path');

const SITE_DIR = __dirname;
const VAULT_ROOT = path.resolve(SITE_DIR, '..', '..');
const FINISHED_DIR = path.join(VAULT_ROOT, 'production', 'finished');
const ESSAYS_DIR = path.join(SITE_DIR, 'essays');

const CTA_URL = 'https://followrs.store/realcodytye/lunch-break-business-starter-kit?t=45a16743f381';

// ─── UTILS ────────────────────────────────────────────────────────

function escapeHtml(s) {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

// Parse YAML-lite frontmatter. Assumes simple `key: value` pairs.
function parseFrontmatter(src) {
  const match = src.match(/^---\n([\s\S]*?)\n---\n?/);
  if (!match) return { meta: {}, body: src };
  const meta = {};
  match[1].split('\n').forEach(line => {
    const m = line.match(/^([a-z_][a-z0-9_]*):\s*(.*)$/i);
    if (m) meta[m[1].trim()] = m[2].trim();
  });
  return { meta, body: src.slice(match[0].length) };
}

// Strip a possible second meta block (writing-room drafts had a `**Audience:** ...` list
// before an `---` divider). We drop everything up to and including the first `---` line
// that sits on its own AFTER any lines starting with `**Key:**`.
function stripLegacyMetaBlock(body) {
  const lines = body.split('\n');
  let sawMetaLine = false;
  let dividerIdx = -1;
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    if (/^\*\*[A-Z][^*]*:\*\*/.test(line)) {
      sawMetaLine = true;
      continue;
    }
    if (line === '---' && sawMetaLine) {
      dividerIdx = i;
      break;
    }
    // stop scanning once we hit real content
    if (line && !line.startsWith('**') && !line.startsWith('#')) {
      break;
    }
  }
  if (dividerIdx !== -1) {
    return lines.slice(dividerIdx + 1).join('\n');
  }
  return body;
}

// Convert simple markdown to HTML. Supports:
//   - # / ## / ### headings
//   - paragraphs (blank-line separated)
//   - **bold**, *italic*
//   - hr `---` on its own line
//   - "Post N" labels are dropped (Threads artifact — noise on web)
//   - Blockquote > text
//   - Ordered / unordered lists
function mdToHtml(md) {
  const lines = md.split('\n');
  const out = [];
  let paraBuf = [];
  let inList = null; // 'ul' | 'ol' | null
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
    // escape first, then apply formatting
    s = escapeHtml(s);
    // bold **x**
    s = s.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
    // italic *x*
    s = s.replace(/(^|[\s(])\*([^*\s][^*]*[^*\s]|[^*\s])\*(?=[\s.,!?;:)]|$)/g, '$1<em>$2</em>');
    // smart quotes
    s = s
      .replace(/(^|[\s(])"([^"]+)"/g, '$1&ldquo;$2&rdquo;')
      .replace(/(^|[\s(])'([^']+)'/g, "$1&lsquo;$2&rsquo;");
    return s;
  }

  for (let i = 0; i < lines.length; i++) {
    const raw = lines[i];
    const line = raw.trim();

    // skip Threads post labels
    if (/^post\s+\d+\s*$/i.test(line)) continue;

    if (line === '') { flushPara(); flushList(); continue; }
    if (line === '---') { flushPara(); flushList(); out.push('<hr>'); continue; }

    // headings
    const h = line.match(/^(#{1,3})\s+(.+)$/);
    if (h) {
      flushPara(); flushList();
      const level = h[1].length;
      out.push(`<h${level}>${inline(h[2])}</h${level}>`);
      continue;
    }

    // blockquote
    if (line.startsWith('> ')) {
      flushPara(); flushList();
      out.push(`<blockquote>${inline(line.slice(2))}</blockquote>`);
      continue;
    }

    // unordered list item
    const ul = line.match(/^[-*]\s+(.+)$/);
    if (ul) {
      flushPara();
      if (inList !== 'ul') { flushList(); inList = 'ul'; }
      listBuf.push(ul[1]);
      continue;
    }

    // ordered list item
    const ol = line.match(/^\d+\.\s+(.+)$/);
    if (ol) {
      flushPara();
      if (inList !== 'ol') { flushList(); inList = 'ol'; }
      listBuf.push(ol[1]);
      continue;
    }

    // paragraph line
    flushList();
    paraBuf.push(line);
  }
  flushPara(); flushList();

  return out.join('\n');
}

// Grab a one-line pull from the essay body — first non-heading paragraph, ~180 chars.
function firstPull(md) {
  const paras = md.split(/\n\s*\n/);
  for (const p of paras) {
    const t = p.trim();
    if (!t) continue;
    if (t.startsWith('#')) continue;
    if (t === '---') continue;
    if (/^post\s+\d+\s*$/i.test(t)) continue;
    if (/^\*\*[A-Z][^*]*:\*\*/.test(t)) continue;
    // Strip markdown
    const clean = t.replace(/[*#>_`]/g, '').replace(/\s+/g, ' ').trim();
    if (clean.length < 20) continue;
    return clean.length > 180 ? clean.slice(0, 177) + '...' : clean;
  }
  return '';
}

// Grab the first # heading as title, else derive from slug.
function extractTitle(md, slug) {
  const m = md.match(/^#\s+(.+)$/m);
  if (m) return m[1].trim();
  return slug.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
}

// ─── PAGE TEMPLATES ───────────────────────────────────────────────

const NAV = (activePath) => `
<nav class="nav">
  <a href="${activePath === 'home' ? 'index.html' : '../index.html'}" class="nav-brand">Lunch Break Business<span class="dot">.</span></a>
  <div class="nav-links">
    <a href="${activePath === 'essays' || activePath === 'essay' ? 'index.html' : 'essays/index.html'}"${activePath === 'essays' ? ' class="active"' : ''}>Essays</a>
    <a href="${activePath === 'essay' ? '../index.html#starter-kit' : activePath === 'essays' ? '../index.html#starter-kit' : 'index.html#starter-kit'}">Starter Kit</a>
  </div>
</nav>`;

const FOOTER = (rel) => `
<footer class="footer">
  <div class="container">
    <span class="wm">Lunch Break Business<span class="dot">.</span></span>
    <p>Built by <a href="https://www.threads.com/@realcodytye" target="_blank" rel="noopener">@realcodytye</a> · <a href="${rel}essays/index.html">Essays</a> · <a href="${rel}index.html#starter-kit">Starter Kit</a></p>
    <p style="margin-top: 12px; opacity: 0.6;">© 2026 Lunch Break Business.</p>
  </div>
</footer>`;

function essayPage({ title, dateISO, dateNice, bodyHtml, slug }) {
  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<title>${escapeHtml(title)} — Lunch Break Business</title>
<link rel="stylesheet" href="../style.css">
</head>
<body>
${NAV('essay')}
<article class="essay container">
  <div class="essay-meta">${dateNice} · Essay</div>
  <h1 class="essay-title">${escapeHtml(title)}</h1>
  <div class="essay-body">
${bodyHtml}
  </div>

  <div class="essay-cta">
    <h3>Ready to build yours?</h3>
    <p>Under $100. Skool community + monthly live calls. Built for the person doing it in 30–60 minutes a day.</p>
    <a href="${CTA_URL}" class="btn btn-primary" target="_blank" rel="noopener">Get the Starter Kit<span class="dot">.</span></a>
  </div>

  <a href="index.html" class="essay-back">← All essays</a>
</article>
${FOOTER('../')}
</body>
</html>`;
}

function archivePage(essays) {
  const cards = essays.map(e => `
    <a href="${e.slug}.html" class="essay-card">
      <div class="meta">${e.dateNice}</div>
      <div class="title">${escapeHtml(e.title)}</div>
      <div class="pull">${escapeHtml(e.pull)}</div>
    </a>`).join('\n');

  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<title>Essays — Lunch Break Business</title>
<link rel="stylesheet" href="../style.css">
</head>
<body>
${NAV('essays')}

<header class="archive-header">
  <div class="container">
    <div class="eyebrow">The Archive</div>
    <h1 class="h1">Essays.</h1>
    <p class="lede">Everything I've written about building a business in the margins — one post at a time.</p>
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

function niceDate(iso) {
  const [y, m, d] = iso.split('-').map(Number);
  const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  return `${months[m-1]} ${d}, ${y}`;
}

function main() {
  if (!fs.existsSync(FINISHED_DIR)) {
    console.error(`No finished dir: ${FINISHED_DIR}`);
    process.exit(1);
  }
  if (!fs.existsSync(ESSAYS_DIR)) fs.mkdirSync(ESSAYS_DIR, { recursive: true });

  // Match master files: 2026-08-05-slug-final.md (no -<platform> before .md)
  const RE = /^(\d{4}-\d{2}-\d{2})-([a-z0-9-]+)-final\.md$/;
  const files = fs.readdirSync(FINISHED_DIR).filter(f => RE.test(f));
  const essays = [];

  for (const f of files) {
    const m = f.match(RE);
    const dateISO = m[1];
    const slug = `${dateISO}-${m[2]}`;
    const src = fs.readFileSync(path.join(FINISHED_DIR, f), 'utf8');
    const { meta, body } = parseFrontmatter(src);
    const stripped = stripLegacyMetaBlock(body);
    const title = extractTitle(stripped, m[2]);
    const pull = firstPull(stripped.replace(/^#\s+.+$/m, '').trim());
    const bodyHtml = mdToHtml(stripped.replace(/^#\s+.+$/m, '').trim());
    const dateNice = niceDate(dateISO);

    essays.push({ slug, dateISO, dateNice, title, pull });
    fs.writeFileSync(
      path.join(ESSAYS_DIR, `${slug}.html`),
      essayPage({ title, dateISO, dateNice, bodyHtml, slug })
    );
  }

  // Sort newest first
  essays.sort((a, b) => (a.dateISO < b.dateISO ? 1 : -1));

  fs.writeFileSync(path.join(ESSAYS_DIR, 'index.html'), archivePage(essays));

  console.log(`✓ Built ${essays.length} essays + archive.`);
  console.log(`  Landing:  distribution/site/index.html`);
  console.log(`  Archive:  distribution/site/essays/index.html`);
  console.log(`  Open with: xdg-open (or termux-open) distribution/site/index.html`);
}

main();
