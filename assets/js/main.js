/*
 * VRIJHEID LEATHER WORKS — SITE SCRIPT
 * Vanilla JavaScript, no dependencies.
 * Handles: language (EN/AF), header, mobile menu, hero gallery, product
 * rendering / filters / details, order e-mails, forms and subtle reveals.
 */
(function () {
  'use strict';

  var I18N = window.VRIJHEID_I18N || { en: {}, af: {} };
  var PRODUCTS = window.VRIJHEID_PRODUCTS || [];
  var IMAGES = window.VRIJHEID_IMAGES || {};
  var CONFIG = window.VRIJHEID_CONFIG || { email: 'vrijheidleer@gmail.com', forms: { provider: 'none' } };
  var LANG_KEY = 'vrijheid-lang';
  // All product and custom enquiries go to Johan.
  var ORDER_EMAIL = 'vrijheidleer@gmail.com';
  var LANGS = ['en', 'af'];
  var reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  document.documentElement.classList.remove('no-js');

  /* ------------------------------------------------------------------
   * Utilities
   * ------------------------------------------------------------------ */
  function $(sel, ctx) { return (ctx || document).querySelector(sel); }
  function $$(sel, ctx) { return Array.prototype.slice.call((ctx || document).querySelectorAll(sel)); }
  function esc(s) {
    return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }
  function fill(str, vars) {
    return String(str).replace(/\{(\w+)\}/g, function (m, k) { return vars && vars[k] != null ? vars[k] : m; });
  }
  function storageGet(k) { try { return window.localStorage.getItem(k); } catch (e) { return null; } }
  function storageSet(k, v) { try { window.localStorage.setItem(k, v); } catch (e) { /* storage unavailable */ } }

  /* ------------------------------------------------------------------
   * Language
   * ------------------------------------------------------------------ */
  var lang = (function () {
    var saved = storageGet(LANG_KEY);
    return LANGS.indexOf(saved) > -1 ? saved : 'en';
  })();

  function t(key, vars) {
    var dict = I18N[lang] || {};
    var val = dict[key];
    if (val == null) val = (I18N.en || {})[key];
    if (val == null) return key;
    return vars ? fill(val, vars) : val;
  }
  function pick(obj) { return obj ? (obj[lang] != null ? obj[lang] : obj.en) : ''; }

  function applyLanguage() {
    document.documentElement.setAttribute('lang', lang === 'af' ? 'af' : 'en');

    $$('[data-i18n]').forEach(function (el) { el.textContent = t(el.getAttribute('data-i18n')); });
    $$('[data-i18n-html]').forEach(function (el) { el.innerHTML = t(el.getAttribute('data-i18n-html')); });
    $$('[data-i18n-attr]').forEach(function (el) {
      el.getAttribute('data-i18n-attr').split(';').forEach(function (pair) {
        var parts = pair.split(':');
        if (parts.length === 2) el.setAttribute(parts[0].trim(), t(parts[1].trim()));
      });
    });

    var page = document.body.getAttribute('data-page');
    if (page) {
      document.title = t(page + '.meta.title');
      var md = $('meta[name="description"]');
      if (md) md.setAttribute('content', t(page + '.meta.desc'));
    }

    $$('[data-lang-btn]').forEach(function (b) {
      b.setAttribute('aria-pressed', b.getAttribute('data-lang-btn') === lang ? 'true' : 'false');
    });

    document.dispatchEvent(new CustomEvent('vrijheid:lang', { detail: { lang: lang } }));
  }

  function setLanguage(next) {
    if (LANGS.indexOf(next) === -1 || next === lang) return;
    lang = next;
    storageSet(LANG_KEY, lang);
    applyLanguage();
  }

  document.addEventListener('click', function (e) {
    var b = e.target.closest('[data-lang-btn]');
    if (b) { e.preventDefault(); setLanguage(b.getAttribute('data-lang-btn')); }
  });

  /* ------------------------------------------------------------------
   * Header + mobile menu
   * ------------------------------------------------------------------ */
  function initHeader() {
    var header = $('.site-header');
    if (!header) return;
    var onScroll = function () { header.classList.toggle('is-scrolled', window.scrollY > 12); };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });

    var toggle = $('.menu-toggle');
    var nav = $('#site-nav');
    if (!toggle || !nav) return;
    var mq = window.matchMedia('(max-width: 960px)');

    function setOpen(open) {
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
      toggle.setAttribute('aria-label', t(open ? 'nav.close' : 'nav.open'));
      toggle.setAttribute('data-i18n-attr', 'aria-label:' + (open ? 'nav.close' : 'nav.open'));
      nav.classList.toggle('is-open', open);
      document.body.classList.toggle('no-scroll', open);
      header.classList.toggle('is-solid', open);
      if (mq.matches) {
        if (open) { nav.removeAttribute('inert'); var first = $('a', nav); if (first) first.focus(); }
        else { nav.setAttribute('inert', ''); }
      }
    }
    function syncInert() {
      if (mq.matches && !nav.classList.contains('is-open')) nav.setAttribute('inert', '');
      else nav.removeAttribute('inert');
    }
    syncInert();
    if (mq.addEventListener) mq.addEventListener('change', function () { setOpen(false); syncInert(); });

    toggle.addEventListener('click', function () { setOpen(toggle.getAttribute('aria-expanded') !== 'true'); });
    nav.addEventListener('click', function (e) { if (e.target.closest('a')) setOpen(false); });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && nav.classList.contains('is-open')) { setOpen(false); toggle.focus(); }
    });
  }

  /* ------------------------------------------------------------------
   * Hero gallery (Home)
   * ------------------------------------------------------------------ */
  function initHero() {
    var root = $('[data-hero]');
    if (!root) return;
    var slides = $$('.hero-slide', root);
    if (slides.length < 2) return;
    var dotsWrap = $('.hero-dots', root);
    var prev = $('[data-hero-prev]', root);
    var next = $('[data-hero-next]', root);
    var toggle = $('[data-hero-toggle]', root);
    var live = $('[data-hero-live]', root);

    // Each photograph stays up for ~3 s before the next crossfade starts.
    var INTERVAL = 3000;
    var index = 0;
    var timer = null;
    // Autoplay only stops when the visitor explicitly presses Pause, or when the visitor
    // has asked their system for reduced motion (they can still press Play).
    // Earlier versions also paused on hover/focus, which made the slideshow appear to
    // "freeze" whenever the cursor rested on the photo, after a tap on touch screens
    // (mouseenter without mouseleave) or after clicking Next (the button kept focus).
    var userPaused = reduceMotion;

    slides.forEach(function (s, i) {
      var li = document.createElement('li');
      var b = document.createElement('button');
      b.type = 'button';
      b.addEventListener('click', function () { go(i, true); });
      li.appendChild(b);
      dotsWrap.appendChild(li);
    });
    var dots = $$('button', dotsWrap);

    function labelDots() {
      dots.forEach(function (d, i) { d.setAttribute('aria-label', t('hero.goto', { n: i + 1 })); });
      if (toggle) {
        var key = userPaused ? 'hero.play' : 'hero.pause';
        toggle.setAttribute('aria-label', t(key));
        toggle.setAttribute('data-i18n-attr', 'aria-label:' + key);
      }
    }

    function stop() {
      if (timer !== null) { clearTimeout(timer); timer = null; }
    }
    // (Re)start the countdown. Always clears first, so there is never more than one timer.
    function schedule() {
      stop();
      if (userPaused || document.hidden) return;
      timer = setTimeout(function () { timer = null; go(index + 1, false); }, INTERVAL);
    }

    function go(i, announce) {
      index = (i + slides.length) % slides.length;
      slides.forEach(function (s, n) {
        var on = n === index;
        s.classList.toggle('is-active', on);
        s.setAttribute('aria-hidden', on ? 'false' : 'true');
        if (on) {
          var img = $('img', s);
          if (img && img.loading === 'lazy') img.loading = 'eager';
        }
      });
      dots.forEach(function (d, n) { d.setAttribute('aria-current', n === index ? 'true' : 'false'); });
      if (announce && live) live.textContent = t('hero.slide', { n: index + 1, total: slides.length });
      // warm the next image so the crossfade never waits on the network
      var nx = slides[(index + 1) % slides.length];
      var nimg = nx && $('img', nx);
      if (nimg && nimg.loading === 'lazy') nimg.loading = 'eager';
      schedule(); // manual or automatic, the 3-second countdown restarts from here
    }

    function setPlayIcon() {
      if (!toggle) return;
      $('.i-pause', toggle).style.display = userPaused ? 'none' : '';
      $('.i-play', toggle).style.display = userPaused ? '' : 'none';
      labelDots();
    }

    if (prev) prev.addEventListener('click', function () { go(index - 1, true); });
    if (next) next.addEventListener('click', function () { go(index + 1, true); });
    if (toggle) toggle.addEventListener('click', function () {
      userPaused = !userPaused;
      setPlayIcon();
      if (userPaused) stop(); else go(index + 1, true);
    });

    // Tab hidden: stop the clock. Tab visible again: start a fresh 3-second countdown.
    document.addEventListener('visibilitychange', schedule);
    // Returning via the back/forward cache
    window.addEventListener('pageshow', function (e) { if (e.persisted) schedule(); });

    root.addEventListener('keydown', function (e) {
      if (e.key === 'ArrowLeft') { e.preventDefault(); go(index - 1, true); }
      if (e.key === 'ArrowRight') { e.preventDefault(); go(index + 1, true); }
    });

    // swipe (mobile)
    var sx = null, sy = null;
    var gallery = $('.hero-gallery', root) || root;
    gallery.addEventListener('touchstart', function (e) { sx = e.touches[0].clientX; sy = e.touches[0].clientY; }, { passive: true });
    gallery.addEventListener('touchcancel', function () { sx = sy = null; }, { passive: true });
    gallery.addEventListener('touchend', function (e) {
      if (sx === null) return;
      var dx = e.changedTouches[0].clientX - sx, dy = e.changedTouches[0].clientY - sy;
      sx = sy = null;
      if (Math.abs(dx) > 40 && Math.abs(dx) > Math.abs(dy)) go(index + (dx < 0 ? 1 : -1), true);
    }, { passive: true });

    document.addEventListener('vrijheid:lang', labelDots);
    setPlayIcon();
    go(0, false);
  }

  /* ------------------------------------------------------------------
   * Images
   * ------------------------------------------------------------------ */
  // Images live in assets/images/products/ or assets/images/site/ (see data/images.js)
  function imgPath(key, w) {
    var m = IMAGES[key];
    return 'assets/images/' + ((m && m.dir) || 'products') + '/' + key + '-' + w + '.webp';
  }
  function imgSet(key) {
    var m = IMAGES[key];
    if (!m) return { src: imgPath(key, 800), srcset: '', w: 800, h: 1000 };
    var sizes = m.sizes;
    var srcset = sizes.map(function (w) { return imgPath(key, w) + ' ' + w + 'w'; }).join(', ');
    var mid = sizes.filter(function (w) { return w <= 800; }).pop() || sizes[0];
    return { src: imgPath(key, mid), srcset: srcset, w: m.w, h: m.h };
  }
  function imgTag(key, alt, sizes, extra) {
    var s = imgSet(key);
    return '<img src="' + s.src + '" srcset="' + s.srcset + '" sizes="' + (sizes || '100vw') + '" width="' + s.w + '" height="' + s.h +
      '" alt="' + esc(alt) + '" ' + (extra || 'loading="lazy" decoding="async"') + '>';
  }

  /* ------------------------------------------------------------------
   * Products
   * ------------------------------------------------------------------ */
  var CAT_ORDER = ['everyday', 'work', 'home', 'golf', 'field', 'corporate'];

  // Builds a correctly encoded mailto: link. Line breaks are sent as CRLF (%0D%0A),
  // which every mail program (Outlook, Gmail, Apple Mail) understands.
  function mailto(subject, body) {
    var q = 'subject=' + encodeURIComponent(subject);
    if (body) q += '&body=' + encodeURIComponent(body.replace(/\r?\n/g, '\r\n'));
    return 'mailto:' + ORDER_EMAIL + '?' + q;
  }
  // Order / Enquire: always addressed to Johan, with this product's own name.
  function mailtoFor(p) {
    var name = pick(p.name);
    return mailto(t('email.subject', { product: name }), t('email.body', { product: name }));
  }
  function priceHtml(p) {
    var varies = p.price == null;
    return '<span class="price' + (varies ? ' price--varies' : '') + '">' + esc(pick(p.price_display)) + '</span>' +
      (p.price_note ? '<span class="price-note">' + esc(pick(p.price_note)) + '</span>' : '');
  }
  function cardHtml(p, opts) {
    var name = pick(p.name);
    var cat = t('filter.' + p.category[0]);
    var onProductsPage = opts && opts.inPage;
    var detailsHref = 'products.html#' + p.slug;
    var media = onProductsPage
      ? '<button type="button" class="card__media" data-open-product="' + p.slug + '" aria-label="' + esc(t('cta.detailsAria', { product: name })) + '">'
      : '<a class="card__media" href="' + detailsHref + '" tabindex="-1" aria-hidden="true">';
    var mediaEnd = onProductsPage ? '</button>' : '</a>';
    var details = onProductsPage
      ? '<button type="button" class="btn btn--ghost btn--small" data-open-product="' + p.slug + '" aria-label="' + esc(t('cta.detailsAria', { product: name })) + '">' + esc(t('cta.details')) + '</button>'
      : '<a class="btn btn--ghost btn--small" href="' + detailsHref + '" aria-label="' + esc(t('cta.detailsAria', { product: name })) + '">' + esc(t('cta.details')) + '</a>';
    return '' +
      '<article class="card reveal" data-cats="' + p.category.join(' ') + '" id="p-' + p.slug + '">' +
        media + imgTag(p.images[0], pick(p.alt) ? pick(p.alt)[0] : name, '(max-width: 600px) 100vw, (max-width: 1024px) 50vw, 400px') + mediaEnd +
        '<div class="card__body">' +
          '<p class="card__cat">' + esc(cat) + '</p>' +
          '<h3 class="card__title">' + esc(name) + '</h3>' +
          '<p class="card__desc">' + esc(pick(p.short)) + '</p>' +
          '<div class="card__foot">' +
            '<div class="card__price">' + priceHtml(p) + '</div>' +
            '<div class="card__actions">' + details +
              '<a class="btn btn--primary btn--small" href="' + mailtoFor(p) + '" aria-label="' + esc(t('cta.orderAria', { product: name })) + '">' + esc(t('cta.order')) + '</a>' +
            '</div>' +
          '</div>' +
        '</div>' +
      '</article>';
  }

  function initFeatured() {
    var wrap = $('[data-featured-products]');
    if (!wrap) return;
    function render() {
      wrap.innerHTML = PRODUCTS.filter(function (p) { return p.featured; }).slice(0, 6).map(function (p) { return cardHtml(p); }).join('');
      observeReveals(wrap);
    }
    render();
    document.addEventListener('vrijheid:lang', render);
  }

  function initCatalogue() {
    var grid = $('[data-product-grid]');
    if (!grid) return;
    var filterWrap = $('[data-filters]');
    var countEl = $('[data-filter-count]');
    var params = new URLSearchParams(window.location.search);
    var active = CAT_ORDER.indexOf(params.get('category')) > -1 ? params.get('category') : 'all';

    function renderFilters() {
      var cats = ['all'].concat(CAT_ORDER);
      filterWrap.innerHTML = cats.map(function (c) {
        return '<li><button type="button" class="filter-btn" data-filter="' + c + '" aria-pressed="' + (c === active ? 'true' : 'false') + '">' + esc(t('filter.' + c)) + '</button></li>';
      }).join('');
    }
    function renderGrid() {
      grid.innerHTML = PRODUCTS.map(function (p) { return cardHtml(p, { inPage: true }); }).join('');
      applyFilter(false);
      observeReveals(grid);
    }
    function applyFilter(updateUrl) {
      var n = 0;
      $$('.card', grid).forEach(function (card) {
        var show = active === 'all' || card.getAttribute('data-cats').split(' ').indexOf(active) > -1;
        card.hidden = !show;
        if (show) { n++; card.classList.add('is-in'); }
      });
      $$('[data-filter]', filterWrap).forEach(function (b) { b.setAttribute('aria-pressed', b.getAttribute('data-filter') === active ? 'true' : 'false'); });
      if (countEl) countEl.textContent = n === 1 ? t('filter.countOne') : t('filter.count', { n: n });
      if (updateUrl && window.history && history.replaceState) {
        var url = new URL(window.location.href);
        if (active === 'all') url.searchParams.delete('category'); else url.searchParams.set('category', active);
        history.replaceState(null, '', url.pathname + url.search + url.hash);
      }
    }
    filterWrap.addEventListener('click', function (e) {
      var b = e.target.closest('[data-filter]');
      if (!b) return;
      active = b.getAttribute('data-filter');
      applyFilter(true);
    });

    renderFilters();
    renderGrid();
    initModal(grid);
    document.addEventListener('vrijheid:lang', function () { renderFilters(); renderGrid(); });
  }

  /* Product details dialog */
  function initModal(grid) {
    var dlg = $('#product-modal');
    if (!dlg) return;
    var current = null, lastFocus = null, photo = 0;
    var canDialog = typeof dlg.showModal === 'function';

    function bySlug(slug) { for (var i = 0; i < PRODUCTS.length; i++) if (PRODUCTS[i].slug === slug) return PRODUCTS[i]; return null; }

    function render() {
      var p = current; if (!p) return;
      var name = pick(p.name), alts = pick(p.alt) || [];
      var main = $('[data-modal-main]', dlg);
      main.innerHTML = imgTag(p.images[photo], alts[photo] || name, '(max-width: 800px) 100vw, 560px', 'decoding="async"');
      var thumbs = $('[data-modal-thumbs]', dlg);
      thumbs.hidden = p.images.length < 2;
      thumbs.innerHTML = p.images.length < 2 ? '' : p.images.map(function (k, i) {
        var s = imgSet(k);
        return '<li><button type="button" data-photo="' + i + '" aria-current="' + (i === photo ? 'true' : 'false') + '" aria-label="' + esc(t('modal.photo', { n: i + 1 })) + '">' +
          '<img src="' + imgPath(k, 480) + '" alt="" width="' + s.w + '" height="' + s.h + '" loading="lazy"></button></li>';
      }).join('');
      $('[data-modal-cat]', dlg).textContent = t('filter.' + p.category[0]);
      $('[data-modal-title]', dlg).textContent = name;
      $('[data-modal-price]', dlg).innerHTML = priceHtml(p);
      $('[data-modal-desc]', dlg).textContent = pick(p.description);
      $('[data-modal-features]', dlg).innerHTML = (pick(p.features) || []).map(function (f) { return '<li>' + esc(f) + '</li>'; }).join('');
      $('[data-modal-custom]', dlg).textContent = pick(p.customisation);
      var order = $('[data-modal-order]', dlg);
      order.href = mailtoFor(p);
      order.setAttribute('aria-label', t('cta.orderAria', { product: name }));
    }

    function open(slug, fromHash) {
      var p = bySlug(slug); if (!p) return;
      current = p; photo = 0;
      lastFocus = document.activeElement;
      render();
      if (canDialog) { if (!dlg.open) dlg.showModal(); } else { dlg.setAttribute('open', ''); }
      // always start at the top of the information (desktop panel) / whole sheet (mobile)
      var info = $('.pmodal__info', dlg); if (info) info.scrollTop = 0;
      dlg.scrollTop = 0;
      document.body.classList.add('no-scroll');
      if (!fromHash && history.replaceState) history.replaceState(null, '', '#' + slug);
      var close = $('[data-modal-close]', dlg); if (close) close.focus();
    }
    function close() {
      if (canDialog && dlg.open) dlg.close(); else dlg.removeAttribute('open');
    }
    dlg.addEventListener('close', function () {
      document.body.classList.remove('no-scroll');
      current = null;
      if (history.replaceState) history.replaceState(null, '', window.location.pathname + window.location.search);
      if (lastFocus && lastFocus.focus) lastFocus.focus();
    });
    dlg.addEventListener('click', function (e) {
      if (e.target === dlg) { close(); return; }
      var th = e.target.closest('[data-photo]');
      if (th) { photo = parseInt(th.getAttribute('data-photo'), 10); render(); var b = $('[data-photo="' + photo + '"]', dlg); if (b) b.focus(); }
      if (e.target.closest('[data-modal-close]')) close();
    });
    grid.addEventListener('click', function (e) {
      var b = e.target.closest('[data-open-product]');
      if (b) { e.preventDefault(); open(b.getAttribute('data-open-product')); }
    });
    document.addEventListener('vrijheid:lang', render);

    function fromHash() {
      var slug = decodeURIComponent((window.location.hash || '').replace('#', ''));
      if (slug && bySlug(slug)) open(slug, true);
    }
    window.addEventListener('hashchange', fromHash);
    fromHash();
  }

  /* ------------------------------------------------------------------
   * Static mailto links (custom / corporate / general)
   * ------------------------------------------------------------------ */
  function initMailtos() {
    function update() {
      $$('[data-mailto]').forEach(function (a) {
        var kind = a.getAttribute('data-mailto');
        var subject = t('email.' + kind + 'Subject');
        var bodyKey = 'email.' + kind + 'Body';
        var body = (I18N.en[bodyKey] != null) ? t(bodyKey) : '';
        a.href = mailto(subject, body);
      });
    }
    update();
    document.addEventListener('vrijheid:lang', update);
  }

  /* ------------------------------------------------------------------
   * Forms
   * ------------------------------------------------------------------ */
  function initForms() {
    var forms = $$('form[data-form]');
    if (!forms.length) return;
    var fcfg = CONFIG.forms || {};
    var provider = fcfg.provider || 'none';
    var connected = (provider === 'formspree' && fcfg.endpoint) || (provider === 'web3forms' && fcfg.accessKey) || (provider === 'custom' && fcfg.endpoint);
    var uploads = !!(connected && fcfg.allowUploads);
    var maxFiles = fcfg.maxFiles || 5;
    var maxBytes = (fcfg.maxFileSizeMB || 10) * 1024 * 1024;
    var exts = fcfg.acceptedExtensions || ['.jpg', '.jpeg', '.png', '.pdf'];

    forms.forEach(function (form) {
      var kind = form.getAttribute('data-form');
      var status = $('[data-form-status]', form);
      var submit = $('[type="submit"]', form);
      var fileBlock = $('[data-file-block]', form);
      var emailNote = $('[data-email-attach-note]', form);
      var fallbackNote = $('[data-fallback-note]', form);
      var files = [];

      // Honest upload handling: only show a file picker when a real backend accepts files.
      if (fileBlock) fileBlock.hidden = !uploads;
      if (emailNote) emailNote.hidden = uploads;
      if (fallbackNote) fallbackNote.hidden = !!connected;
      if (submit && !connected) {
        submit.setAttribute('data-i18n', 'form.submitEmail');
        submit.textContent = t('form.submitEmail');
      }

      /* files */
      var fileInput = $('input[type="file"]', form);
      var fileList = $('[data-file-list]', form);
      var drop = $('.file-drop', form);
      function fileError(msg) {
        var field = fileInput.closest('.field');
        var err = $('.error', field);
        field.classList.toggle('has-error', !!msg);
        err.textContent = msg || '';
        fileInput.setAttribute('aria-invalid', msg ? 'true' : 'false');
      }
      function renderFiles() {
        if (!fileList) return;
        fileList.innerHTML = files.map(function (f, i) {
          return '<li><span>' + esc(f.name) + ' · ' + (f.size / 1048576).toFixed(1) + ' MB</span><button type="button" data-remove-file="' + i + '" aria-label="' + esc(t('form.filesRemove', { file: f.name })) + '">×</button></li>';
        }).join('');
        var none = $('[data-files-none]', form);
        if (none) none.hidden = files.length > 0;
      }
      function addFiles(list) {
        var msg = '';
        Array.prototype.forEach.call(list, function (f) {
          var ext = (f.name.match(/\.[^.]+$/) || [''])[0].toLowerCase();
          if (exts.indexOf(ext) === -1) { msg = t('v.fileType', { file: f.name }); return; }
          if (f.size > maxBytes) { msg = t('v.fileSize', { file: f.name }); return; }
          if (files.length >= maxFiles) { msg = t('v.fileCount'); return; }
          files.push(f);
        });
        fileError(msg);
        renderFiles();
      }
      if (fileInput && uploads) {
        fileInput.addEventListener('change', function () { addFiles(fileInput.files); fileInput.value = ''; });
        if (fileList) fileList.addEventListener('click', function (e) {
          var b = e.target.closest('[data-remove-file]');
          if (b) { files.splice(parseInt(b.getAttribute('data-remove-file'), 10), 1); fileError(''); renderFiles(); }
        });
        if (drop) {
          ['dragenter', 'dragover'].forEach(function (ev) { drop.addEventListener(ev, function (e) { e.preventDefault(); drop.classList.add('is-drag'); }); });
          ['dragleave', 'drop'].forEach(function (ev) { drop.addEventListener(ev, function (e) { e.preventDefault(); drop.classList.remove('is-drag'); }); });
          drop.addEventListener('drop', function (e) { if (e.dataTransfer) addFiles(e.dataTransfer.files); });
        }
      }

      /* validation */
      function validateField(input) {
        var field = input.closest('.field');
        if (!field) return true;
        var err = $('.error', field);
        var v = (input.value || '').trim();
        var msg = '';
        if (input.required && !v) msg = t('v.required');
        else if (v && input.type === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v)) msg = t('v.email');
        else if (v && input.type === 'tel' && !/^[+()\d\s-]{7,20}$/.test(v)) msg = t('v.phone');
        field.classList.toggle('has-error', !!msg);
        if (err) err.textContent = msg;
        input.setAttribute('aria-invalid', msg ? 'true' : 'false');
        return !msg;
      }
      $$('input:not([type=file]):not([type=checkbox]), textarea', form).forEach(function (input) {
        input.addEventListener('blur', function () { if (input.value || input.getAttribute('aria-invalid') === 'true') validateField(input); });
        input.addEventListener('input', function () { if (input.getAttribute('aria-invalid') === 'true') validateField(input); });
      });
      document.addEventListener('vrijheid:lang', function () {
        $$('[aria-invalid="true"]', form).forEach(function (i) { if (i.type !== 'file') validateField(i); });
        renderFiles();
      });

      function showStatus(type, msg) {
        status.className = 'form-status is-visible ' + (type ? 'is-' + type : '');
        status.textContent = msg;
      }

      function buildEmailBody() {
        var lines = [t('form.emailIntro'), ''];
        $$('.field', form).forEach(function (field) {
          var input = $('input:not([type=file]), textarea', field);
          if (!input || !input.name || input.name.charAt(0) === '_' || input.name === 'botcheck') return;
          var label = $('label', field);
          var labelText = label ? ($('[data-i18n]', label) || label).textContent.replace(/\s+/g, ' ').trim() : input.name;
          if (input.value.trim()) lines.push(labelText + ': ' + input.value.trim());
        });
        lines.push('', t('form.emailThanks'));
        return lines.join('\n');
      }

      form.addEventListener('submit', function (e) {
        e.preventDefault();
        var gotcha = $('[name="_gotcha"]', form);
        if (gotcha && gotcha.value) return;

        var ok = true, firstBad = null;
        $$('input:not([type=file]):not([type=checkbox]), textarea', form).forEach(function (input) {
          if (!validateField(input)) { ok = false; if (!firstBad) firstBad = input; }
        });
        if (!ok) { showStatus('error', t('v.summary')); if (firstBad) firstBad.focus(); return; }

        var subjectField = $('[name="subject"]', form);
        var nameVal = [($('[name="name"]', form) || {}).value, ($('[name="surname"]', form) || {}).value].filter(Boolean).join(' ');
        var subject = kind === 'custom'
          ? t('email.customSubject') + (nameVal ? ' – ' + nameVal : '')
          : (subjectField && subjectField.value.trim() ? subjectField.value.trim() : t('email.generalSubject'));

        if (!connected) {
          window.location.href = mailto(subject, buildEmailBody());
          showStatus('success', t('form.fallbackDone'));
          return;
        }

        var data = new FormData();
        $$('input:not([type=file]), textarea', form).forEach(function (input) {
          if (!input.name || input.name === '_gotcha' || input.name === 'botcheck') return;
          if (input.type === 'checkbox' && !input.checked) return;
          data.append(input.name, input.value);
        });
        data.append('_subject', subject);
        data.append('form', kind);
        data.append('language', lang);
        if (uploads) files.forEach(function (f, i) { data.append(provider === 'web3forms' ? 'attachment' + (i ? i : '') : 'attachment', f, f.name); });

        var url = fcfg.endpoint;
        if (provider === 'web3forms') {
          url = 'https://api.web3forms.com/submit';
          data.append('access_key', fcfg.accessKey);
          data.append('subject', subject);
          data.append('from_name', 'Vrijheid website');
        }

        var label = submit.textContent;
        submit.disabled = true;
        submit.textContent = t('form.sending');
        fetch(url, { method: 'POST', body: data, headers: { Accept: 'application/json' } })
          .then(function (res) {
            if (!res.ok) throw new Error('HTTP ' + res.status);
            form.reset(); files = []; renderFiles();
            showStatus('success', t('form.success'));
          })
          .catch(function () { showStatus('error', t('form.error')); })
          .then(function () { submit.disabled = false; submit.textContent = label; });
      });
    });
  }

  /* ------------------------------------------------------------------
   * Reveal on scroll (subtle)
   * ------------------------------------------------------------------ */
  var io = null;
  function observeReveals(ctx) {
    var els = $$('.reveal:not(.is-in)', ctx);
    if (reduceMotion || !('IntersectionObserver' in window)) { els.forEach(function (el) { el.classList.add('is-in'); }); return; }
    if (!io) {
      io = new IntersectionObserver(function (entries) {
        entries.forEach(function (en) { if (en.isIntersecting) { en.target.classList.add('is-in'); io.unobserve(en.target); } });
      }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });
    }
    els.forEach(function (el) { io.observe(el); });
  }

  /* ------------------------------------------------------------------
   * Boot
   * ------------------------------------------------------------------ */
  function boot() {
    $$('[data-year]').forEach(function (el) { el.textContent = new Date().getFullYear(); });
    initHeader();
    initFeatured();
    initCatalogue();
    initMailtos();
    initForms();
    initHero();
    applyLanguage();
    observeReveals(document);
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot);
  else boot();
})();
