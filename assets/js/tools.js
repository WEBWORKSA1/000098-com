/* 000098 free color tools — vanilla JS, everything runs in the browser */
(function () {
  'use strict';
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  var Q = new URLSearchParams(location.search);
  var R = document.body.dataset.root || '';
  function textOn(h) { return C.contrast(h, 'ffffff') >= C.contrast(h, '000000') ? '#fff' : '#000'; }

  function parseAny(v) {
    if (!v) return null; v = String(v).trim().toLowerCase();
    if (C.NAMED[v.replace(/\s+/g, '')]) return C.NAMED[v.replace(/\s+/g, '')];
    var h = C.norm(v); if (h) return h;
    var n = (v.match(/-?[\d.]+/g) || []).map(Number);
    if (/^rgb/.test(v) && n.length >= 3) return C.rgbToHex(n[0], n[1], n[2]);
    if (/^hsl/.test(v) && n.length >= 3) { var o = C.hslToRgb(n[0], n[1], n[2]); return C.rgbToHex(o[0], o[1], o[2]); }
    if (/^cmyk/.test(v) && n.length >= 4) { var c = C.cmykToRgb(n[0], n[1], n[2], n[3]); return C.rgbToHex(c[0], c[1], c[2]); }
    if (n.length === 3 && n.every(function (x) { return x >= 0 && x <= 255; })) return C.rgbToHex(n[0], n[1], n[2]);
    return null;
  }
  window.parseAny = parseAny;
  function link(h) { var S = window.STATIC_HEXES || {}; return R + 'color/' + (S[h] ? h + '.html' : '?hex=' + h); }

  var tools = {
    converter: function (el) {
      var inp = $('#cv-in', el), pick = $('#cv-pick', el), out = $('#cv-out', el), sw = $('#cv-sw', el);
      function run(h) {
        if (!h) { out.innerHTML = '<tr><td colspan="2">Enter a HEX, RGB, HSL, CMYK value or a CSS color name.</td></tr>'; return; }
        var I = C.info(h), F = I.fmt; sw.style.background = F.hex; pick.value = F.hex;
        out.innerHTML = [['HEX', F.hex], ['RGB', F.rgb], ['HSL', F.hsl], ['HSV', F.hsv], ['CMYK', F.cmyk], ['Lab', F.lab], ['LCh', F.lch], ['OKLCH', F.oklch], ['XYZ', F.xyz], ['Decimal', F.decimal], ['Nearest name', I.nearest.name + ' (#' + I.nearest.hex.toUpperCase() + ')']].map(function (r) { return '<tr><th>' + r[0] + '</th><td>' + r[1] + '<button class="copy" data-copy="' + r[1] + '">Copy</button></td></tr>'; }).join('') + '<tr><th>Full page</th><td><a href="' + link(h) + '">Open ' + F.hex + ' →</a></td></tr>';
      }
      inp.addEventListener('input', function () { run(parseAny(inp.value)); });
      pick.addEventListener('input', function () { inp.value = pick.value; run(parseAny(pick.value)); });
      inp.value = Q.get('c') || '#000098'; run(parseAny(inp.value));
    },

    contrast: function (el) {
      var fg = $('#ct-fg', el), bg = $('#ct-bg', el), fgp = $('#ct-fgp', el), bgp = $('#ct-bgp', el), out = $('#ct-out', el), pv = $('#ct-pv', el), fix = $('#ct-fix', el);
      function b(ok, t) { return '<span class="badge ' + (ok ? 'pass' : 'fail') + '">' + t + (ok ? ' pass' : ' fail') + '</span>'; }
      function run() {
        var f = parseAny(fg.value), g = parseAny(bg.value); if (!f || !g) { out.textContent = 'Enter two valid colors.'; return; }
        fgp.value = '#' + f; bgp.value = '#' + g;
        var r = C.contrast(f, g);
        pv.style.background = '#' + g; pv.style.color = '#' + f;
        out.innerHTML = '<p style="font-size:2.6rem;font-weight:800;margin:0;color:var(--ink)">' + r.toFixed(2) + ':1</p>' +
          '<p>' + b(r >= 4.5, 'AA normal text') + b(r >= 7, 'AAA normal text') + b(r >= 3, 'AA large text') + b(r >= 4.5, 'AAA large text') + b(r >= 3, 'UI components') + '</p>';
        if (r < 4.5) {
          var hsl = C.rgbToHsl.apply(null, C.hexToRgb(f)), dir = C.luminance(C.hexToRgb(g)) > .18 ? -1 : 1, best = null;
          for (var l = hsl[2]; l >= 0 && l <= 100; l += dir) { var o = C.hslToRgb(hsl[0], hsl[1], l), h = C.rgbToHex(o[0], o[1], o[2]); if (C.contrast(h, g) >= 4.5) { best = h; break; } }
          fix.innerHTML = best ? 'Closest passing text color: <a href="#" data-set="' + best + '"><b class="mono">#' + best.toUpperCase() + '</b></a> (' + C.contrast(best, g).toFixed(2) + ':1). Click to apply.' : 'No lightness change of this hue reaches 4.5:1 on that background; try white or black text.';
        } else fix.textContent = 'This pair passes AA for body text.';
        history.replaceState(null, '', '?fg=' + f + '&bg=' + g);
      }
      [fg, bg].forEach(function (x) { x.addEventListener('input', run); });
      fgp.addEventListener('input', function () { fg.value = fgp.value; run(); });
      bgp.addEventListener('input', function () { bg.value = bgp.value; run(); });
      $('#ct-swap', el).addEventListener('click', function () { var t = fg.value; fg.value = bg.value; bg.value = t; run(); });
      fix.addEventListener('click', function (e) { var a = e.target.closest('[data-set]'); if (a) { e.preventDefault(); fg.value = '#' + a.dataset.set; run(); } });
      fg.value = '#' + (C.norm(Q.get('fg')) || 'ffffff'); bg.value = '#' + (C.norm(Q.get('bg')) || '000098'); run();
    },

    palette: function (el) {
      var row = $('#pg-row', el), mode = $('#pg-mode', el), base = C.norm(Q.get('base')) || C.norm(Q.get('p') && Q.get('p').split('-')[0]) || '000098';
      var cols = [], locked = [false, false, false, false, false];
      function rnd() { return C.rgbToHex(Math.random() * 255, Math.random() * 255, Math.random() * 255); }
      function hslHex(h, s, l) { var o = C.hslToRgb(h, s, l); return C.rgbToHex(o[0], o[1], o[2]); }
      function gen(seed) {
        var hsl = C.rgbToHsl.apply(null, C.hexToRgb(seed)), H = hsl[0], S = Math.max(hsl[1], 35), m = mode.value, j = function (n) { return (Math.random() - .5) * n; }, out;
        if (m === 'analogous') out = [-40, -20, 0, 20, 40].map(function (d, i) { return hslHex(H + d + j(6), S + j(10), [25, 40, hsl[2], 62, 80][i]); });
        else if (m === 'monochrome') out = [12, 28, 45, 65, 85].map(function (l) { return hslHex(H, S, l + j(4)); });
        else if (m === 'complementary') out = [hslHex(H, S, 20), seed, hslHex(H, 25, 92), hslHex(H + 180, S, 55), hslHex(H + 180, S, 35)];
        else if (m === 'triadic') out = [seed, hslHex(H + 120, S, 50 + j(10)), hslHex(H + 240, S, 50 + j(10)), hslHex(H, 15, 94), hslHex(H, 30, 15)];
        else out = [seed, rnd(), rnd(), rnd(), rnd()];
        return out;
      }
      function draw() {
        row.innerHTML = cols.map(function (h, i) {
          var t = textOn(h);
          return '<div class="pc" style="background:#' + h + ';color:' + t + '"><b>#' + h.toUpperCase() + '</b><span class="small">' + C.nearestNamed(h).name + '</span><span><button data-lock="' + i + '" aria-pressed="' + locked[i] + '">' + (locked[i] ? 'Locked' : 'Lock') + '</button> <button data-copy="#' + h.toUpperCase() + '">Copy</button> <a href="' + link(h) + '" style="color:' + t + '" class="small">Open</a></span></div>';
        }).join('');
        $('#pg-css', el).textContent = ':root {\n' + cols.map(function (h, i) { return '  --color-' + (i + 1) + ': #' + h.toUpperCase() + ';'; }).join('\n') + '\n}';
        $('#pg-json', el).textContent = JSON.stringify(cols.map(function (h) { return '#' + h.toUpperCase(); }));
        history.replaceState(null, '', '?p=' + cols.join('-'));
      }
      function regen() {
        var seed = locked.indexOf(true) >= 0 ? cols[locked.indexOf(true)] : (cols.length ? rnd() : base);
        if (mode.value !== 'random' && !cols.length) seed = base;
        var n = gen(seed);
        cols = n.map(function (h, i) { return locked[i] && cols[i] ? cols[i] : h; });
        draw();
      }
      row.addEventListener('click', function (e) { var b = e.target.closest('[data-lock]'); if (b) { var i = +b.dataset.lock; locked[i] = !locked[i]; draw(); } });
      $('#pg-go', el).addEventListener('click', regen);
      mode.addEventListener('change', regen);
      document.addEventListener('keydown', function (e) { if (e.code === 'Space' && !/INPUT|TEXTAREA|SELECT|BUTTON|A/.test(document.activeElement.tagName)) { e.preventDefault(); regen(); } });
      var p = Q.get('p'); if (p && p.split('-').every(C.norm)) { cols = p.split('-').map(C.norm).slice(0, 5); draw(); } else regen();
    },

    gradient: function (el) {
      var a = $('#gr-a', el), b = $('#gr-b', el), c = $('#gr-c', el), useC = $('#gr-usec', el), ang = $('#gr-ang', el), type = $('#gr-type', el), pv = $('#gr-pv', el), code = $('#gr-code', el), av = $('#gr-angv', el);
      function run() {
        var stops = [a.value, b.value].concat(useC.checked ? [c.value] : []);
        var g = type.value === 'radial' ? 'radial-gradient(circle, ' + stops.join(', ') + ')' : type.value === 'conic' ? 'conic-gradient(from ' + ang.value + 'deg, ' + stops.join(', ') + ', ' + stops[0] + ')' : 'linear-gradient(' + ang.value + 'deg, ' + stops.join(', ') + ')';
        pv.style.background = g; av.textContent = ang.value + '°';
        code.textContent = 'background: ' + stops[0] + ';\nbackground: ' + g + ';';
      }
      $$('input,select', el).forEach(function (x) { x.addEventListener('input', run); });
      $('#gr-rnd', el).addEventListener('click', function () { [a, b, c].forEach(function (x) { x.value = '#' + C.rgbToHex(Math.random() * 255, Math.random() * 255, Math.random() * 255); }); ang.value = Math.round(Math.random() * 360); run(); });
      run();
    },

    image: function (el) {
      var file = $('#ip-file', el), cv = $('#ip-cv', el), ctx = cv.getContext('2d', { willReadFrequently: true }), cur = $('#ip-cur', el), pal = $('#ip-pal', el), drop = $('#ip-drop', el);
      function load(f) {
        if (!f || !/^image\//.test(f.type)) { toast('Choose an image file'); return; }
        var img = new Image(); img.onload = function () {
          var s = Math.min(1, 900 / img.width); cv.width = img.width * s; cv.height = img.height * s; ctx.drawImage(img, 0, 0, cv.width, cv.height); cv.hidden = false; extract(); URL.revokeObjectURL(img.src);
        }; img.src = URL.createObjectURL(f);
      }
      function extract() {
        var d = ctx.getImageData(0, 0, cv.width, cv.height).data, buckets = {}, step = Math.max(4, Math.floor(d.length / 4 / 40000)) * 4;
        for (var i = 0; i < d.length; i += step) { if (d[i + 3] < 128) continue; var k = (d[i] >> 4) + ',' + (d[i + 1] >> 4) + ',' + (d[i + 2] >> 4); var bk = buckets[k] || (buckets[k] = [0, 0, 0, 0]); bk[0] += d[i]; bk[1] += d[i + 1]; bk[2] += d[i + 2]; bk[3]++; }
        var arr = Object.keys(buckets).map(function (k) { var b = buckets[k]; return { h: C.rgbToHex(b[0] / b[3], b[1] / b[3], b[2] / b[3]), n: b[3] }; }).sort(function (x, y) { return y.n - x.n; });
        var picked = [];
        arr.forEach(function (x) { if (picked.length < 8 && picked.every(function (p) { return C.deltaE(p, x.h) > 18; })) picked.push(x.h); });
        pal.innerHTML = picked.map(function (h) { return '<a href="' + link(h) + '"><i style="background:#' + h + '"></i><span>#' + h.toUpperCase() + '</span></a>'; }).join('');
      }
      function pickAt(e) {
        var r = cv.getBoundingClientRect(), x = Math.floor((e.clientX - r.left) * cv.width / r.width), y = Math.floor((e.clientY - r.top) * cv.height / r.height);
        var p = ctx.getImageData(x, y, 1, 1).data, h = C.rgbToHex(p[0], p[1], p[2]);
        cur.innerHTML = '<span style="display:inline-block;width:28px;height:28px;border-radius:5px;vertical-align:middle;background:#' + h + ';border:1px solid var(--rule)"></span> <b class="mono">#' + h.toUpperCase() + '</b> · rgb(' + p[0] + ', ' + p[1] + ', ' + p[2] + ') <button class="copy" data-copy="#' + h.toUpperCase() + '">Copy</button> <a href="' + link(h) + '">Details</a>';
      }
      file.addEventListener('change', function () { load(file.files[0]); });
      cv.addEventListener('click', pickAt);
      ['dragover', 'dragenter'].forEach(function (t) { drop.addEventListener(t, function (e) { e.preventDefault(); drop.style.borderColor = 'var(--ink)'; }); });
      drop.addEventListener('dragleave', function () { drop.style.borderColor = ''; });
      drop.addEventListener('drop', function (e) { e.preventDefault(); drop.style.borderColor = ''; load(e.dataTransfer.files[0]); });
      document.addEventListener('paste', function (e) { var it = Array.prototype.find.call(e.clipboardData.items, function (i) { return /^image/.test(i.type); }); if (it) load(it.getAsFile()); });
    },

    blindness: function (el) {
      var inp = $('#cb-in', el), out = $('#cb-out', el);
      function run() {
        var list = inp.value.split(/[\s,;]+/).map(parseAny).filter(Boolean).slice(0, 12);
        if (!list.length) { out.innerHTML = '<p>Enter at least one color.</p>'; return; }
        var types = [['Normal vision', null]].concat(C.CVD_TYPES);
        out.innerHTML = types.map(function (t) {
          return '<div class="panel" style="padding:14px"><b>' + t[0] + '</b>' + (t[1] ? ' <span class="muted small">— ' + t[1] + '</span>' : '') + '<div style="display:flex;height:54px;border-radius:6px;overflow:hidden;margin-top:8px">' + list.map(function (h) { var s = t[1] ? C.simulate(h, t[0]) : h; return '<i title="#' + s.toUpperCase() + '" style="flex:1;background:#' + s + '"></i>'; }).join('') + '</div></div>';
        }).join('');
      }
      inp.addEventListener('input', run); inp.value = Q.get('c') || '#000098, #989800, #e63946, #2a9d8f, #f4a261'; run();
    },

    shades: function (el) {
      var inp = $('#sh-in', el), pick = $('#sh-pick', el), n = $('#sh-n', el), out = $('#sh-out', el), code = $('#sh-code', el);
      function strip(arr, label) { return '<h3 style="margin-top:16px">' + label + '</h3><div class="ladder">' + arr.map(function (h) { return '<a href="' + link(h) + '" style="background:#' + h + ';color:' + textOn(h) + '">#' + h.toUpperCase() + '</a>'; }).join('') + '</div>'; }
      function run() {
        var h = parseAny(inp.value); if (!h) return; pick.value = '#' + h; var k = +n.value;
        var s = C.ladder(h, '000000', k), t = C.ladder(h, 'ffffff', k), g = C.ladder(h, '808080', k);
        out.innerHTML = strip(s, 'Shades') + strip(t, 'Tints') + strip(g, 'Tones');
        code.textContent = ':root {\n' + t.slice(1).reverse().map(function (x, i) { return '  --tint-' + (i + 1) + ': #' + x.toUpperCase() + ';'; }).join('\n') + '\n  --base: #' + h.toUpperCase() + ';\n' + s.slice(1).map(function (x, i) { return '  --shade-' + (i + 1) + ': #' + x.toUpperCase() + ';'; }).join('\n') + '\n}';
      }
      inp.addEventListener('input', run); n.addEventListener('input', run); pick.addEventListener('input', function () { inp.value = pick.value; run(); });
      inp.value = '#' + (C.norm(Q.get('c')) || '000098'); run();
    },

    random: function (el) {
      var big = $('#rc-big', el), info = $('#rc-info', el), hist = $('#rc-hist', el), past = [];
      function go() {
        var h = C.rgbToHex(Math.random() * 255, Math.random() * 255, Math.random() * 255), I = C.info(h);
        big.style.background = '#' + h; big.style.color = textOn(h); big.innerHTML = '<span class="mono" style="font-size:2.4rem;font-weight:600">#' + h.toUpperCase() + '</span>';
        info.innerHTML = '<p>' + C.describe(I) + '</p><p><button class="btn sm" data-copy="#' + h.toUpperCase() + '">Copy HEX</button> <a class="btn sm ghost" href="' + link(h) + '">Full details</a></p>';
        past.unshift(h); past = past.slice(0, 18);
        hist.innerHTML = past.map(function (x) { return '<a class="chip" href="' + link(x) + '"><div class="sw" style="background:#' + x + ';height:60px"></div><div class="lb"><span>#' + x.toUpperCase() + '</span></div></a>'; }).join('');
      }
      $('#rc-go', el).addEventListener('click', go);
      document.addEventListener('keydown', function (e) { if (e.code === 'Space' && !/INPUT|TEXTAREA|SELECT|BUTTON|A/.test(document.activeElement.tagName)) { e.preventDefault(); go(); } });
      go();
    },

    viewer: function (el) {
      var h = C.norm(Q.get('hex'));
      if (!h) return;
      var r = ColorPage.render(h, R);
      document.title = '#' + h.toUpperCase() + ' color code — HEX, RGB, HSL, CMYK | 000098';
      var d = document.querySelector('meta[name=description]'); if (d) d.content = r.info.fmt.hex + ' (' + r.info.fmt.rgb + ') color information, conversions, schemes, shades, contrast and code.';
      el.innerHTML = r.html;
      var dir = document.getElementById('directory'); if (dir) dir.hidden = true;
      window.scrollTo(0, 0);
    }
  };
  $$('[data-tool]').forEach(function (el) { var f = tools[el.dataset.tool]; if (f) f(el); });
})();
