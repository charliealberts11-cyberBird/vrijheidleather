# Vrijheid Leather Works — Website

*Crafted in Namibia. Made for Freedom.*

A five-page static website (Home, Products, Custom Orders, Our Story, Contact) in plain
HTML, CSS and vanilla JavaScript. No framework, no build step, no npm packages.
Upload the contents of this folder to any static host (Netlify, Vercel, Cloudflare Pages,
cPanel hosting, etc.).

Nothing in the original `Vrijheid Leer` folder was changed: the photographs, catalogue and
logo are untouched. The website uses optimised copies only.

---

## Folder structure

```
website/
├── index.html, products.html, custom-orders.html, our-story.html, contact.html
├── assets/
│   ├── css/styles.css          all styling (colours are CSS variables at the top)
│   ├── js/main.js              language switch, gallery, products, forms
│   ├── js/site-config.js       ← form service settings (edit this to connect forms)
│   ├── images/products/        optimised product photos (WebP, 480 / 800 / 1200 px)
│   ├── images/site/            hero, story, custom-work and corporate photos + og-default.jpg
│   ├── logo/                   web copies of the official logo + icons
│   └── qr/                     created by scripts/generate-qr.js
├── data/
│   ├── products.js             ← ALL product names, prices, copy, photos (EN + AF)
│   ├── translations.js         ← all page text in English and Afrikaans
│   └── images.js               list of available image sizes
├── scripts/
│   ├── set-site-url.js         sets canonical / Open Graph URLs + sitemap.xml + robots.txt
│   ├── generate-qr.js          print-quality QR code for the live website
│   └── qr-encoder.js           QR engine used by generate-qr.js (no install needed)
└── site.config.json            the live website address (siteUrl)
```

---

## Launch checklist

1. **Upload** the whole `website` folder to the host and connect the final domain.
2. **Set the live address** (needs Node.js 16+ on any computer):
   ```
   node scripts/set-site-url.js https://www.your-final-domain.com
   ```
   This fills in canonical links, Open Graph/Twitter URLs, the structured-data URLs,
   and writes `sitemap.xml` and `robots.txt`. Re-upload the changed files.
3. **Create the QR code** (only once the real domain is live):
   ```
   node scripts/generate-qr.js https://www.your-final-domain.com
   ```
   Produces `assets/qr/vrijheid-website-qr.svg` (use for professional print) and
   `vrijheid-website-qr.png` (2048 px, 300 dpi). Error correction H, 4-module quiet zone,
   black on white. The script refuses localhost, preview and temporary URLs.
   Always test-scan a printed proof before a large print run.
4. **Connect the forms** (optional but recommended) — see below.
5. Submit `sitemap.xml` in Google Search Console and create/verify a Google Business Profile
   for Vrijheid (Windhoek CBD).

---

## Forms (Custom Orders + Contact)

The site is static, so forms need a form service to send email.

**As delivered (`provider: 'none'`)** the forms are fully honest and working: after
validation, *Continue in my email app* opens the visitor's email program with all their
answers filled in, addressed to vrijheidleer@gmail.com. File upload is hidden in this mode and
visitors are asked to attach their JPG/PNG/PDF files to that email.

**To receive submissions directly**, edit `assets/js/site-config.js`:

| Service | Settings |
|---|---|
| Formspree | `provider: 'formspree'`, `endpoint: 'https://formspree.io/f/xxxxxxx'` |
| Web3Forms | `provider: 'web3forms'`, `accessKey: '...'` (public key, safe in the browser) |
| Own serverless endpoint | `provider: 'custom'`, `endpoint: '/api/enquiry'` — accepts multipart/form-data, returns HTTP 200; keep any secret keys on the server |

Set `allowUploads: true` **only** if the chosen plan accepts file attachments (Formspree paid
plans, Web3Forms Pro, or your own endpoint). The upload field then appears, accepting
JPG/JPEG/PNG/PDF, max 10 MB per file, up to 5 files. A hidden honeypot field filters basic spam.

---

## Editing content

- **Prices, product copy, photos, categories:** `data/products.js` (one entry per product,
  English and Afrikaans side by side). The Home page shows the six products marked
  `featured: true`. Every price was checked against *Vrijheid Corporate Catalogue 2026*.
- **Page text (EN/AF):** `data/translations.js`. The English text is also written in the HTML
  files for search engines — if you change English wording, change it in both places.
- **Header/footer** are repeated in each of the five HTML files; update all five when changing them.
- **Adding a product photo:** save WebP copies as `assets/images/products/<key>-480.webp`, `-800.webp`,
  `-1200.webp`, add the key, sizes and `"dir":"products"` to `data/images.js`, then reference the key in `products.js`.
- Deep links: `products.html#weekender-bag` opens a product; `products.html?category=corporate`
  opens a filter (`everyday, work, home, golf, field, corporate`).

Language: English loads first; the EN | AF choice is remembered in the visitor's browser
(localStorage). Switching does not reload the page.

---

## Logo

`assets/logo/vrijheid-logo-original.png` is an unchanged copy of the official logo.
Because the site is dark, the header/footer use `vrijheid-logo-light` — the same artwork and
proportions with the dark grey ink recoloured to silver. Icons (favicon, apple-touch-icon)
place the full logo, unaltered in shape, on the site's dark background.

---

## Photography — curation record

