# 000098.com — Phase-wise build prompts

Concept: **000098.com — The #000098 Color Lab.** `000098` is a valid six-digit hex color (`#000098`, rgb(0, 0, 152), a deep ink/navy blue). The site uses that color as its flagship and grows into a full color-code reference + free design-tools hub for designers, developers, marketers, printers and AI-image/prompt creators. Revenue: Google AdSense (auto ads) on high-intent tool and reference pages, lead generation for paid brand-color / design-system work, sponsorships, donations, contests and a talent pipeline.

Why this concept wins over alternatives (numbers and logic):

| Candidate reading of "000098" | Search demand | Monetization depth | Verdict |
|---|---|---|---|
| Hex color `#000098` (deep blue) + all colors | Color-code sites rank for millions of long-tail "#xxxxxx" queries; every hex is a page | AdSense on tools (long dwell), design-service leads, affiliate | **Pick** |
| Stock / product / SKU code "000098" | Fragmented, no owner audience | Low; trademark risk | Reject |
| Year-style "98" nostalgia | Small, novelty | Low CPC | Reject |
| Lottery / lucky numbers | YMYL-adjacent, AdSense gambling restrictions | Risky | Reject |

The domain *is* the color code, so the brand is self-explanatory and every visitor who types a hex value is in the target market.

---

## Phase 0 — Foundation and brand
> Create a static website repo `000098-com` for GitHub Pages (free plan; no server, no build step required at runtime). Brand: "000098 — the #000098 Color Lab". Palette: ink `#000098`, paper `#F6F7FB`, graphite `#1B1C2E`, steel `#5E6380`, rule `#DCDFEA`, signal (complement-derived) `#D9D02A`. Type: Bricolage Grotesque (display + body), JetBrains Mono only for color values. Signature element: swatch-chip cards that look like a printer's fan deck. Add `.nojekyll`, `favicon.svg`, `site.webmanifest`, `robots.txt`, `sitemap.xml`, `ads.txt` (`google.com, pub-6620975821265271, DIRECT, f08c47fec0942fa0`), and `404.html`.

## Phase 1 — Global shell (every page)
> Build a shared header/footer generated into every page. At the very top of every page show a slim bar: "Contact, if you are interested in this website / domain name / Sponsorship / Advertisement / Partnership" linking to `https://web.works/contact`. Put the AdSense script `<script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-6620975821265271" crossorigin="anonymous"></script>` in `<head>` of every page (auto ads). Add responsive nav (Colors, Tools, Palettes, Learn, Videos, Services, Support), skip link, focus styles, reduced-motion support, cookie notice, footer with all policy links and the trademark/copyright disclosure line.

## Phase 2 — Flagship color page `/color/000098.html`
> Render everything a world-class color reference shows: big swatch, HEX/RGB/HSL/HSV/CMYK/CIE-Lab/LCH/XYZ/decimal, nearest named & web-safe colors, luminance and WCAG contrast vs white/black with AA/AAA badges, schemes (complementary, split, analogous, triadic, tetradic, monochromatic), shades/tints/tones ladders, color-blindness simulation, text/background preview, CSS/SCSS/Tailwind/SwiftUI/Android code snippets with copy buttons, meaning and usage notes, FAQ with FAQPage schema, related colors.

## Phase 3 — Programmatic color library
> Pre-generate static pages for every CSS named color and the full #000098 navy family (same template, unique computed data and description), plus `/color/` directory with search and a client-side viewer `/color/?hex=xxxxxx` that renders any of 16,777,216 colors.

## Phase 4 — Free tools (high dwell time = ad revenue)
> Build: color converter, contrast checker (WCAG 2.2), palette generator (lock + spacebar + export CSS/JSON), gradient generator, image color picker (local, no upload), color-blindness simulator, shades & tints generator, random color. All vanilla JS, mobile friendly, no external API.

## Phase 5 — Content for AdSense approval
> Write 10+ original long-form guides (hex codes explained, color theory, WCAG contrast, color psychology in marketing, choosing brand colors, RGB vs CMYK for print, dark-mode palettes, navy in branding, color for AI image prompts, history of blue pigments). Add curated palettes page and a videos page with lazy-loaded YouTube embeds (click-to-play, youtube-nocookie). Add About, Contact, Privacy, Terms, Disclaimer, Cookies, Accessibility and Trademark/Copyright pages.

## Phase 6 — Revenue engines
> **Lead generation** `/services.html`: multi-step "Get your brand color system" quote form (project type, budget, timeline, contact) with trust signals, packages and FAQ; repeat compact CTA on every color page. **Support** `/support.html`: donation pledge tiers and use-of-funds breakdown (operations, promotions/marketing, hiring, contest prizes). **Sponsor/Advertise** `/sponsor.html`. **Contests** `/contests.html` with rules, prizes and entry form. **Careers** `/careers.html` with talent application form. All forms POST via FormSubmit AJAX to the single site inbox; the address is assembled in JavaScript at submit time and never appears on the page or in plain source. Email links are generated the same way on click.

## Phase 7 — SEO, performance, compliance
> Unique title/description/canonical/OG per page, JSON-LD (WebSite + SearchAction, Organization, Article, FAQPage, BreadcrumbList), sitemap with every page, semantic HTML, alt text, lazy embeds, no layout shift, Lighthouse 90+. AdSense checklist: original content, clear navigation, policy pages, no ads on error/empty pages, no prohibited content, no incentivised clicks.

## Phase 8 — Ship
> Commit and push to `github.com/WEBWORKSA1/000098-com` (branch `main`). Enable GitHub Pages: Settings → Pages → Deploy from branch → `main` / root. Optional custom domain: add `CNAME` with `000098.com`, set DNS A records to 185.199.108.153 / .109.153 / .110.153 / .111.153 and `www` CNAME to `webworksa1.github.io`, then tick "Enforce HTTPS". Submit sitemap in Google Search Console, then apply in AdSense once the site is live on the custom domain.

## Phase 9 — Growth roadmap (expandable)
> Add `/pantone-style` style-guide downloads, brand palette database ("colors of famous industries", no third-party logos), user palette submissions (via contest form), newsletter, localized versions (Hindi, French, Spanish), AI prompt color packs, and a paid "Pro kit" (Figma/Tailwind tokens) sold through a payment link.
