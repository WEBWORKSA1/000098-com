/* 000098 color math — shared by the browser tools and the static page generator */
(function (root) {
  'use strict';
  var clamp = function (v, a, b) { return Math.min(b, Math.max(a, v)); };
  var r2 = function (v, d) { var p = Math.pow(10, d || 0); return Math.round(v * p) / p; };

  function norm(hex) {
    if (hex == null) return null;
    hex = String(hex).trim().replace(/^#/, '').toLowerCase();
    if (/^[0-9a-f]{3}$/.test(hex)) hex = hex.split('').map(function (c) { return c + c; }).join('');
    return /^[0-9a-f]{6}$/.test(hex) ? hex : null;
  }
  function hexToRgb(hex) { hex = norm(hex); if (!hex) return null; return [parseInt(hex.slice(0, 2), 16), parseInt(hex.slice(2, 4), 16), parseInt(hex.slice(4, 6), 16)]; }
  function rgbToHex(r, g, b) { return [r, g, b].map(function (v) { return ('0' + clamp(Math.round(v), 0, 255).toString(16)).slice(-2); }).join(''); }

  function rgbToHsl(r, g, b) {
    r /= 255; g /= 255; b /= 255;
    var max = Math.max(r, g, b), min = Math.min(r, g, b), h = 0, s = 0, l = (max + min) / 2, d = max - min;
    if (d) {
      s = l > .5 ? d / (2 - max - min) : d / (max + min);
      h = max === r ? (g - b) / d + (g < b ? 6 : 0) : max === g ? (b - r) / d + 2 : (r - g) / d + 4;
      h *= 60;
    }
    return [h, s * 100, l * 100];
  }
  function hslToRgb(h, s, l) {
    h = ((h % 360) + 360) % 360; s = clamp(s, 0, 100) / 100; l = clamp(l, 0, 100) / 100;
    var c = (1 - Math.abs(2 * l - 1)) * s, x = c * (1 - Math.abs((h / 60) % 2 - 1)), m = l - c / 2, rgb;
    if (h < 60) rgb = [c, x, 0]; else if (h < 120) rgb = [x, c, 0]; else if (h < 180) rgb = [0, c, x];
    else if (h < 240) rgb = [0, x, c]; else if (h < 300) rgb = [x, 0, c]; else rgb = [c, 0, x];
    return rgb.map(function (v) { return (v + m) * 255; });
  }
  function rgbToHsv(r, g, b) {
    r /= 255; g /= 255; b /= 255;
    var max = Math.max(r, g, b), min = Math.min(r, g, b), d = max - min, h = 0;
    if (d) { h = max === r ? (g - b) / d + (g < b ? 6 : 0) : max === g ? (b - r) / d + 2 : (r - g) / d + 4; h *= 60; }
    return [h, max ? d / max * 100 : 0, max * 100];
  }
  function rgbToCmyk(r, g, b) {
    var k = 1 - Math.max(r, g, b) / 255;
    if (k >= 1) return [0, 0, 0, 100];
    return [(1 - r / 255 - k) / (1 - k) * 100, (1 - g / 255 - k) / (1 - k) * 100, (1 - b / 255 - k) / (1 - k) * 100, k * 100];
  }
  function cmykToRgb(c, m, y, k) { return [255 * (1 - c / 100) * (1 - k / 100), 255 * (1 - m / 100) * (1 - k / 100), 255 * (1 - y / 100) * (1 - k / 100)]; }
  function lin(c) { c /= 255; return c <= .04045 ? c / 12.92 : Math.pow((c + .055) / 1.055, 2.4); }
  function rgbToXyz(r, g, b) {
    var R = lin(r), G = lin(g), B = lin(b);
    return [(R * .4124564 + G * .3575761 + B * .1804375) * 100, (R * .2126729 + G * .7151522 + B * .0721750) * 100, (R * .0193339 + G * .1191920 + B * .9503041) * 100];
  }
  function xyzToLab(x, y, z) {
    var f = function (t) { return t > 216 / 24389 ? Math.cbrt(t) : (24389 / 27 * t + 16) / 116; };
    var fx = f(x / 95.047), fy = f(y / 100), fz = f(z / 108.883);
    return [116 * fy - 16, 500 * (fx - fy), 200 * (fy - fz)];
  }
  function labToLch(L, a, b) { var h = Math.atan2(b, a) * 180 / Math.PI; return [L, Math.sqrt(a * a + b * b), h < 0 ? h + 360 : h]; }
  function rgbToOklch(r, g, b) {
    var R = lin(r), G = lin(g), B = lin(b);
    var l = Math.cbrt(.4122214708 * R + .5363325363 * G + .0514459929 * B),
        m = Math.cbrt(.2119034982 * R + .6806995451 * G + .1073969566 * B),
        s = Math.cbrt(.0883024619 * R + .2817188376 * G + .6299787005 * B);
    var L = .2104542553 * l + .793617785 * m - .0040720468 * s,
        A = 1.9779984951 * l - 2.428592205 * m + .4505937099 * s,
        Bb = .0259040371 * l + .7827717662 * m - .808675766 * s;
    var h = Math.atan2(Bb, A) * 180 / Math.PI;
    return [L * 100, Math.sqrt(A * A + Bb * Bb), h < 0 ? h + 360 : h];
  }
  function luminance(rgb) { return .2126 * lin(rgb[0]) + .7152 * lin(rgb[1]) + .0722 * lin(rgb[2]); }
  function contrast(a, b) {
    var la = luminance(typeof a === 'string' ? hexToRgb(a) : a), lb = luminance(typeof b === 'string' ? hexToRgb(b) : b);
    return (Math.max(la, lb) + .05) / (Math.min(la, lb) + .05);
  }
  function rotate(hex, deg) { var rgb = hexToRgb(hex), h = rgbToHsl(rgb[0], rgb[1], rgb[2]); var o = hslToRgb(h[0] + deg, h[1], h[2]); return rgbToHex(o[0], o[1], o[2]); }
  function mix(a, b, t) { var A = hexToRgb(a), B = hexToRgb(b); return rgbToHex(A[0] + (B[0] - A[0]) * t, A[1] + (B[1] - A[1]) * t, A[2] + (B[2] - A[2]) * t); }
  function ladder(hex, target, n) { var out = []; for (var i = 0; i <= n; i++) out.push(mix(hex, target, i / n)); return out; }
  function schemes(hex) {
    var rgb = hexToRgb(hex), h = rgbToHsl(rgb[0], rgb[1], rgb[2]);
    var mono = [18, 34, 50, 66, 82].map(function (l) { var o = hslToRgb(h[0], h[1], l); return rgbToHex(o[0], o[1], o[2]); });
    return {
      'Complementary': [hex, rotate(hex, 180)],
      'Split complementary': [hex, rotate(hex, 150), rotate(hex, 210)],
      'Analogous': [rotate(hex, -30), hex, rotate(hex, 30)],
      'Triadic': [hex, rotate(hex, 120), rotate(hex, 240)],
      'Tetradic': [hex, rotate(hex, 90), rotate(hex, 180), rotate(hex, 270)],
      'Monochromatic': mono
    };
  }
  /* Color-vision deficiency matrices (Machado et al. 2009, severity 1.0) applied in linear RGB; achromatopsia by luminance */
  var CVD = {
    'Protanopia': [[.152286, 1.052583, -.204868], [.114503, .786281, .099216], [-.003882, -.048116, 1.051998]],
    'Deuteranopia': [[.367322, .860646, -.227968], [.280085, .672501, .047413], [-.011820, .042940, .968881]],
    'Tritanopia': [[1.255528, -.076749, -.178779], [-.078411, .930809, .147602], [.004733, .691367, .303900]]
  };
  function delin(v) { v = clamp(v, 0, 1); return (v <= .0031308 ? 12.92 * v : 1.055 * Math.pow(v, 1 / 2.4) - .055) * 255; }
  function simulate(hex, type) {
    var rgb = hexToRgb(hex), L = [lin(rgb[0]), lin(rgb[1]), lin(rgb[2])];
    if (type === 'Achromatopsia') { var y = .2126 * L[0] + .7152 * L[1] + .0722 * L[2]; var g = delin(y); return rgbToHex(g, g, g); }
    var base = type.replace('anomaly', 'anopia').replace('Protanomaly', 'Protanopia');
    var key = /Prot/.test(type) ? 'Protanopia' : /Deut/.test(type) ? 'Deuteranopia' : 'Tritanopia';
    var M = CVD[key], s = /anomaly/.test(type) ? .6 : 1;
    var o = M.map(function (row) { return row[0] * L[0] + row[1] * L[1] + row[2] * L[2]; });
    o = o.map(function (v, i) { return L[i] + (v - L[i]) * s; });
    return rgbToHex(delin(o[0]), delin(o[1]), delin(o[2]));
  }
  var CVD_TYPES = [['Protanopia', 'no red cones, ~1% of men'], ['Protanomaly', 'weak red, ~1% of men'], ['Deuteranopia', 'no green cones, ~1% of men'], ['Deuteranomaly', 'weak green, ~5% of men'], ['Tritanopia', 'no blue cones, rare'], ['Tritanomaly', 'weak blue, rare'], ['Achromatopsia', 'total color blindness, very rare']];

  var NAMED = {aliceblue:'f0f8ff',antiquewhite:'faebd7',aqua:'00ffff',aquamarine:'7fffd4',azure:'f0ffff',beige:'f5f5dc',bisque:'ffe4c4',black:'000000',blanchedalmond:'ffebcd',blue:'0000ff',blueviolet:'8a2be2',brown:'a52a2a',burlywood:'deb887',cadetblue:'5f9ea0',chartreuse:'7fff00',chocolate:'d2691e',coral:'ff7f50',cornflowerblue:'6495ed',cornsilk:'fff8dc',crimson:'dc143c',darkblue:'00008b',darkcyan:'008b8b',darkgoldenrod:'b8860b',darkgray:'a9a9a9',darkgreen:'006400',darkkhaki:'bdb76b',darkmagenta:'8b008b',darkolivegreen:'556b2f',darkorange:'ff8c00',darkorchid:'9932cc',darkred:'8b0000',darksalmon:'e9967a',darkseagreen:'8fbc8f',darkslateblue:'483d8b',darkslategray:'2f4f4f',darkturquoise:'00ced1',darkviolet:'9400d3',deeppink:'ff1493',deepskyblue:'00bfff',dimgray:'696969',dodgerblue:'1e90ff',firebrick:'b22222',floralwhite:'fffaf0',forestgreen:'228b22',fuchsia:'ff00ff',gainsboro:'dcdcdc',ghostwhite:'f8f8ff',gold:'ffd700',goldenrod:'daa520',gray:'808080',green:'008000',greenyellow:'adff2f',honeydew:'f0fff0',hotpink:'ff69b4',indianred:'cd5c5c',indigo:'4b0082',ivory:'fffff0',khaki:'f0e68c',lavender:'e6e6fa',lavenderblush:'fff0f5',lawngreen:'7cfc00',lemonchiffon:'fffacd',lightblue:'add8e6',lightcoral:'f08080',lightcyan:'e0ffff',lightgoldenrodyellow:'fafad2',lightgray:'d3d3d3',lightgreen:'90ee90',lightpink:'ffb6c1',lightsalmon:'ffa07a',lightseagreen:'20b2aa',lightskyblue:'87cefa',lightslategray:'778899',lightsteelblue:'b0c4de',lightyellow:'ffffe0',lime:'00ff00',limegreen:'32cd32',linen:'faf0e6',magenta:'ff00ff',maroon:'800000',mediumaquamarine:'66cdaa',mediumblue:'0000cd',mediumorchid:'ba55d3',mediumpurple:'9370db',mediumseagreen:'3cb371',mediumslateblue:'7b68ee',mediumspringgreen:'00fa9a',mediumturquoise:'48d1cc',mediumvioletred:'c71585',midnightblue:'191970',mintcream:'f5fffa',mistyrose:'ffe4e1',moccasin:'ffe4b5',navajowhite:'ffdead',navy:'000080',oldlace:'fdf5e6',olive:'808000',olivedrab:'6b8e23',orange:'ffa500',orangered:'ff4500',orchid:'da70d6',palegoldenrod:'eee8aa',palegreen:'98fb98',paleturquoise:'afeeee',palevioletred:'db7093',papayawhip:'ffefd5',peachpuff:'ffdab9',peru:'cd853f',pink:'ffc0cb',plum:'dda0dd',powderblue:'b0e0e6',purple:'800080',rebeccapurple:'663399',red:'ff0000',rosybrown:'bc8f8f',royalblue:'4169e1',saddlebrown:'8b4513',salmon:'fa8072',sandybrown:'f4a460',seagreen:'2e8b57',seashell:'fff5ee',sienna:'a0522d',silver:'c0c0c0',skyblue:'87ceeb',slateblue:'6a5acd',slategray:'708090',snow:'fffafa',springgreen:'00ff7f',steelblue:'4682b4',tan:'d2b48c',teal:'008080',thistle:'d8bfd8',tomato:'ff6347',turquoise:'40e0d0',violet:'ee82ee',wheat:'f5deb3',white:'ffffff',whitesmoke:'f5f5f5',yellow:'ffff00',yellowgreen:'9acd32'};
  var WORDS = 'alice blue antique white aquamarine aqua azure beige bisque black blanched almond violet brown burly wood cadet chartreuse chocolate coral cornflower cornsilk crimson dark cyan goldenrod gray green khaki magenta olive orange orchid red salmon sea slate turquoise deep pink sky dim dodger firebrick floral forest fuchsia gainsboro ghost gold honeydew hot indian indigo ivory lavender blush lawn lemon chiffon light yellow lime linen medium spring midnight mint cream misty rose moccasin navajo navy old lace drab pale papaya whip peach puff peru plum powder purple rebecca rosy royal saddle sandy shell sienna silver snow steel tan teal thistle tomato wheat smoke'.split(' ').sort(function (a, b) { return b.length - a.length; });
  function prettyName(k) {
    var out = [], s = k;
    while (s.length) {
      var w = null;
      for (var i = 0; i < WORDS.length; i++) if (s.indexOf(WORDS[i]) === 0) { w = WORDS[i]; break; }
      if (!w) { out.push(s); break; }
      out.push(w); s = s.slice(w.length);
    }
    return out.map(function (x) { return x.charAt(0).toUpperCase() + x.slice(1); }).join(' ');
  }
  function deltaE(h1, h2) {
    var a = hexToRgb(h1), b = hexToRgb(h2);
    var x = rgbToXyz(a[0], a[1], a[2]), y = rgbToXyz(b[0], b[1], b[2]);
    var A = xyzToLab(x[0], x[1], x[2]), B = xyzToLab(y[0], y[1], y[2]);
    return Math.sqrt(Math.pow(A[0] - B[0], 2) + Math.pow(A[1] - B[1], 2) + Math.pow(A[2] - B[2], 2));
  }
  function nearestNamed(hex, n) {
    var list = Object.keys(NAMED).filter(function (k) { return k !== 'aqua' && k !== 'fuchsia'; }).map(function (k) { return { key: k, name: prettyName(k), hex: NAMED[k], d: deltaE(hex, NAMED[k]) }; });
    list.sort(function (a, b) { return a.d - b.d; });
    return n ? list.slice(0, n) : list[0];
  }
  function webSafe(hex) { var rgb = hexToRgb(hex); return rgbToHex.apply(null, rgb.map(function (v) { return Math.round(v / 51) * 51; })); }
  function hueFamily(hex) {
    var rgb = hexToRgb(hex), h = rgbToHsl(rgb[0], rgb[1], rgb[2]);
    if (h[1] < 10 || h[2] < 6) return h[2] > 92 ? 'white' : h[2] < 10 ? 'black' : 'gray';
    if (h[2] > 94) return 'white';
    var H = h[0];
    if (H < 12 || H >= 345) return 'red'; if (H < 40) return h[2] < 40 ? 'brown' : 'orange'; if (H < 65) return 'yellow';
    if (H < 160) return 'green'; if (H < 195) return 'cyan'; if (H < 255) return 'blue'; if (H < 290) return 'purple'; return 'pink';
  }
  function info(hex) {
    hex = norm(hex); if (!hex) return null;
    var rgb = hexToRgb(hex), hsl = rgbToHsl.apply(null, rgb), hsv = rgbToHsv.apply(null, rgb), cmyk = rgbToCmyk.apply(null, rgb),
        xyz = rgbToXyz.apply(null, rgb), lab = xyzToLab.apply(null, xyz), lch = labToLch.apply(null, lab), ok = rgbToOklch.apply(null, rgb),
        lum = luminance(rgb), cw = contrast(rgb, [255, 255, 255]), cb = contrast(rgb, [0, 0, 0]);
    return {
      hex: hex, rgb: rgb, hsl: hsl, hsv: hsv, cmyk: cmyk, xyz: xyz, lab: lab, lch: lch, oklch: ok, lum: lum,
      decimal: parseInt(hex, 16), inverse: rgbToHex(255 - rgb[0], 255 - rgb[1], 255 - rgb[2]),
      gray: (function () { var g = delin(lum); return rgbToHex(g, g, g); })(),
      contrastWhite: cw, contrastBlack: cb, textOn: cw >= cb ? 'ffffff' : '000000',
      websafe: webSafe(hex), nearest: nearestNamed(hex), family: hueFamily(hex),
      fmt: {
        hex: '#' + hex.toUpperCase(),
        rgb: 'rgb(' + rgb.join(', ') + ')',
        hsl: 'hsl(' + r2(hsl[0]) + ', ' + r2(hsl[1], 1) + '%, ' + r2(hsl[2], 1) + '%)',
        hsv: 'hsv(' + r2(hsv[0]) + ', ' + r2(hsv[1], 1) + '%, ' + r2(hsv[2], 1) + '%)',
        cmyk: 'cmyk(' + cmyk.map(function (v) { return r2(v) + '%'; }).join(', ') + ')',
        xyz: 'XYZ(' + xyz.map(function (v) { return r2(v, 2); }).join(', ') + ')',
        lab: 'lab(' + r2(lab[0], 2) + '% ' + r2(lab[1], 2) + ' ' + r2(lab[2], 2) + ')',
        lch: 'lch(' + r2(lch[0], 2) + '% ' + r2(lch[1], 2) + ' ' + r2(lch[2], 1) + ')',
        oklch: 'oklch(' + r2(ok[0], 2) + '% ' + r2(ok[1], 4) + ' ' + r2(ok[2], 1) + ')',
        decimal: String(parseInt(hex, 16)),
        binary: rgb.map(function (v) { return ('0000000' + v.toString(2)).slice(-8); }).join(' ')
      }
    };
  }
  function describe(I) {
    var lum = I.hsl[2], sat = I.hsl[1];
    var tone = lum < 20 ? 'very dark' : lum < 40 ? 'dark' : lum < 60 ? 'medium' : lum < 80 ? 'light' : 'very light';
    var chroma = sat < 10 ? 'neutral' : sat < 40 ? 'muted' : sat < 75 ? 'moderately saturated' : 'highly saturated';
    var temp = { red: 'warm', orange: 'warm', yellow: 'warm', brown: 'warm', pink: 'warm', green: 'cool', cyan: 'cool', blue: 'cool', purple: 'cool-leaning', gray: 'neutral', white: 'neutral', black: 'neutral' }[I.family];
    return '#' + I.hex.toUpperCase() + ' is a ' + tone + ', ' + chroma + ' ' + I.family + ' with a hue angle of ' + Math.round(I.hsl[0]) + '°. ' +
      'In RGB it mixes ' + Math.round(I.rgb[0] / 2.55) + '% red, ' + Math.round(I.rgb[1] / 2.55) + '% green and ' + Math.round(I.rgb[2] / 2.55) + '% blue. ' +
      'Its relative luminance is ' + I.lum.toFixed(4) + ', so ' + (I.textOn === 'ffffff' ? 'white text reads best on it (contrast ' + I.contrastWhite.toFixed(2) + ':1)' : 'black text reads best on it (contrast ' + I.contrastBlack.toFixed(2) + ':1)') + '. ' +
      'It reads as a ' + temp + ' color; the closest CSS named color is ' + I.nearest.name + ' (#' + I.nearest.hex.toUpperCase() + ') and the closest web-safe value is #' + I.websafe.toUpperCase() + '.';
  }
  var api = { norm: norm, hexToRgb: hexToRgb, rgbToHex: rgbToHex, rgbToHsl: rgbToHsl, hslToRgb: hslToRgb, rgbToHsv: rgbToHsv, rgbToCmyk: rgbToCmyk, cmykToRgb: cmykToRgb,
    rgbToXyz: rgbToXyz, xyzToLab: xyzToLab, labToLch: labToLch, rgbToOklch: rgbToOklch, luminance: luminance, contrast: contrast, rotate: rotate, mix: mix, ladder: ladder,
    schemes: schemes, simulate: simulate, CVD_TYPES: CVD_TYPES, NAMED: NAMED, prettyName: prettyName, nearestNamed: nearestNamed, webSafe: webSafe, hueFamily: hueFamily,
    info: info, describe: describe, deltaE: deltaE, r2: r2 };
  if (typeof module !== 'undefined' && module.exports) module.exports = api; else root.C = api;
})(this);
