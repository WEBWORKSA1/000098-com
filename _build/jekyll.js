// Emit a Jekyll (GitHub Pages native) version of the site: node _build/jekyll.js <outdir>
// GitHub Pages builds Jekyll on every push to the publishing branch, no Actions needed.
const fs = require('fs'), path = require('path');
const OUT = path.resolve(process.argv[2] || path.join(__dirname, '..'));
process.env.JEKYLL = '1'; process.env.OUT_DIR = OUT;
const { jekyllLayout } = require('./layout.js');
fs.mkdirSync(path.join(OUT, '_layouts'), { recursive: true });
fs.writeFileSync(path.join(OUT, '_layouts/default.html'), jekyllLayout());
fs.copyFileSync(path.join(__dirname, 'jekyll/color.html'), path.join(OUT, '_layouts/color.html'));
fs.copyFileSync(path.join(__dirname, 'jekyll/_config.yml'), path.join(OUT, '_config.yml'));
require('./build.js');
