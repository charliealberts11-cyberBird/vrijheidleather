#!/usr/bin/env node
/*
 * VRIJHEID — SET THE LIVE WEBSITE ADDRESS (run once the final domain is known)
 * ---------------------------------------------------------------------------
 *   node scripts/set-site-url.js https://www.your-final-domain.com
 * (or set "siteUrl" in site.config.json and run without an argument)
 *
 * Updates, in all five pages:
 *   - <link rel="canonical">, og:url, og:image, twitter:image  (tags marked data-abs)
 *   - the LocalBusiness structured data (url, logo, image, @id)
 * and writes sitemap.xml and robots.txt. Safe to run again if the domain changes.
 */
'use strict';
const fs = require('fs');
const path = require('path');
const ROOT = path.resolve(__dirname, '..');
const PAGES = ['index.html', 'products.html', 'custom-orders.html', 'our-story.html', 'contact.html'];

function cfgUrl() { try { return JSON.parse(fs.readFileSync(path.join(ROOT, 'site.config.json'), 'utf8')).siteUrl || ''; } catch (e) { return ''; } }
const raw = process.argv[2] || process.env.SITE_URL || cfgUrl();
if (!raw) { console.error('✖ Please pass the live https:// address, e.g. node scripts/set-site-url.js https://www.example.com'); process.exit(1); }
let origin;
try { const u = new URL(raw); if (u.protocol !== 'https:') throw new Error(); origin = u.origin; } catch (e) { console.error('✖ "' + raw + '" is not a valid https:// address.'); process.exit(1); }

const abs = p => origin + (p.startsWith('/') ? p : '/' + p);
const strip = v => v.replace(/^https?:\/\/[^/]+/, '');

PAGES.forEach(file => {
  const fp = path.join(ROOT, file);
  let html = fs.readFileSync(fp, 'utf8');
  html = html.replace(/<(link|meta)\b([^>]*?)\sdata-abs>/g, (tag, name, attrs) => {
    const out = attrs.replace(/(href|content)="([^"]*)"/, (m, a, v) => a + '="' + abs(strip(v)) + '"');
    return '<' + name + out + ' data-abs>';
  });
  html = html.replace(/(<script type="application\/ld\+json">)([\s\S]*?)(<\/script>)/g, (m, a, json, b) => {
    const fixed = json.replace(/"(@id|url|logo|image)": "([^"]*)"/g, (mm, k, v) => (v.startsWith('/') || /^https?:\/\//.test(v)) && !/facebook|instagram/.test(v) ? '"' + k + '": "' + abs(strip(v)) + '"' : mm);
    return a + fixed + b;
  });
  fs.writeFileSync(fp, html);
  console.log('✔ updated ' + file);
});

const today = new Date().toISOString().slice(0, 10);
const urls = PAGES.map(f => '  <url><loc>' + (f === 'index.html' ? origin + '/' : origin + '/' + f) + '</loc><lastmod>' + today + '</lastmod></url>').join('\n');
fs.writeFileSync(path.join(ROOT, 'sitemap.xml'), '<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n' + urls + '\n</urlset>\n');
fs.writeFileSync(path.join(ROOT, 'robots.txt'), 'User-agent: *\nAllow: /\n\nSitemap: ' + origin + '/sitemap.xml\n');
console.log('✔ wrote sitemap.xml and robots.txt for ' + origin);
