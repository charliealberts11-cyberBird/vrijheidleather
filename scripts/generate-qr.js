#!/usr/bin/env node
/*
 * VRIJHEID — WEBSITE QR CODE GENERATOR
 * ------------------------------------
 * Creates print-ready QR codes that point to the LIVE website, for business
 * cards, product inserts and notes included with orders.
 *
 * Usage (from the website folder, Node.js 16+; no npm install needed):
 *   node scripts/generate-qr.js https://www.your-final-domain.com
 * or set "siteUrl" in site.config.json and run:
 *   node scripts/generate-qr.js
 * or:
 *   SITE_URL=https://www.your-final-domain.com node scripts/generate-qr.js
 *
 * Output (assets/qr/):
 *   vrijheid-website-qr.svg   vector — use this for professional printing
 *   vrijheid-website-qr.png   2048 × 2048 px raster, for Word/Canva etc.
 *
 * Settings: error correction level H (≈30% damage tolerance), 4-module quiet
 * zone, pure black on white for maximum scanning reliability.
 * Temporary / local URLs are refused on purpose.
 */
'use strict';

const fs = require('fs');
const path = require('path');
const zlib = require('zlib');
const { encodeText } = require('./qr-encoder');

const ROOT = path.resolve(__dirname, '..');
const OUT_DIR = path.join(ROOT, 'assets', 'qr');
const QUIET = 4;          // modules of white border (QR spec minimum is 4)
const PNG_SIZE = 2048;    // px

function readConfigUrl() {
  try {
    const cfg = JSON.parse(fs.readFileSync(path.join(ROOT, 'site.config.json'), 'utf8'));
    return cfg.siteUrl || '';
  } catch (e) { return ''; }
}

function validate(raw) {
  if (!raw) fail('No SITE_URL given. Pass the final live domain, e.g.\n  node scripts/generate-qr.js https://www.example.com');
  let u;
  try { u = new URL(raw); } catch (e) { fail('"' + raw + '" is not a valid URL.'); }
  if (u.protocol !== 'https:') fail('Please use the final https:// address of the live website.');
  const host = u.hostname.toLowerCase();
  const blocked = [
    /^localhost$/, /^127\./, /^0\.0\.0\.0$/, /^10\./, /^192\.168\./, /^172\.(1[6-9]|2\d|3[01])\./, /\.local$/,
    /\.vercel\.app$/, /\.netlify\.app$/, /\.pages\.dev$/, /\.github\.io$/, /\.ngrok(-free)?\.(io|app|dev)$/,
    /(^|\.)claude\.ai$/, /(^|\.)anthropic\.com$/, /\.trycloudflare\.com$/, /\.loca\.lt$/, /\.onrender\.com$/, /\.herokuapp\.com$/
  ];
  if (blocked.some(re => re.test(host))) {
    fail('"' + host + '" looks like a local, preview or temporary address.\n' +
      'Printed QR codes must point to the permanent live domain. Run this again once the final domain is live.');
  }
  return u.toString();
}

function fail(msg) { console.error('\n✖ ' + msg + '\n'); process.exit(1); }

function toSvg(qr, url) {
  const dim = qr.size + QUIET * 2;
  let d = '';
  for (let y = 0; y < qr.size; y++) {
    for (let x = 0; x < qr.size; x++) {
      if (qr.modules[y][x]) d += 'M' + (x + QUIET) + ' ' + (y + QUIET) + 'h1v1h-1z';
    }
  }
  return '<?xml version="1.0" encoding="UTF-8"?>\n' +
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ' + dim + ' ' + dim + '" width="50mm" height="50mm" shape-rendering="crispEdges">\n' +
    '  <title>Vrijheid Leather Works website: ' + url.replace(/&/g, '&amp;').replace(/</g, '&lt;') + '</title>\n' +
    '  <rect width="' + dim + '" height="' + dim + '" fill="#FFFFFF"/>\n' +
    '  <path fill="#000000" d="' + d + '"/>\n' +
    '</svg>\n';
}

function crc32(buf) {
  let c, crc = 0xFFFFFFFF;
  for (let n = 0; n < buf.length; n++) {
    c = (crc ^ buf[n]) & 0xFF;
    for (let k = 0; k < 8; k++) c = c & 1 ? 0xEDB88320 ^ (c >>> 1) : c >>> 1;
    crc = (crc >>> 8) ^ c;
  }
  return (crc ^ 0xFFFFFFFF) >>> 0;
}
function chunk(type, data) {
  const len = Buffer.alloc(4); len.writeUInt32BE(data.length);
  const td = Buffer.concat([Buffer.from(type, 'ascii'), data]);
  const crc = Buffer.alloc(4); crc.writeUInt32BE(crc32(td));
  return Buffer.concat([len, td, crc]);
}
function toPng(qr) {
  const dim = qr.size + QUIET * 2;
  const scale = Math.floor(PNG_SIZE / dim);
  const px = dim * scale;
  const pad = Math.floor((PNG_SIZE - px) / 2);
  const W = PNG_SIZE;
  const raw = Buffer.alloc((W + 1) * W, 255);
  for (let y = 0; y < W; y++) {
    raw[y * (W + 1)] = 0; // filter: none
    const my = Math.floor((y - pad) / scale) - QUIET;
    if (my < 0 || my >= qr.size || y < pad) continue;
    for (let x = 0; x < W; x++) {
      const mx = Math.floor((x - pad) / scale) - QUIET;
      if (x >= pad && mx >= 0 && mx < qr.size && qr.modules[my][mx]) raw[y * (W + 1) + 1 + x] = 0;
    }
  }
  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(W, 0); ihdr.writeUInt32BE(W, 4);
  ihdr[8] = 8; ihdr[9] = 0; ihdr[10] = 0; ihdr[11] = 0; ihdr[12] = 0; // 8-bit greyscale
  const phys = Buffer.alloc(9); phys.writeUInt32BE(11811, 0); phys.writeUInt32BE(11811, 4); phys[8] = 1; // 300 dpi
  return Buffer.concat([
    Buffer.from([0x89, 0x50, 0x4E, 0x47, 0x0D, 0x0A, 0x1A, 0x0A]),
    chunk('IHDR', ihdr), chunk('pHYs', phys),
    chunk('IDAT', zlib.deflateSync(raw, { level: 9 })),
    chunk('IEND', Buffer.alloc(0))
  ]);
}

const url = validate(process.argv[2] || process.env.SITE_URL || readConfigUrl());
const qr = encodeText(url, 'H');
fs.mkdirSync(OUT_DIR, { recursive: true });
fs.writeFileSync(path.join(OUT_DIR, 'vrijheid-website-qr.svg'), toSvg(qr, url));
fs.writeFileSync(path.join(OUT_DIR, 'vrijheid-website-qr.png'), toPng(qr));
console.log('✔ QR code created for ' + url);
console.log('  version ' + qr.version + ', error correction H, ' + QUIET + '-module quiet zone');
console.log('  ' + path.relative(ROOT, path.join(OUT_DIR, 'vrijheid-website-qr.svg')));
console.log('  ' + path.relative(ROOT, path.join(OUT_DIR, 'vrijheid-website-qr.png')));
console.log('  Always test-scan a printed proof before a large print run.');
