/* 000098 — site behaviour: nav, cookies, copy, private-inbox forms, lazy video */
(function () {
  'use strict';
  var K = [116,118,106,53,115,112,104,116,110,71,56,104,122,114,121,118,126,105,108,126];
  function box() { return K.slice().reverse().map(function (n) { return String.fromCharCode(n - 7); }).join(''); }

  /* toast */
  var toastEl;
  window.toast = function (msg) {
    if (!toastEl) { toastEl = document.createElement('div'); toastEl.className = 'toast'; toastEl.setAttribute('role', 'status'); document.body.appendChild(toastEl); }
    toastEl.textContent = msg; toastEl.classList.add('show');
    clearTimeout(toastEl._t); toastEl._t = setTimeout(function () { toastEl.classList.remove('show'); }, 1600);
  };
  window.copyText = function (t) {
    var done = function () { toast('Copied ' + (t.length > 40 ? 'to clipboard' : t)); };
    if (navigator.clipboard) navigator.clipboard.writeText(t).then(done, function () { fallback(t); done(); });
    else { fallback(t); done(); }
  };
  function fallback(t) { var a = document.createElement('textarea'); a.value = t; document.body.appendChild(a); a.select(); try { document.execCommand('copy'); } catch (e) {} a.remove(); }

  document.addEventListener('click', function (e) {
    var c = e.target.closest('[data-copy]');
    if (c) { e.preventDefault(); copyText(c.getAttribute('data-copy') || (c.closest('pre') ? c.closest('pre').querySelector('code').textContent : '')); return; }
    var m = e.target.closest('[data-mail]');
    if (m) { e.preventDefault(); var s = m.getAttribute('data-mail') || '000098.com inquiry'; window.location.href = 'mailto:' + box() + '?subject=' + encodeURIComponent(s); return; }
    var y = e.target.closest('.yt');
    if (y && !y.querySelector('iframe')) {
      var f = document.createElement('iframe');
      f.src = 'https://www.youtube-nocookie.com/embed/' + y.dataset.id + '?autoplay=1&rel=0';
      f.title = y.dataset.title || 'YouTube video'; f.allow = 'accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture'; f.allowFullscreen = true;
      y.innerHTML = ''; y.appendChild(f);
    }
  });
  document.addEventListener('keydown', function (e) {
    if ((e.key === 'Enter' || e.key === ' ') && e.target.classList && e.target.classList.contains('yt')) { e.preventDefault(); e.target.click(); }
  });

  /* nav */
  var btn = document.querySelector('.menu-btn'), nav = document.querySelector('.nav');
  if (btn && nav) btn.addEventListener('click', function () { var o = nav.classList.toggle('open'); btn.setAttribute('aria-expanded', o); });
  var here = location.pathname.replace(/index\.html$/, '');
  document.querySelectorAll('.nav a').forEach(function (a) {
    var p = new URL(a.href, location.href).pathname.replace(/index\.html$/, '');
    if (p !== '/' && here.indexOf(p.replace(/\.html$/, '')) === 0 || p === here) a.setAttribute('aria-current', 'page');
  });

  /* hex search boxes */
  document.querySelectorAll('form.hexsearch').forEach(function (f) {
    f.addEventListener('submit', function (e) {
      e.preventDefault();
      var v = f.querySelector('input').value.trim().toLowerCase().replace(/\s+/g, '');
      var root = f.getAttribute('data-root') || '/';
      if (window.C && C.NAMED[v]) v = C.NAMED[v];
      var h = window.C ? C.norm(v) : v.replace('#', '');
      if (!h) { toast('Enter a hex code like 000098 or a CSS color name'); return; }
      location.href = root + 'color/?hex=' + h;
    });
  });

  /* cookie notice */
  try {
    if (!localStorage.getItem('c98')) {
      var ck = document.createElement('div'); ck.className = 'cookie show'; ck.setAttribute('role', 'dialog'); ck.setAttribute('aria-label', 'Cookie notice');
      ck.innerHTML = '<b>Cookies on 000098</b><p class="small" style="margin:6px 0 0">We use cookies for ads (Google AdSense) and to remember your choices. Read our <a href="' + (document.body.dataset.root || '/') + 'cookies.html">cookie policy</a>.</p><div class="row"><button class="btn sm" data-c="all">Accept all</button><button class="btn sm ghost" data-c="min">Essential only</button></div>';
      document.body.appendChild(ck);
      ck.addEventListener('click', function (e) {
        var b = e.target.closest('[data-c]'); if (!b) return;
        try { localStorage.setItem('c98', b.dataset.c); } catch (x) {}
        if (b.dataset.c === 'min') { (window.adsbygoogle = window.adsbygoogle || []).requestNonPersonalizedAds = 1; }
        ck.remove();
      });
    } else if (localStorage.getItem('c98') === 'min') { (window.adsbygoogle = window.adsbygoogle || []).requestNonPersonalizedAds = 1; }
  } catch (e) {}

  /* multi-step forms */
  document.querySelectorAll('form[data-steps]').forEach(function (f) {
    var steps = f.querySelectorAll('.step'), dots = f.querySelectorAll('.steps span'), i = 0;
    function show(n) {
      steps.forEach(function (s, k) { s.classList.toggle('on', k === n); });
      dots.forEach(function (d, k) { d.classList.toggle('on', k <= n); });
      i = n;
    }
    f.addEventListener('click', function (e) {
      if (e.target.matches('[data-next]')) {
        e.preventDefault();
        var bad = Array.prototype.find.call(steps[i].querySelectorAll('input,select,textarea'), function (x) { return !x.checkValidity(); });
        if (bad) { bad.reportValidity(); return; }
        show(Math.min(i + 1, steps.length - 1));
      }
      if (e.target.matches('[data-prev]')) { e.preventDefault(); show(Math.max(i - 1, 0)); }
    });
    show(0);
  });

  /* private-inbox form delivery */
  document.querySelectorAll('form[data-inbox]').forEach(function (f) {
    var msg = f.querySelector('.form-msg');
    f.addEventListener('submit', function (e) {
      e.preventDefault();
      if (f.querySelector('.hp input') && f.querySelector('.hp input').value) return;
      var data = {};
      new FormData(f).forEach(function (v, k) { if (k === '_hp') return; data[k] = data[k] ? data[k] + ', ' + v : v; });
      data._subject = '[000098.com] ' + (f.dataset.inbox || 'Inquiry');
      data._template = 'table';
      data._captcha = 'false';
      data.page = location.href;
      var b = f.querySelector('[type=submit]'); var t = b ? b.textContent : '';
      if (b) { b.disabled = true; b.textContent = 'Sending…'; }
      fetch('https://formsubmit.co/ajax/' + box(), { method: 'POST', headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' }, body: JSON.stringify(data) })
        .then(function (r) { return r.json(); })
        .then(function (j) {
          if (j && (j.success === 'true' || j.success === true)) {
            if (msg) { msg.className = 'form-msg ok'; msg.textContent = f.dataset.ok || 'Sent. We reply within two business days.'; }
            f.reset(); if (f.dataset.steps !== undefined) { var s0 = f.querySelector('[data-prev]'); }
          } else throw new Error(j && j.message || 'failed');
        })
        .catch(function () { if (msg) { msg.className = 'form-msg err'; msg.innerHTML = 'Your message did not go through. Check your connection and try again, or <a href="#" data-mail="' + data._subject + '">email us directly</a>.'; } })
        .then(function () { if (b) { b.disabled = false; b.textContent = t; } });
    });
  });
})();
