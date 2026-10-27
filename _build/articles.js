// Original long-form guides (the content backbone for AdSense approval)
module.exports = [
{
slug: 'hex-color-codes-explained', title: 'Hex color codes explained: how #000098 and every other code works', desc: 'A plain-English guide to hexadecimal color codes: what the six digits mean, how to read them, shorthand, alpha and how to convert to RGB.', date: '2026-10-20', mins: 7, video: ['yDTr1TxRnwU', 'Understanding HEX color codes for web design'],
body: `
<p>Every color on a web page can be written as a hex code: a hash sign followed by six characters, such as <a href="../color/000098.html">#000098</a>. Designers copy them between tools, developers paste them into CSS, and brand guidelines list them next to Pantone and CMYK values. Once you understand the pattern, you can read a hex code almost as easily as a sentence.</p>
<h2 id="digits">The six digits are three pairs</h2>
<p>A hex code is three two-digit numbers stuck together: <b>RR GG BB</b>. Each pair says how much red, green and blue light a screen pixel should emit. The digits are hexadecimal (base 16), so they run 0–9 and then A–F, where A means 10 and F means 15. Two hex digits can therefore express 16 × 16 = 256 values, from 00 (none) to FF (full).</p>
<p>Take #000098. Red is <code>00</code>, green is <code>00</code>, and blue is <code>98</code>. Converting 98 from hex: 9 × 16 + 8 = 152. So #000098 is rgb(0, 0, 152): no red, no green and blue at about 60% of maximum. That is why it looks like deep ink or navy.</p>
<h2 id="convert">Converting hex to RGB by hand</h2>
<ol><li>Split the code into three pairs.</li><li>For each pair, multiply the first digit by 16 and add the second digit.</li><li>Write the three results as rgb(R, G, B).</li></ol>
<p>Example: #3A7BD5 → 3A = 3×16+10 = 58, 7B = 7×16+11 = 123, D5 = 13×16+5 = 213, giving rgb(58, 123, 213). Our <a href="../tools/converter.html">color converter</a> does this instantly and also returns HSL, CMYK, Lab and OKLCH.</p>
<h2 id="count">How many hex colors are there?</h2>
<p>With 256 levels per channel there are 256³ = 16,777,216 possible codes, from #000000 (black) to #FFFFFF (white). Human vision can distinguish a large share of these on a good display, which is why "24-bit color" became the standard for the web.</p>
<h2 id="shorthand">Shorthand and alpha</h2>
<p>When each pair repeats a digit, CSS lets you shorten the code to three characters: #0099CC becomes #09C. #000098 cannot be shortened because 98 is not a repeated pair. Modern CSS also accepts eight-digit codes, where the last pair is opacity: #00009880 is #000098 at roughly 50% opacity (80 hex = 128 of 255).</p>
<h2 id="reading">Reading a code at a glance</h2>
<ul><li><b>Equal pairs</b> (#777777) are grays.</li><li><b>Low numbers</b> mean dark, <b>high numbers</b> mean light.</li><li><b>The biggest pair wins the hue:</b> a large first pair is reddish, a large middle pair greenish, a large last pair bluish.</li><li><b>Two high pairs mix:</b> red + green = yellow, green + blue = cyan, red + blue = magenta.</li></ul>
<h2 id="case">Upper or lower case?</h2>
<p>Hex codes are case-insensitive: #00ff99 and #00FF99 are identical, as are #AbCdEf and #abcdef. Pick one style for your codebase and stick with it so diffs and searches stay clean.</p>
<h2 id="limits">Where hex falls short</h2>
<p>Hex describes sRGB, the standard color space of most screens. It is not designed for print (use <a href="rgb-vs-cmyk-for-print.html">CMYK</a>), and it is not perceptually even: the same numeric step can look large in one hue and tiny in another. For building scales and themes, newer formats such as <a href="modern-css-color-formats-oklch.html">OKLCH</a> are easier to reason about. Hex remains the universal shorthand everyone understands, which is why it is still the default in design tools and brand books.</p>`
},
{
slug: 'color-theory-basics', title: 'Color theory basics for designers and marketers', desc: 'The color wheel, harmonies, value and saturation, and the 60-30-10 rule, explained with practical examples you can apply today.', date: '2026-10-18', mins: 8, video: ['YeI6Wqn4I78', 'Color theory basics: the color wheel and color harmonies'],
body: `
<p>Color theory is a set of practical rules for choosing colors that work together. You do not need art school to use it. Three ideas cover most real-world decisions: the color wheel, the three properties of a color, and how much of each color to use.</p>
<h2 id="wheel">The color wheel</h2>
<p>A color wheel arranges hues in a circle so that relationships are easy to see. Digital tools use an RGB-based wheel where red sits at 0°, green at 120° and blue at 240°. Our flagship <a href="../color/000098.html">#000098</a> sits exactly at 240°: pure blue, darkened.</p>
<h2 id="harmonies">Harmonies that reliably work</h2>
<ul>
<li><b>Complementary</b>: two hues 180° apart, such as navy and olive-gold. Maximum contrast; use one as the dominant color and the other as an accent.</li>
<li><b>Analogous</b>: neighbours within about 30°. Calm and cohesive; common in nature photography and wellness brands.</li>
<li><b>Triadic</b>: three hues 120° apart. Lively and balanced, but needs one dominant color to avoid chaos.</li>
<li><b>Split complementary</b>: a base plus the two hues beside its complement. Softer than straight complementary and easier to balance.</li>
<li><b>Monochromatic</b>: one hue in several lightness steps. Elegant and very hard to get wrong.</li>
</ul>
<p>Every color page on this site lists all five harmonies automatically, and the <a href="../tools/palette-generator.html">palette generator</a> builds them with one key press.</p>
<h2 id="properties">Hue, saturation and value</h2>
<p><b>Hue</b> is the family (blue, red). <b>Saturation</b> (or chroma) is intensity: vivid versus grayish. <b>Value</b> (lightness) is how light or dark it is. Most palettes that "feel off" fail on value, not hue. A quick test: convert your design to grayscale. If headings, buttons and backgrounds blur into each other, you need more value contrast, regardless of the hues.</p>
<h2 id="temperature">Warm and cool</h2>
<p>Reds, oranges and yellows feel warm and appear to come forward. Blues, greens and violets feel cool and recede. Designers exploit this by using a cool background with a warm call-to-action button so the button pops.</p>
<h2 id="603010">The 60-30-10 rule</h2>
<p>Borrowed from interior design, this rule says roughly 60% of a layout should be a dominant neutral or brand color, 30% a secondary color and 10% an accent. On a website that might be 60% off-white background, 30% deep navy for headers and footers, and 10% bright yellow for buttons and highlights. It is a starting point, not a law, but it prevents the most common mistake: giving every color equal weight.</p>
<h2 id="context">Context changes color</h2>
<p>The same swatch looks different on white than on black, and next to a complementary color it looks more saturated. Always judge a palette in the layout where it will live. The previews on each color page and the <a href="../tools/contrast-checker.html">contrast checker</a> help you do that before you commit.</p>
<h2 id="process">A five-minute process</h2>
<ol><li>Choose one base color that fits the message.</li><li>Pick a harmony type that matches the mood (calm = analogous, bold = complementary).</li><li>Add a light and a dark neutral tinted with the base hue.</li><li>Assign 60-30-10 roles.</li><li>Check text contrast and test in grayscale.</li></ol>`
},
{
slug: 'wcag-color-contrast-guide', title: 'WCAG color contrast: a practical guide to accessible colors', desc: 'What contrast ratios mean, the AA and AAA thresholds in WCAG 2.2, how they are calculated and how to fix colors that fail.', date: '2026-10-16', mins: 8,
body: `
<p>Contrast is the difference in brightness between text and its background. Too little and people with low vision, older eyes or a phone in sunlight cannot read your content. The Web Content Accessibility Guidelines (WCAG) turn this into measurable thresholds that many laws and procurement rules reference.</p>
<h2 id="thresholds">The thresholds</h2>
<table class="vals"><tr><th>Content</th><td style="font-family:inherit">Level AA</td><td style="font-family:inherit">Level AAA</td></tr>
<tr><th>Normal text</th><td>4.5:1</td><td>7:1</td></tr>
<tr><th>Large text (24px, or 18.66px bold)</th><td>3:1</td><td>4.5:1</td></tr>
<tr><th>Icons, borders, focus rings (1.4.11)</th><td>3:1</td><td>—</td></tr></table>
<p>Ratios run from 1:1 (identical colors) to 21:1 (black on white). #000098 on white scores 14.45:1, comfortably above AAA, which is one reason deep navies are so popular for text and headers.</p>
<h2 id="math">How the ratio is calculated</h2>
<p>Each color is converted to <i>relative luminance</i>: the sRGB channel values are linearised (undoing gamma), then weighted 0.2126 red, 0.7152 green and 0.0722 blue, reflecting how sensitive the eye is to each. The ratio is (L1 + 0.05) / (L2 + 0.05), where L1 is the lighter color. The weighting explains a surprise many designers hit: pure blue is very dark to the eye, and pure yellow very light, even though both are "100%" in RGB.</p>
<h2 id="fix">How to fix a failing pair</h2>
<ul><li><b>Change lightness, not hue.</b> Darken the text or lighten the background in small steps until the ratio passes. Our <a href="../tools/contrast-checker.html">contrast checker</a> suggests the closest passing shade automatically.</li><li><b>Reserve brand colors for large elements.</b> A bright brand orange may fail for body text but pass for a 24px heading or a button with dark text.</li><li><b>Never rely on color alone.</b> Pair red error states with an icon and a message; underline links in body text.</li><li><b>Check hover and disabled states</b>, placeholder text and text over images or gradients.</li></ul>
<h2 id="apca">What about APCA and WCAG 3?</h2>
<p>A newer model called APCA, proposed for future WCAG versions, accounts for font size, weight and polarity (dark-on-light versus light-on-dark). It is still a draft. For compliance today, use the WCAG 2.x ratio, and treat APCA as a useful second opinion, especially for dark mode.</p>
<h2 id="workflow">Build contrast into your workflow</h2>
<ol><li>Define text and background tokens first, then accents.</li><li>Test every token pair you actually use, not just the main one.</li><li>Document the passing pairs in your style guide so nobody has to guess.</li><li>Re-test when you add dark mode; a pair that passes on white often fails on near-black.</li></ol>
<p>Each color page on 000098 shows its contrast against black and white with pass/fail badges, so you can screen a color in seconds before designing with it.</p>`
},
{
slug: 'color-psychology-in-marketing', title: 'Color psychology in marketing: what the evidence actually says', desc: 'How color influences recognition, attention and perception in branding and conversion, which claims are myths, and how to test colors properly.', date: '2026-10-14', mins: 7, video: ['ENEfhYeGT_U', 'How to use color psychology in marketing and branding'],
body: `
<p>Color psychology is full of confident charts: blue means trust, red means hunger, green means money. Some of it holds up, much of it is overstated. Here is a sober view you can actually use for branding and conversion decisions.</p>
<h2 id="works">What is reasonably well supported</h2>
<ul><li><b>Color aids recognition.</b> Consistent use of a distinctive color makes a brand easier to spot on a shelf or in a feed. The effect comes from consistency and distinctiveness, not from the specific hue.</li><li><b>Fit matters more than the color itself.</b> Studies on brand personality find people judge whether a color seems appropriate for the product. A playful pink suits a candy brand better than a law firm.</li><li><b>Contrast drives attention.</b> An element that differs from its surroundings gets noticed. A "red button beats green" test usually measures contrast with the page, not redness.</li><li><b>Cultural meaning is real.</b> White is associated with weddings in much of the West and with mourning in parts of East Asia; red is lucky in China; saffron carries religious significance in India.</li></ul>
<h2 id="myths">Claims to treat with caution</h2>
<ul><li>That a single color produces a specific emotion in everyone. Personal experience and culture override generic associations.</li><li>Precise statistics such as "90% of snap judgments are based on color" that circulate without a traceable study.</li><li>That changing a button color will lift conversions by a fixed percentage on your site. Results do not transfer between pages.</li></ul>
<h2 id="common">Common associations (useful defaults)</h2>
<p>With those caveats, broad associations can guide a first draft. Deep blues such as <a href="../color/000098.html">#000098</a> read as stable, serious and competent, which is why finance, technology and healthcare use them. Greens suggest growth and health. Reds and oranges suggest energy and urgency. Black suggests premium and modern. Pastels suggest softness and approachability.</p>
<h2 id="test">How to test colors properly</h2>
<ol><li>Change one thing at a time and keep the copy constant.</li><li>Run the test long enough to reach statistical significance, usually thousands of visitors per variant for typical conversion rates.</li><li>Measure the outcome you care about (sign-ups, revenue), not clicks alone.</li><li>Check accessibility; a variant that wins but fails contrast is a liability.</li></ol>
<h2 id="takeaway">The takeaway</h2>
<p>Choose colors that fit your audience and category, make them distinctive versus competitors, use them consistently, and give your calls to action strong contrast. That combination beats any color-meaning chart.</p>`
},
{
slug: 'how-to-choose-brand-colors', title: 'How to choose brand colors: a step-by-step system', desc: 'A repeatable process to pick primary, secondary and neutral brand colors, test them for accessibility and document them in a style guide.', date: '2026-10-12', mins: 9, video: ['-4L50dvXvLg', 'How to choose your brand colors'],
body: `
<p>A brand palette is more than a favourite color. It is a small system that has to work on a logo, a website, a slide deck, packaging and a social post, for people with and without color vision deficiency. Here is a process that works for startups and established companies alike.</p>
<h2 id="position">1. Start from positioning, not taste</h2>
<p>Write three adjectives the brand should evoke (for example: precise, calm, premium) and list your five closest competitors with their main colors. The goal is a color that fits the adjectives and stands apart from the competitor list. If every competitor is bright blue, a deep navy with a gold accent or a dark green may be more ownable.</p>
<h2 id="primary">2. Pick one primary color</h2>
<p>Choose the hue first, then the exact shade. Deep, saturated shades like <a href="../color/000098.html">#000098</a> give you room to build lighter tints for backgrounds; mid-tones are versatile for buttons; very light colors rarely work as primaries because they fail contrast with white.</p>
<h2 id="secondary">3. Add a secondary and an accent</h2>
<p>Use a harmony: a complementary or split-complementary accent for calls to action, and an analogous secondary for illustrations and charts. Generate options in the <a href="../tools/palette-generator.html">palette generator</a> and lock the primary while you explore.</p>
<h2 id="neutrals">4. Build tinted neutrals</h2>
<p>Pure grays look flat next to a strong brand color. Mix a little of the primary into your darkest text color and your lightest background. Navy brands often use a blue-black for text and a cool off-white for backgrounds.</p>
<h2 id="scale">5. Create scales</h2>
<p>Each brand color needs light and dark variants for hover states, backgrounds and borders. A 50–950 scale (as used by Tailwind CSS) is a practical standard. Every color page on 000098 generates one, ready to paste.</p>
<h2 id="test">6. Test accessibility and context</h2>
<ul><li>Check every text/background pair you plan to use in the <a href="../tools/contrast-checker.html">contrast checker</a>.</li><li>Run the palette through the <a href="../tools/color-blindness-simulator.html">color blindness simulator</a>, especially if you rely on red versus green.</li><li>Print a test page; screens and paper differ.</li><li>Place the logo on photos, dark mode and partner co-branding.</li></ul>
<h2 id="document">7. Document everything</h2>
<p>A one-page style guide should list each color's name, role, HEX, RGB, CMYK and any spot-color equivalent from your printer, plus approved pairings and "do not" examples. Store design tokens in code so the website and apps stay in sync.</p>
<h2 id="help">Need help?</h2>
<p>If you would rather have this done for you, our <a href="../services.html">brand color system service</a> delivers a tested palette, tokens and a style guide at a fixed price.</p>`
},
{
slug: 'rgb-vs-cmyk-for-print', title: 'RGB vs CMYK: getting screen colors to print correctly', desc: 'Why colors shift between screen and paper, how RGB and CMYK differ, and a checklist for converting brand colors like #000098 for print.', date: '2026-10-10', mins: 7,
body: `
<p>A brand blue that glows on a laptop can turn dull or purple on a business card. The reason is physics: screens and printers make color in opposite ways.</p>
<h2 id="additive">RGB is additive light</h2>
<p>Screens start black and add red, green and blue light. More light means brighter colors, and all three at full strength make white. Screens can show very saturated blues and greens because they emit light directly.</p>
<h2 id="subtractive">CMYK is subtractive ink</h2>
<p>Printers start with white paper and add cyan, magenta, yellow and black (K) inks, each of which absorbs some light. More ink means darker colors. The range of colors ink can reproduce (its gamut) is smaller than a typical screen's, especially for vivid blues, greens and oranges.</p>
<h2 id="example">Example: #000098</h2>
<p>A naive formula converts <a href="../color/000098.html">#000098</a> to CMYK 100 / 100 / 0 / 40. In practice, 100% cyan plus 100% magenta plus 40% black is a very heavy ink load (240% total) and may print muddy or purple depending on the press. A printer using a proper ICC profile will often produce a different, better recipe. Treat online CMYK numbers as a starting point, not a final spec.</p>
<h2 id="checklist">Conversion checklist</h2>
<ol><li><b>Ask your printer</b> which profile they use (for example, a coated or uncoated paper profile) and convert with it in your design software.</li><li><b>Request a hard proof</b> for anything you will print in volume.</li><li><b>Consider spot colors</b> for critical brand colors on stationery and packaging; a spot ink matches more consistently than a CMYK mix.</li><li><b>Watch total ink coverage.</b> Many presses recommend staying under 280–320%.</li><li><b>Use rich black</b> (for example 60/40/40/100) for large black areas, but plain 100% K for small text.</li><li><b>Paper matters.</b> Uncoated paper absorbs more ink, so colors look darker and less saturated.</li></ol>
<h2 id="guide">Document both</h2>
<p>Your style guide should list separate, tested values for screen (HEX/RGB) and print (CMYK and any spot color). Do not let anyone convert on the fly from the hex code.</p>`
},
{
slug: 'dark-mode-color-palettes', title: 'Designing dark mode palettes that are easy on the eyes', desc: 'Practical rules for dark mode: surface colors, elevation, desaturated accents, contrast pitfalls and how to adapt a navy brand palette.', date: '2026-10-08', mins: 6,
body: `
<p>Dark mode is not simply inverted light mode. Pure black backgrounds with pure white text cause glare and halo effects for many readers, and saturated brand colors can vibrate against dark surfaces. A few rules make dark themes comfortable.</p>
<h2 id="surfaces">Use dark grays or tinted darks, not pure black</h2>
<p>Most design systems use a base surface between about #121212 and #1E1E1E, or a tinted near-black that echoes the brand. A navy brand can use a blue-black such as #0B0D24 for the background and slightly lighter navy for cards. Lighter surfaces indicate elevation: the higher a card sits, the lighter it gets.</p>
<h2 id="text">Soften text</h2>
<p>Use off-white (around 87–90% white) for body text and a dimmer value for secondary text. Check both against your surface; secondary text is where dark themes most often fail WCAG.</p>
<h2 id="accents">Desaturate and lighten accents</h2>
<p>A deep brand color like <a href="../color/000098.html">#000098</a> has excellent contrast on white but almost none on a dark background (about 1.45:1 against black). In dark mode, switch to a lighter tint from its scale, such as a periwinkle around #8C8CFF, for links and buttons. The token stays "brand primary"; only its value changes per theme.</p>
<h2 id="states">Rethink states and shadows</h2>
<ul><li>Shadows barely show on dark surfaces; use lighter surfaces or subtle borders for depth.</li><li>Error reds and success greens usually need lighter, less saturated versions.</li><li>Focus rings need 3:1 contrast against the dark surface too.</li></ul>
<h2 id="images">Images and charts</h2>
<p>Reduce the brightness of large photos slightly and give charts a dark-mode palette. Many chart colors chosen for white backgrounds become illegible on dark ones.</p>
<h2 id="tokens">Implement with tokens</h2>
<p>Define semantic tokens (surface, text, primary, border) and map them to different values per theme with CSS custom properties and <code>prefers-color-scheme</code>. Generate the light and dark variants from the same 50–950 scale shown on every color page here.</p>`
},
{
slug: 'navy-blue-in-branding', title: 'Deep navy blues like #000098 in branding and design', desc: 'Why dark saturated blues dominate finance, tech and public institutions, how #000098 compares to navy and dark blue, and palettes that pair with it.', date: '2026-10-06', mins: 7,
body: `
<p>Deep blues are among the most used colors in corporate identity. They look serious without the harshness of black, print reliably on most stock, and pass contrast with white text easily. <a href="../color/000098.html">#000098</a>, the namesake of this site, is a textbook example: a pure 240° hue at about 30% lightness.</p>
<h2 id="compare">How #000098 compares with its neighbours</h2>
<table class="vals"><tr><th>Color</th><td style="font-family:inherit">HEX</td><td style="font-family:inherit">Note</td></tr>
<tr><th>Navy (CSS)</th><td><a href="../color/000080.html">#000080</a></td><td style="font-family:inherit">Darker; the classic named navy</td></tr>
<tr><th>Dark Blue (CSS)</th><td><a href="../color/00008b.html">#00008B</a></td><td style="font-family:inherit">Closest named color to #000098</td></tr>
<tr><th>#000098</th><td><a href="../color/000098.html">#000098</a></td><td style="font-family:inherit">Slightly brighter, more ink-like</td></tr>
<tr><th>Web-safe</th><td><a href="../color/000099.html">#000099</a></td><td style="font-family:inherit">Nearest of the 216 web-safe colors</td></tr>
<tr><th>Medium Blue (CSS)</th><td><a href="../color/0000cd.html">#0000CD</a></td><td style="font-family:inherit">Noticeably brighter</td></tr>
<tr><th>Midnight Blue (CSS)</th><td><a href="../color/191970.html">#191970</a></td><td style="font-family:inherit">Grayer and softer</td></tr></table>
<h2 id="why">Why institutions choose deep blue</h2>
<ul><li><b>Perceived stability:</b> dark blues are consistently rated as dependable and professional in brand-personality studies.</li><li><b>Legibility:</b> white on #000098 is 14.45:1, so it works for headers, footers and buttons.</li><li><b>Low risk across cultures:</b> blue has fewer strongly negative associations worldwide than many other hues.</li></ul>
<p>The downside is crowding: if every competitor is blue, a navy identity needs a distinctive accent, typography or shape language to stand out.</p>
<h2 id="pairings">Palettes that work with #000098</h2>
<ul><li><b>Navy + gold:</b> #000098 with a warm yellow such as #D9D02A or #F2C14E for premium and academic brands.</li><li><b>Navy + coral:</b> #000098 with #FF6F61 for a friendlier consumer feel.</li><li><b>Navy monochrome:</b> #000098, #3333B0, #8C8CFF and #E7E8F8 for calm, data-heavy interfaces.</li><li><b>Navy + teal:</b> #000098 with #2A9D8F for health and sustainability.</li></ul>
<p>Open any of these in the <a href="../tools/palette-generator.html?base=000098">palette generator</a> to explore variations.</p>
<h2 id="print">Printing deep blue</h2>
<p>Very saturated blues sit near the edge of what CMYK inks can reproduce. Ask for a proof, and consider a spot color for logos. See our guide to <a href="rgb-vs-cmyk-for-print.html">RGB vs CMYK</a>.</p>`
},
{
slug: 'color-in-ai-image-prompts', title: 'Using exact colors in AI image and design prompts', desc: 'How to get AI image generators and AI design tools to respect brand colors: prompt wording, hex codes, palettes and post-processing.', date: '2026-10-04', mins: 6,
body: `
<p>AI image generators are good at mood and style but often loose with exact colors. If you need on-brand output, a little structure in your prompt and a quick correction step go a long way.</p>
<h2 id="words">Describe color in words and numbers</h2>
<p>Most image models were trained on captions, which use color names far more often than hex codes. Combine both: "deep ink-navy blue (#000098) background, warm gold accents (#D9D02A)". The name steers the model; the hex code helps tools that do parse it, and documents your intent.</p>
<h2 id="palette">Give a palette, not just a color</h2>
<p>State the proportions: "mostly off-white background, deep navy typography and shapes, small gold highlights". This mirrors the 60-30-10 rule and reduces the chance the model floods the image with your accent color.</p>
<h2 id="constraints">Constrain what you do not want</h2>
<p>Many tools support negative prompts or exclusions. Excluding "purple tint, neon, rainbow" helps keep a navy brand from drifting toward violet, a common failure with saturated blues.</p>
<h2 id="reference">Use reference images</h2>
<p>Where supported, upload a swatch image or a previous on-brand asset as a style reference. A simple image of your palette stripes, exported from the <a href="../tools/palette-generator.html">palette generator</a>, works surprisingly well.</p>
<h2 id="fix">Correct colors afterwards</h2>
<ol><li>Pick the generated colors with the <a href="../tools/image-color-picker.html">image color picker</a>.</li><li>Compare them with your brand values using the contrast checker or the color pages.</li><li>Use a selective color or hue/saturation adjustment in an editor to shift them back on brand.</li></ol>
<h2 id="design-tools">AI design and code tools</h2>
<p>Tools that generate layouts or code respond best to explicit design tokens. Paste a CSS variable block (each color page has one) and instruct the tool to use only those variables. That keeps generated components on brand and easy to retheme later.</p>
<h2 id="rights">Rights and disclosure</h2>
<p>Check the terms of the AI tool you use for commercial rights, and follow platform rules on labelling AI-generated images where required.</p>`
},
{
slug: 'history-of-blue-pigments', title: 'A short history of blue pigments, from Egyptian blue to YInMn', desc: 'How humans made blue: Egyptian blue, ultramarine from lapis lazuli, indigo, Prussian blue, cobalt and the 2009 discovery of YInMn blue.', date: '2026-10-02', mins: 7,
body: `
<p>Blue was once one of the hardest and most expensive colors to make. Its history explains why deep blues still carry associations of value and authority, the same associations a modern hex code like <a href="../color/000098.html">#000098</a> borrows on screen.</p>
<h2 id="egyptian">Egyptian blue</h2>
<p>Ancient Egyptians produced one of the first synthetic pigments, a calcium copper silicate now called Egyptian blue, from roughly the third millennium BCE. It was made by heating sand, copper minerals and lime, and it was used on tomb paintings and statues across the Mediterranean world.</p>
<h2 id="ultramarine">Ultramarine</h2>
<p>Natural ultramarine was ground from lapis lazuli, mined for centuries in the Badakhshan region of present-day Afghanistan. In Renaissance Europe it could cost more than gold, so painters reserved it for the most important figures in a picture. Its name means "beyond the sea", a reference to the long journey the stone made.</p>
<h2 id="indigo">Indigo</h2>
<p>Indigo dye, extracted from plants such as Indigofera, has been used for thousands of years, notably in India, which gave the dye its name through Greek and Latin. It colored textiles worldwide and today is best known as the blue of denim, now mostly produced synthetically.</p>
<h2 id="prussian">Prussian blue</h2>
<p>Discovered by accident in Berlin in the early 1700s, Prussian blue was one of the first modern synthetic pigments. It was cheaper than ultramarine and spread quickly through European painting and later into blueprints, whose name comes from the cyanotype process that used related iron compounds.</p>
<h2 id="cobalt">Cobalt and synthetic ultramarine</h2>
<p>French chemist Louis Jacques Thénard developed cobalt blue in 1802. In the 1820s a prize offered in France led to a cheap synthetic ultramarine, credited to Jean-Baptiste Guimet, which finally made the most prized blue affordable.</p>
<h2 id="yinmn">YInMn blue</h2>
<p>In 2009 a team led by Mas Subramanian at Oregon State University accidentally created a new inorganic blue pigment while researching electronic materials. Named YInMn after its yttrium, indium and manganese content, it is notably stable and reflects infrared light, which interests manufacturers of cool roofs and coatings.</p>
<h2 id="screen">From pigment to pixel</h2>
<p>On screens, blue costs nothing: #000098 is just a number. But the cultural weight of centuries of precious blues is part of why navy still looks trustworthy and premium in modern branding.</p>`
},
{
slug: 'modern-css-color-formats-oklch', title: 'Modern CSS color: hex, rgb(), hsl(), lab(), oklch() and color-mix()', desc: 'A developer guide to every CSS color format, when to use OKLCH, how color-mix() works and how to build accessible themes with them.', date: '2026-09-30', mins: 8,
body: `
<p>CSS now supports far more than hex codes. Modern browsers understand perceptual color spaces and can mix colors natively. Here is what each format is good for.</p>
<h2 id="hex">Hex and rgb()</h2>
<p><code>#000098</code> and <code>rgb(0 0 152)</code> describe the same sRGB color. Modern syntax drops commas and accepts alpha with a slash: <code>rgb(0 0 152 / 50%)</code>. Use these for compatibility and for values copied from design tools.</p>
<h2 id="hsl">hsl()</h2>
<p><code>hsl(240 100% 29.8%)</code> is the same color again, expressed as hue, saturation and lightness. HSL is easy to tweak by hand, but its lightness is not perceptual: a yellow and a blue at 50% lightness look very different in brightness.</p>
<h2 id="lab">lab() and lch()</h2>
<p>CIE Lab and its polar form LCh are designed around human perception. Equal numeric changes look roughly equal. They also describe colors outside sRGB, useful for wide-gamut displays.</p>
<h2 id="oklch">oklch(): the practical choice for design systems</h2>
<p>OKLCH is a refinement of LCh with more even hue behaviour. #000098 is roughly <code>oklch(30.7% 0.213 264)</code>. Because lightness is perceptual, you can build a scale by stepping L while keeping chroma and hue fixed, and get visually even steps. It is supported in all current major browsers.</p>
<pre><code>:root {
  --brand-l: 30.7%;
  --brand: oklch(var(--brand-l) 0.213 264);
  --brand-soft: oklch(92% 0.04 264);
}</code></pre>
<h2 id="mix">color-mix()</h2>
<p><code>color-mix()</code> blends two colors in a chosen space, which is perfect for hover states and tints without hard-coding values:</p>
<pre><code>.button:hover {
  background: color-mix(in oklch, var(--brand) 85%, white);
}</code></pre>
<p>Mixing in OKLCH avoids the grayish midpoints you sometimes get when mixing in sRGB.</p>
<h2 id="fallback">Fallbacks</h2>
<p>For older browsers, declare a hex fallback first and the modern value second; browsers ignore what they do not understand.</p>
<pre><code>color: #000098;
color: oklch(30.7% 0.213 264);</code></pre>
<h2 id="tools">Get the values</h2>
<p>Every color page on 000098 lists HEX, RGB, HSL, Lab, LCh and OKLCH with copy buttons, and the <a href="../tools/converter.html">converter</a> accepts any of them as input.</p>`
},
{
slug: 'designing-for-color-blindness', title: 'Designing for color blindness: practical rules', desc: 'Types of color vision deficiency, which color pairs cause problems, and design patterns that keep charts, forms and maps readable for everyone.', date: '2026-09-28', mins: 6,
body: `
<p>Around 1 in 12 men and 1 in 200 women of Northern European ancestry have some form of color vision deficiency (CVD). On a site with thousands of visitors, that is a meaningful share of your audience.</p>
<h2 id="types">The main types</h2>
<ul><li><b>Deuteranomaly and deuteranopia</b> (green cone weak or missing): the most common, making reds and greens hard to separate.</li><li><b>Protanomaly and protanopia</b> (red cone affected): reds also look darker.</li><li><b>Tritanomaly and tritanopia</b> (blue cone affected): rare; blues and greens, and yellows and pinks, get confused.</li><li><b>Achromatopsia</b>: very rare complete color blindness.</li></ul>
<h2 id="pairs">Risky pairs</h2>
<p>Red/green, green/brown, blue/purple, light green/yellow and green/gray at similar lightness. Deep blue paired with yellow or orange, such as <a href="../color/000098.html">#000098</a> with gold, remains distinguishable for the common red–green types, which is why blue/orange palettes are popular for charts.</p>
<h2 id="rules">Rules that work</h2>
<ol><li><b>Do not use color as the only signal.</b> Add icons, labels, patterns or text to error, success and status states.</li><li><b>Vary lightness</b> as well as hue, so colors differ even in grayscale.</li><li><b>Label charts directly</b> instead of relying on a color legend.</li><li><b>Use patterns or shapes</b> in maps and charts with many categories.</li><li><b>Underline links</b> in body text.</li><li><b>Test</b> with the <a href="../tools/color-blindness-simulator.html">color blindness simulator</a> before shipping.</li></ol>
<h2 id="charts">Safer chart palettes</h2>
<p>A blue–orange axis, plus lightness steps, covers most needs. For many categories, research palettes designed for CVD (such as the Okabe–Ito set) are a reliable starting point.</p>
<h2 id="simulators">About simulations</h2>
<p>Simulators, including ours, use published models (Machado et al., 2009) to approximate how colors appear. They are a good screening tool, but nothing replaces feedback from real users with CVD.</p>`
}
];
