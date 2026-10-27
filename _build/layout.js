// Shared page shell for every generated page
const SITE = 'https://000098.com/';
const ADSENSE = '<script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-6620975821265271" crossorigin="anonymous"></script>';
const esc = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

function rootFor(path) { const d = path.split('/').length - 1; return d ? '../'.repeat(d) : ''; }

function head({ title, desc, path, schema = [], noindex = false, extraHead = '', noads = false }) {
  const R = rootFor(path);
  const url = SITE + path.replace(/index\.html$/, '');
  const ld = [{ '@context': 'https://schema.org', '@type': 'WebSite', name: '000098', alternateName: '000098 Color Lab', url: SITE,
    potentialAction: { '@type': 'SearchAction', target: SITE + 'color/?hex={hex}', 'query-input': 'required name=hex' } }, ...schema];
  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(title)}</title>
<meta name="description" content="${esc(desc)}">
<link rel="canonical" href="${url}">
${noindex ? '<meta name="robots" content="noindex,follow">' : '<meta name="robots" content="index,follow,max-image-preview:large">'}
<meta name="google-adsense-account" content="ca-pub-6620975821265271">
<meta name="theme-color" content="#000098">
<meta property="og:type" content="website"><meta property="og:site_name" content="000098">
<meta property="og:title" content="${esc(title)}"><meta property="og:description" content="${esc(desc)}"><meta property="og:url" content="${url}">
<meta property="og:image" content="${SITE}assets/img/og.svg"><meta name="twitter:card" content="summary_large_image">
<link rel="icon" href="${R}favicon.svg" type="image/svg+xml">
<link rel="manifest" href="${R}site.webmanifest">
<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,400;12..96,500;12..96,600;12..96,700;12..96,800&family=JetBrains+Mono:wght@400;500;600&display=swap" rel="stylesheet">
<link rel="stylesheet" href="${R}assets/css/site.css">
${noads ? '' : ADSENSE}
<script type="application/ld+json">${JSON.stringify(ld.length === 1 ? ld[0] : ld)}</script>
${extraHead}
</head>`;
}

function header(R) {
  return `<a class="skip" href="#main">Skip to content</a>
<div class="topbar">Contact, if you are interested in this website / domain name / Sponsorship / Advertisement / Partnership — <a href="https://web.works/contact" rel="noopener" target="_blank">web.works/contact</a></div>
<header class="site-head"><div class="wrap head-in" style="position:relative">
<a class="brand" href="${R}index.html" aria-label="000098 home"><span class="brand-chip" aria-hidden="true"></span><span>000098<small>The #000098 Color Lab</small></span></a>
<button class="menu-btn" aria-expanded="false" aria-controls="nav">Menu</button>
<nav class="nav" id="nav" aria-label="Main">
<a href="${R}color/index.html">Colors</a><a href="${R}tools/index.html">Tools</a><a href="${R}palettes.html">Palettes</a><a href="${R}learn/index.html">Learn</a><a href="${R}videos.html">Videos</a><a href="${R}support.html">Support</a><a class="cta" href="${R}services.html">Get a quote</a>
</nav></div></header>`;
}

function footer(R) {
  const y = 2026;
  return `<footer class="site-foot"><div class="wrap">
<div class="foot-grid">
<div><a class="brand" href="${R}index.html" style="color:#fff"><span class="brand-chip" aria-hidden="true"></span><span>000098<small style="color:#9a9db8">The #000098 Color Lab</small></span></a>
<p style="margin-top:14px">Free color codes, conversions, palettes and accessibility tools for designers, developers and marketers. Every hex. Every format.</p>
<form class="hexsearch" data-root="${R}" role="search" style="display:flex;gap:8px"><label class="hp" for="fq">Find a color</label><input id="fq" placeholder="Hex or name, e.g. 000098" aria-label="Hex code or color name"><button class="btn sm light" type="submit">Find</button></form></div>
<div><h4>Explore</h4><ul><li><a href="${R}color/000098.html">#000098</a></li><li><a href="${R}color/index.html">Color library</a></li><li><a href="${R}palettes.html">Palettes</a></li><li><a href="${R}learn/index.html">Guides</a></li><li><a href="${R}videos.html">Videos</a></li></ul></div>
<div><h4>Tools</h4><ul><li><a href="${R}tools/converter.html">Converter</a></li><li><a href="${R}tools/contrast-checker.html">Contrast checker</a></li><li><a href="${R}tools/palette-generator.html">Palette generator</a></li><li><a href="${R}tools/gradient-generator.html">Gradient generator</a></li><li><a href="${R}tools/image-color-picker.html">Image color picker</a></li><li><a href="${R}tools/color-blindness-simulator.html">Color blindness simulator</a></li></ul></div>
<div><h4>Work with us</h4><ul><li><a href="${R}services.html">Design services</a></li><li><a href="${R}sponsor.html">Sponsor &amp; advertise</a></li><li><a href="${R}contests.html">Contests</a></li><li><a href="${R}careers.html">Careers</a></li><li><a href="${R}support.html">Support us</a></li></ul></div>
<div><h4>Company</h4><ul><li><a href="${R}about.html">About</a></li><li><a href="${R}contact.html">Contact</a></li><li><a href="${R}privacy.html">Privacy</a></li><li><a href="${R}terms.html">Terms</a></li><li><a href="${R}disclaimer.html">Disclaimer</a></li><li><a href="${R}cookies.html">Cookies</a></li><li><a href="${R}accessibility.html">Accessibility</a></li><li><a href="${R}trademark.html">Trademark &amp; copyright</a></li></ul></div>
</div>
<div class="legal">© ${y} 000098.com. All rights reserved. "000098" is used here as a hexadecimal color value (#000098) and a domain name; it is not a claim to any trademark, product code, ticker or registration held by others. Third-party names and marks belong to their owners and are mentioned for identification only. Color values are computed approximations and may render differently across screens and print processes. <a href="${R}trademark.html">Full trademark &amp; copyright disclosure</a>.</div>
</div></footer>`;
}

function page({ title, desc, path, body, schema, noindex, extraHead = '', scripts = [], crumbs, noads }) {
  const R = rootFor(path);
  const crumbHtml = crumbs ? `<div class="wrap"><nav class="crumbs" aria-label="Breadcrumb"><a href="${R}index.html">Home</a> / ${crumbs.map(c => c[1] ? `<a href="${R}${c[1]}">${esc(c[0])}</a>` : esc(c[0])).join(' / ')}</nav></div>` : '';
  const bc = crumbs ? [{ '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: [['Home', ''], ...crumbs].map((c, i) => ({ '@type': 'ListItem', position: i + 1, name: c[0], item: SITE + (c[1] || (i === crumbs.length ? path : '')) })) }] : [];
  return head({ title, desc, path, schema: [...(schema || []), ...bc], noindex, extraHead, noads }) + `
<body data-root="${R}">
${header(R)}
<main id="main">
${crumbHtml}
${body}
</main>
${footer(R)}
<script src="${R}assets/js/color.js"></script>
<script src="${R}assets/js/site.js"></script>
${scripts.map(s => s.startsWith('<') ? s : `<script src="${R}${s}"></script>`).join('\n')}
</body>
</html>
`;
}

module.exports = { page, esc, rootFor, SITE };