The source folder holds 108 photos + 1 video. Six were exact byte-for-byte duplicates
(`(1)` copies of WA0090, WA0073, WA0074, WA0015, WA0019, WA0032). Of the remaining 102,
**39 photos were selected**, plus **4 photos taken from the 2026 catalogue** for products that
have no matching photo in the Images folder (Multitool Holder, 7 Round Ammo Pouch, High-End
Toiletry Bag, Smart Wallet) — 43 images in total.

Not used, deliberately:
- near-duplicate angles of the same bag, belt, placemat, coaster and keychain shoots
  (only the strongest one or two of each set were kept);
- the rifle-bag photos, the belt-pouch screenshot and the rifle-bag video — not catalogue items,
  and they would push the brand towards a hunting/tactical look;
- the humorous bottle sleeves, travel-games cases (except one for custom work), mug/bottle
  covers and notebook covers other than one example — not catalogue products;
- the Schalke 04 branded apron photos (third-party club logo) — the Vrijheid-branded apron is used instead.

Photos of items that are not in the catalogue (passport/travel covers, notebook cover, games
case, shaped key tag) appear **only** as custom-work examples, captioned without product
names or prices.

| Web image key | Source file | Used for |
|---|---|---|
| `hero-weekender-bags` | FB_IMG_1758115863612.jpg | Home hero slide 1; Weekender Bag extra photo |
| `hero-lion-placemat` | IMG-20260429-WA0019.jpg | Home hero slide 2 |
| `hero-personalised-wallet` | IMG-20260729-WA0044.jpg | Home hero slide 4 (personalisation) |
| `golf-ball-case` | IMG-20260617-WA0014.jpg | Golf Ball Case main; hero slide 5 |
| `golf-ball-case-colours` | IMG-20260617-WA0019.jpg | Golf Ball Case extra |
| `apron` | IMG-20260610-WA0073.jpg | Apron main |
| `placemats` | IMG-20260429-WA0017.jpg | Placemats main |
| `placemats-set` | IMG-20260429-WA0018.jpg | Placemats extra; Our Story "Made in Namibia" |
| `mittens` | IMG-20260602-WA0036(1).jpg | Mittens main; Our Story "A family craft" |
| `mittens-in-use` | IMG-20260520-WA0009(1).jpg | Mittens extra; hero slide 6 |
| `coasters` | IMG-20260511-WA0045.jpg | Coasters main |
| `coasters-detail` | IMG-20260511-WA0043.jpg | Coasters extra |
| `keychains` | IMG-20260902-WA0006(1).jpg | Keychains main |
| `keychains-engraved` | IMG-20251125-WA0036.jpg | Keychains extra |
| `multitool-holder` | s08_Picture4.jpg | Multitool Holder main (catalogue photo) |
| `multitool-holder-open` | s08_Picture2.jpg | Multitool Holder extra (catalogue photo) |
| `belt` | IMG-20260331-WA0028.jpg | Golf / Everyday Belt main |
| `belt-worn` | IMG-20260331-WA0017.jpg | Belt extra |
| `ammo-bag-50` | IMG-20260311-WA0028.jpg | 50 Round Ammo Bag main |
| `ammo-bag-50-open` | IMG-20260311-WA0030.jpg | 50 Round Ammo Bag extra |
| `ammo-pouch-7` | s11_Picture9.jpg | 7 Round Ammo Pouch main (catalogue photo) |
| `knobel-set` | FB_IMG_1764220391080.jpg | Knobel Set main |
| `toiletry-bag-basic` | IMG-20260217-WA0036.jpg | Basic Toiletry Bag main |
| `toiletry-bag-high-end` | s14_Picture3.jpg | High-End Toiletry Bag main (catalogue photo) |
| `toiletry-bag-high-end-hanging` | s14_Picture6.jpg | High-End Toiletry Bag extra (catalogue photo) |
| `deskpad` | IMG-20260211-WA0003(1).jpg | Deskpad main; hero slide 3 |
| `deskpad-branding` | IMG-20260211-WA0000(1).jpg | Deskpad extra; corporate section |
| `wine-caddy` | IMG-20260128-WA0017.jpg | Single Wine Caddy main |
| `wine-caddy-branded` | IMG-20250902-WA0001.jpg | Wine Caddy extra; corporate section |
| `weekender-bag` | FB_IMG_1750156032351.jpg | Weekender Bag main |
| `laptop-bag` | IMG-20251028-WA0017.jpg | Laptop Bag main |
| `laptop-bag-interior` | IMG-20251028-WA0014.jpg | Laptop Bag extra |
| `smart-wallet` | s19_Picture3.jpg | Smart Wallet main (catalogue photo) |
| `smart-wallet-cards` | s19_Picture6.jpg | Smart Wallet extra (catalogue photo) |
| `custom-named-covers` | FB_IMG_1784198751634.jpg | Home custom section; Custom gallery |
| `custom-portrait-engraving` | IMG-20260729-WA0041.jpg | Custom gallery |
| `custom-zebra-hide-cover` | IMG-20260804-WA0033.jpg | Custom gallery |
| `custom-games-case` | IMG-20260701-WA0014.jpg | Custom gallery |
| `custom-shaped-keyring` | IMG-20260902-WA0001(1).jpg | Custom gallery |
| `corporate-branded-keyrings` | IMG-20260408-WA0009(1).jpg | Products + Custom Orders corporate sections |
| `story-leather-hide` | IMG-20260915-WA0063.jpg | Home "Made here" statement; Our Story "How it started" |
| `story-travel` | FB_IMG_1784198738430.jpg | Home purpose preview; Our Story "Why Vrijheid" |
| `story-everyday` | IMG-20251028-WA0013.jpg | Our Story "Built for people" |
