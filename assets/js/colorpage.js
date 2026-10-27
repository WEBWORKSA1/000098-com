/* Renders a full color reference page body. Used by the static generator (Node) and the live viewer (/color/?hex=). */
(function (root) {
  'use strict';
  var C = (typeof module !== 'undefined' && module.exports) ? require('./color.js') : root.C;
  var api = {};
  var MEANING = {
    blue: ['Blue is the most widely chosen corporate color because it signals reliability, calm and competence. Banks, insurers, health systems, airlines and software companies lean on it to look stable and trustworthy.', 'Darker blues add authority and seriousness; brighter blues feel friendlier and more digital. Blue backgrounds pair well with white type and a warm accent such as yellow or orange for calls to action.'],
    purple: ['Purple mixes the calm of blue with the energy of red. It carries associations with creativity, luxury, imagination and spirituality.', 'Deep purples feel premium and are common in beauty, wellness and fintech brands; lighter lavenders feel soft and are popular in lifestyle and stationery design.'],
    red: ['Red is the color of urgency, appetite and passion. It raises attention faster than any other hue, which is why it is used for sale tags, alerts and food brands.', 'Use it sparingly in interfaces: it reads as "error" or "stop" to most users. Paired with neutrals it looks confident; next to green it can be hard to tell apart for people with red–green color vision deficiency.'],
    orange: ['Orange is energetic and approachable. It sits between the urgency of red and the cheer of yellow, making it a strong choice for buttons, food delivery, sports and youth brands.', 'Orange against deep blue is one of the most reliable high-contrast complementary pairings in marketing.'],
    yellow: ['Yellow is the brightest hue to the human eye and is associated with optimism, warmth and caution. It grabs attention on signage and packaging.', 'Pure yellow has low contrast against white, so use darker text on yellow backgrounds and avoid yellow body text.'],
    brown: ['Browns read as earthy, natural and dependable. Coffee, leather, outdoor and craft brands use them to signal authenticity.', 'Combine with creams and muted greens for an organic look, or with blue for a classic, rugged palette.'],
    green: ['Green signals growth, health, money and nature. It is the default for sustainability, finance and wellness brands and for "success" states in interfaces.', 'Blue-greens feel calm and clinical; yellow-greens feel fresh and youthful.'],
    cyan: ['Cyan and teal feel clean, technical and refreshing. They are common in healthcare, water, travel and SaaS products.', 'Teal is a good alternative to blue when you want to look trustworthy but different from competitors.'],
    pink: ['Pink ranges from playful to sophisticated. Bright magentas are bold and modern; dusty pinks are calm and premium.', 'Pink pairs well with deep navy, charcoal and green for contemporary brand systems.'],
    gray: ['Grays are the backbone of interface design: text, borders, backgrounds and disabled states. They let accent colors do the talking.', 'Slightly tinted grays (cool or warm) feel more intentional than pure neutral gray.'],
    white: ['Near-white tints are used as page backgrounds, cards and highlight fills. They create breathing room and make content readable.', 'Check contrast carefully: light tints need dark text.'],
    black: ['Near-blacks give typography and interfaces weight and elegance. They are used for text, luxury branding and dark mode surfaces.', 'Very dark colored blacks (navy-black, green-black) feel richer than pure #000000.']
  };
  var LINK = function (R, hex) { var set = (typeof module !== 'undefined' && module.exports) ? (api.exists || {}) : (root.STATIC_HEXES || {}); return R + 'color/' + (set[hex] ? hex + '.html' : '?hex=' + hex); };
  function sw(hex, label, R) { return '<a href="' + LINK(R, hex) + '" title="#' + hex.toUpperCase() + '"><i style="background:#' + hex + '"></i><span>' + (label || '#' + hex.toUpperCase()) + '</span></a>'; }
  function lad(arr, R) { return '<div class="ladder">' + arr.map(function (h) { var t = C.contrast(h, 'ffffff') > 4.5 ? '#fff' : '#111'; return '<a href="' + LINK(R, h) + '" style="background:#' + h + ';color:' + t + '" title="#' + h.toUpperCase() + '">#' + h.toUpperCase() + '</a>'; }).join('') + '</div>'; }
  function badge(ok, txt) { return '<span class="badge ' + (ok ? 'pass' : 'fail') + '">' + txt + (ok ? ' pass' : ' fail') + '</span>'; }
  function cRow(label, ratio) { return '<tr><th>' + label + '</th><td>' + ratio.toFixed(2) + ':1<br>' + badge(ratio >= 4.5, 'AA text') + badge(ratio >= 7, 'AAA text') + badge(ratio >= 3, 'AA large / UI') + '</td></tr>'; }

  function render(hex, R, opts) {
    opts = opts || {};
    var I = C.info(hex); if (!I) return '';
    hex = I.hex; var H = '#' + hex.toUpperCase(), F = I.fmt, light = I.textOn === '000000';
    var name = opts.name || I.nearest.name + (I.nearest.d < 1 ? '' : ' (approx.)');
    var near = C.nearestNamed(hex, 7).filter(function (n) { return n.hex !== hex; }).slice(0, 6);
    var sc = C.schemes(hex), m = MEANING[I.family] || MEANING.blue;
    var rows = [['HEX', F.hex], ['RGB', F.rgb], ['HSL', F.hsl], ['HSV / HSB', F.hsv], ['CMYK', F.cmyk], ['CIE Lab', F.lab], ['CIE LCh', F.lch], ['OKLCH', F.oklch], ['CIE XYZ', F.xyz], ['Decimal', F.decimal], ['Binary (R G B)', F.binary]];
    var shades = C.ladder(hex, '000000', 11), tints = C.ladder(hex, 'ffffff', 11), tones = C.ladder(hex, '808080', 11);
    var tw = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950], twMix = [.95, .9, .75, .6, .4, .2, 0, -.2, -.4, -.6, -.75];
    var scale = twMix.map(function (t) { return t >= 0 ? C.mix(hex, 'ffffff', t) : C.mix(hex, '000000', -t); });
    var prev = ('000000' + Math.max(0, I.decimal - 1).toString(16)).slice(-6), next = ('000000' + Math.min(16777215, I.decimal + 1).toString(16)).slice(-6);

    var h = '';
    h += '<section class="swatch-hero' + (light ? ' light' : '') + '" style="background:' + H + '"><div class="wrap">';
    h += '<p class="hex">' + H + '</p><p class="name">' + name + ' · ' + F.rgb + '</p>';
    h += '<div style="display:flex;gap:10px;flex-wrap:wrap"><button class="btn ' + (light ? '' : 'light') + '" data-copy="' + H + '">Copy HEX</button><button class="btn ' + (light ? 'ghost' : 'light') + '" data-copy="' + F.rgb + '">Copy RGB</button><a class="btn ' + (light ? 'ghost' : 'light') + '" href="' + R + 'tools/palette-generator.html?base=' + hex + '">Build a palette</a></div>';
    h += '</div></section>';
    h += '<div class="wrap"><nav class="small" aria-label="On this page" style="padding:14px 0;display:flex;gap:14px;flex-wrap:wrap"><a href="#values">Values</a><a href="#about">About</a><a href="#contrast">Contrast</a><a href="#schemes">Schemes</a><a href="#shades">Shades &amp; tints</a><a href="#blindness">Color blindness</a><a href="#code">Code</a><a href="#faq">FAQ</a><span style="margin-left:auto"><a href="' + LINK(R, prev) + '" rel="prev">← #' + prev.toUpperCase() + '</a> &nbsp; <a href="' + LINK(R, next) + '" rel="next">#' + next.toUpperCase() + ' →</a></span></nav></div>';

    h += '<section class="sec" style="padding-top:20px"><div class="wrap cols">';
    h += '<div class="panel" id="values"><h2>' + H + ' color values</h2><table class="vals">' + rows.map(function (r) { return '<tr><th>' + r[0] + '</th><td>' + r[1] + '<button class="copy" data-copy="' + r[1] + '" aria-label="Copy ' + r[0] + '">Copy</button></td></tr>'; }).join('') + '</table></div>';
    h += '<div class="panel" id="about"><h2>About ' + H + '</h2><p>' + C.describe(I) + '</p>' + (opts.intro || '') + '<p>' + m[0] + '</p><p>' + m[1] + '</p>';
    h += '<table class="vals"><tr><th>Color family</th><td style="font-family:inherit">' + I.family + '</td></tr><tr><th>Web-safe</th><td><a href="' + LINK(R, I.websafe) + '">#' + I.websafe.toUpperCase() + '</a></td></tr><tr><th>Inverse</th><td><a href="' + LINK(R, I.inverse) + '">#' + I.inverse.toUpperCase() + '</a></td></tr><tr><th>Grayscale</th><td><a href="' + LINK(R, I.gray) + '">#' + I.gray.toUpperCase() + '</a></td></tr><tr><th>Luminance</th><td>' + I.lum.toFixed(4) + '</td></tr></table></div>';
    h += '</div></section>';

    h += '<section class="sec alt" id="contrast"><div class="wrap cols"><div><h2>Contrast and accessibility</h2><p>WCAG 2.2 needs 4.5:1 for normal text (AA), 7:1 for AAA and 3:1 for large text and interface parts. Here is how ' + H + ' performs.</p><table class="vals">' + cRow('On white #FFFFFF', I.contrastWhite) + cRow('On black #000000', I.contrastBlack) + '</table><p class="small muted">Best text color on ' + H + ': <b>#' + I.textOn.toUpperCase() + '</b>. Test any pair in the <a href="' + R + 'tools/contrast-checker.html?fg=' + I.textOn + '&amp;bg=' + hex + '">contrast checker</a>.</p></div>';
    h += '<div><h2>Preview</h2><div class="preview-box" style="background:' + H + ';color:#' + I.textOn + '"><h3 style="margin:0 0 6px">Heading on ' + H + '</h3><p style="margin:0">Body text set on this background with the recommended text color.</p></div>';
    h += '<div class="preview-box" style="margin-top:12px;background:#fff"><h3 style="margin:0 0 6px;color:' + H + '">' + H + ' as text on white</h3><p style="margin:0;border-left:6px solid ' + H + ';padding-left:10px">Border and accent usage of ' + H + '.</p></div>';
    h += '<div class="preview-box" style="margin-top:12px;background:linear-gradient(90deg,' + H + ',#' + sc.Analogous[2] + ')"><span style="color:#' + I.textOn + ';font-weight:600">Gradient ' + H + ' → #' + sc.Analogous[2].toUpperCase() + '</span></div></div></div></section>';

    h += '<section class="sec" id="schemes"><div class="wrap"><h2>Color schemes with ' + H + '</h2><p class="muted">Harmonies built by rotating the hue on the HSL color wheel. Click any swatch to open its page.</p>';
    Object.keys(sc).forEach(function (k) { h += '<div class="scheme"><h3>' + k + '</h3><div class="row">' + sc[k].map(function (x) { return sw(x, null, R); }).join('') + '</div></div>'; });
    h += '<div class="scheme"><h3>Similar named colors</h3><div class="row">' + near.map(function (n) { return sw(n.hex, n.name, R); }).join('') + '</div></div></div></section>';

    h += '<section class="sec alt" id="shades"><div class="wrap"><h2>Shades, tints and tones of ' + H + '</h2>';
    h += '<h3>Shades (mixed with black)</h3>' + lad(shades, R) + '<h3 style="margin-top:18px">Tints (mixed with white)</h3>' + lad(tints, R) + '<h3 style="margin-top:18px">Tones (mixed with gray)</h3>' + lad(tones, R);
    h += '<h3 style="margin-top:18px">Design-token scale (50–950)</h3>' + lad(scale, R) + '</div></section>';

    h += '<section class="sec" id="blindness"><div class="wrap"><h2>' + H + ' under color vision deficiency</h2><p class="muted">About 1 in 12 men and 1 in 200 women have some form of color vision deficiency. Simulations use the Machado (2009) model.</p><div class="cb-grid"><div><i style="background:' + H + '"></i><span>Normal vision<br><b class="mono">' + H + '</b></span></div>';
    C.CVD_TYPES.forEach(function (t) { var s = C.simulate(hex, t[0]); h += '<div><i style="background:#' + s + '"></i><span>' + t[0] + '<br><b class="mono">#' + s.toUpperCase() + '</b><br><span class="muted">' + t[1] + '</span></span></div>'; });
    h += '</div></div></section>';

    var css = ':root {\n  --brand: ' + H + ';\n  --brand-rgb: ' + I.rgb.join(' ') + ';\n  --brand-text: #' + I.textOn.toUpperCase() + ';\n}\n.button {\n  background: var(--brand);\n  color: var(--brand-text);\n}\n.text-brand { color: ' + H + '; }\n.border-brand { border: 2px solid ' + H + '; }\n.shadow-brand { box-shadow: 0 8px 24px rgb(' + I.rgb.join(' ') + ' / 0.35); }';
    var twc = '// tailwind.config.js\ntheme: {\n  extend: {\n    colors: {\n      brand: {\n' + tw.map(function (k, i) { return '        ' + k + ": '#" + scale[i].toUpperCase() + "',"; }).join('\n') + '\n      }\n    }\n  }\n}';
    var other = '// SCSS\n$brand: ' + H + ';\n\n// Swift (SwiftUI)\nColor(red: ' + (I.rgb[0] / 255).toFixed(3) + ', green: ' + (I.rgb[1] / 255).toFixed(3) + ', blue: ' + (I.rgb[2] / 255).toFixed(3) + ')\n\n// Android XML\n<color name="brand">' + H + '</color>\n\n// Flutter\nconst Color(0xFF' + hex.toUpperCase() + ')\n\n// Python (matplotlib)\ncolor="' + H + '"';
    var e = function (s) { return s.replace(/&/g, '&amp;').replace(/</g, '&lt;'); };
    h += '<section class="sec alt" id="code"><div class="wrap"><h2>Use ' + H + ' in code</h2><div class="cols"><div><h3>CSS</h3><pre><button class="copy" data-copy>Copy</button><code>' + e(css) + '</code></pre></div><div><h3>Tailwind scale</h3><pre><button class="copy" data-copy>Copy</button><code>' + e(twc) + '</code></pre></div><div><h3>SCSS, Swift, Android, Flutter</h3><pre><button class="copy" data-copy>Copy</button><code>' + e(other) + '</code></pre></div></div></div></section>';

    var faq = [
      ['What color is ' + H + '?', C.describe(I)],
      ['What is the RGB value of ' + H + '?', H + ' is ' + F.rgb + ' — red ' + I.rgb[0] + ', green ' + I.rgb[1] + ', blue ' + I.rgb[2] + ' on a 0–255 scale.'],
      ['What is ' + H + ' in CMYK for print?', 'A direct conversion gives ' + F.cmyk + '. Screen-to-print conversion depends on the paper and ICC profile, so ask your printer for a proof before a large run.'],
      ['What text color works on ' + H + '?', 'Use #' + I.textOn.toUpperCase() + '. It gives a contrast ratio of ' + Math.max(I.contrastWhite, I.contrastBlack).toFixed(2) + ':1, ' + (Math.max(I.contrastWhite, I.contrastBlack) >= 7 ? 'which passes WCAG AAA.' : Math.max(I.contrastWhite, I.contrastBlack) >= 4.5 ? 'which passes WCAG AA.' : 'which only passes for large text; consider a darker or lighter variant for body copy.')],
      ['What is the complementary color of ' + H + '?', 'Rotating the hue 180° gives #' + sc.Complementary[1].toUpperCase() + '. Triadic partners are #' + sc.Triadic[1].toUpperCase() + ' and #' + sc.Triadic[2].toUpperCase() + '.']
    ];
    h += '<section class="sec" id="faq"><div class="wrap narrow"><h2>' + H + ' FAQ</h2>' + faq.map(function (q) { return '<details><summary>' + q[0] + '</summary><p>' + q[1] + '</p></details>'; }).join('') + '</div></section>';
    h += '<section class="sec" style="padding-top:0"><div class="wrap"><div class="leadband"><div><h2>Turn ' + H + ' into a brand system</h2><p>Logo palette, accessible UI tokens, print specs and a style guide your whole team can use. Tell us about the project and get a fixed quote within two business days.</p></div><div><a class="btn light" href="' + R + 'services.html?color=' + hex + '">Get a free quote</a> <a class="btn ghost" style="color:#fff;border-color:#fff" href="' + R + 'support.html">Support 000098</a></div></div></div></section>';
    return { html: h, faq: faq, info: I, name: name };
  }
  api.render = render;
  if (typeof module !== 'undefined' && module.exports) module.exports = api; else root.ColorPage = api;
})(this);
