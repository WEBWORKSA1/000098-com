# 000098.com — The #000098 Color Lab

A static, AdSense-ready color reference and free design-tools hub built around the hex color **#000098** (rgb 0, 0, 152). Hosted free on GitHub Pages.

## What's inside
- **Color library**: 199 pre-generated color pages (all CSS named colors + the #000098 family) and a live viewer for any of 16,777,216 hex codes (`/color/?hex=xxxxxx`). Each page: HEX/RGB/HSL/HSV/CMYK/Lab/LCh/OKLCH/XYZ, WCAG contrast badges, 6 harmonies, shades/tints/tones, 50–950 token scale, 7 color-vision simulations, CSS/Tailwind/SCSS/Swift/Android/Flutter code, FAQ schema.
- **8 free tools**: converter, contrast checker, palette generator, gradient generator, image color picker, color-blindness simulator, shades & tints, random color.
- **Content**: 12 original long-form guides, 24 curated palettes, videos page (click-to-load YouTube, privacy-enhanced).
- **Revenue**: AdSense auto ads (`ca-pub-6620975821265271`) on every page except 404, `ads.txt`; 3-step lead-gen quote form + lead CTAs on every color/tool/guide page; donation pledges; sponsor/advertise media-kit form; #000098 Palette Challenge contest; careers/talent form.
- **Compliance**: Privacy, Terms, Disclaimer, Cookies (with consent notice → non-personalized ads), Accessibility, Trademark & Copyright disclosure, About, Contact.
- Top bar on every page links to `https://web.works/contact` for website/domain/sponsorship/advertising/partnership inquiries.

## Forms and email
All forms post through FormSubmit's AJAX endpoint. The destination inbox is assembled in JavaScript at submit time and never appears in page text or plain source. **The first submission triggers a one-time FormSubmit activation email to the inbox — click "Activate" once.**

## Build
Pages are generated from `_build/` by Node (no dependencies):
```
node _build/build.js
```
GitHub Actions (`.github/workflows/pages.yml`) runs this on every push to `main` and deploys to GitHub Pages.

## Go live
1. Repo → **Settings → Pages → Build and deployment → Source: GitHub Actions** (if not already set by the workflow).
2. Site URL: `https://webworksa1.github.io/000098-com/`
3. Custom domain: add `000098.com` in Settings → Pages, set DNS A records to `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153` and `www` CNAME → `webworksa1.github.io`, then enable **Enforce HTTPS**.
4. Submit `https://000098.com/sitemap.xml` in Google Search Console, then request AdSense review on the custom domain.

## Edit before launch
- Contest prize amounts (`contests.html` section in `_build/build.js`).
- Service package prices (`services.html` section).

© 2026 000098.com. "000098" is used as a hex color value and domain name; no claim is made to third-party marks.
