# MAGE Landing Page — Claude Instructions

This project is the marketing landing page for **MAGE Functional Chocolates**, a D2C startup selling functional chocolate SKUs (NoNap Spell, Relief Spell, Power Spell, Calm Spell). The landing page should feel modern, minimal, and internationally polished — think Joga Bar or The Whole Truth. Premium and playful, but restrained. Color is used surgically, not atmospherically. White space is the primary design tool.

---

## Always Do First

- **Invoke the `frontend-design` skill** before writing any frontend code, every session, no exceptions.

---

## Brand Identity

**Name:** MAGE Functional Chocolates  
**Tagline:** "for the focussed sweet-tooths"  
**Mascot:** A cat (subtle magical elements — do not over-use)  
**Design philosophy:** Clean and minimal with bold typographic moments. Angular with a touch of roundness, calligraphic accents used sparingly. Color appears as a confident pop, not a background texture. International feel — could ship from Berlin or Seoul, not just India. Works for teens and 30+.

### Fonts (always use these — no substitutions)
- **Headings:** Lora (serif, slightly calligraphic, warm, intellectual premium)
- **Body / UI:** Satoshi (clean geometric sans-serif, minimal, focused)
- Load via CDN if not locally available.

### Brand Colors (never use default Tailwind palette)

**Core palette:**
| Name           | Hex       |
|----------------|-----------|
| Night Bordeaux | `#410C17` |
| Black Cherry   | `#730314` |
| Deep Saffron   | `#FF9115` |
| Honey Bronze   | `#FFBD64` |
| Neon Pink      | `#F92445` |
| Vivid Royal    | `#0211A3` |

**Background:** Near-white or pure white for the base. Brand colors appear as section accents, card fills, or typographic highlights — never as a full-page atmospheric wash. Cream is acceptable for warmth but should not dominate.

### SKU Color System
Each SKU has its own accent palette — use when featuring a specific product:
- **NoNap Spell** (focus/productivity): Navy + Deep orange + Coral orange + Golden yellow
- **Relief Spell** (women's health, periods, PCOS): Navy + Hot pink/Magenta + Light pink + Purple
- **Power Spell** (energy/athletes): Navy + Deep red/Crimson + Coral/Salmon + Cobalt blue
- **Calm Spell** (sleep/recovery): Navy + Dark teal + Medium teal + Golden yellow

### Logo & Symbolism
- Angular design with a cat-tail element
- Caffeine molecule motif (hexagon/pentagon shapes) — theme of "breaking caffeine fear"
- Calligraphic letterform modified for playfulness
- Always check `brand_assets/` for actual logo files before using placeholders

---

## Page Architecture & Key Features

### 1. Splash Screen (Entry Gate)
- A full-screen splash appears before the main landing page
- Tone: **light and playful** — brand colours, maybe a subtle mascot peek, bouncy feel
- Contains: MAGE logo + the text **"The Magic is Inside"** + a single entry button
- Entry is only via button click — no auto-dismiss, no keypress
- On button click: splash fades out, main page fades in with a smooth transition
- Animate with `opacity` and `transform` only — spring easing `cubic-bezier(0.34, 1.56, 0.64, 1)`

### 2. "I'm Interested" CTA — Primary Conversion Action
- Appears **twice**: once in the hero section, once at the bottom of the page
- The button text is **"Bewitch Me"** — use this consistently across the page, no variations
- On click: silently log the intent (timestamp + unique visitor ID to localStorage), then immediately open the **Email Capture Popup**

### 3. Email Capture Popup
- Fields: **Name** + **Email** — nothing else
- Promise: notifies user about the **first batch discount**
- On submit: show **"Consider yourself enchanted — we'll be in touch."**
- Close button (×) in top-right corner
- Backdrop blur behind popup, centered on screen
- Animate in with `transform: scale` + `opacity`

### 4. Conversion Tracking (Google Sheets Backend)
- Every page load: send a `pageview` event to Google Sheets via a Google Apps Script Web App URL
- Every CTA button click: send an `intent_click` event (before popup opens)
- Every successful email submission: send a `conversion` event with name + email (redacted in sheet if needed)
- Conversion % = `conversions / pageviews × 100` — calculated in the sheet, not on the page
- The counter is **invisible to visitors** — no public-facing number
- Store the Apps Script URL as a constant at the top of the JS — easy to swap in
- If the Apps Script URL is not yet set up, use a placeholder `GOOGLE_SHEETS_WEBHOOK_URL` constant and log events to `console.log` as fallback

### 5. Content Sections (in order)
1. **Splash** — entry gate
2. **Hero** — headline, tagline, primary CTA button
3. **Origin Story** — how MAGE started at IIT KGP (no founder names)
4. **What MAGE Does** — the four SKUs, each with its effect and accent colour
5. **Why Chocolate** — the philosophy: functional + enjoyable, theobromine, dark chocolate, Indian cacao angle saved for later
6. **Social Proof / Testimonials** — placeholder quotes, mix of student and professional voices
7. **Final CTA** — secondary "I'm Interested" button + short closing line
8. **Footer** — tagline, social handles, minimal

---

## Brand Assets Folder

**Always check `brand_assets/` before designing.** It may contain logos, color guides, style guides, or product images. If assets exist there, use them — never use placeholders where real assets are available.

If a logo file is present, use it. If a color palette file is defined, use those exact values.

---

## Reference Images

- If a reference image is provided: match layout, spacing, typography, and color **exactly**. Swap in placeholder content (images via `https://placehold.co/`, generic copy). Do not improve or add to the design.
- If no reference image: design from scratch with high craft (see Anti-Generic Guardrails below).
- Screenshot your output, compare against the reference, fix mismatches, re-screenshot. Do **at least 2 comparison rounds**. Stop only when no visible differences remain or the user says so.

---

## Local Server

- **Always serve on localhost** — never screenshot a `file:///` URL.
- Start the dev server: `node serve.mjs` (serves the project root at `http://localhost:3000`)
- `serve.mjs` lives in the project root. Start it in the background before taking any screenshots.
- If the server is already running, do not start a second instance.

---

## Screenshot Workflow

- Puppeteer is installed at `C:/Users/nateh/AppData/Local/Temp/puppeteer-test/`. Chrome cache is at `C:/Users/nateh/.cache/puppeteer/`.
- **Always screenshot from localhost:** `node screenshot.mjs http://localhost:3000`
- Screenshots are saved automatically to `./temporary screenshots/screenshot-N.png` (auto-incremented, never overwritten).
- Optional label suffix: `node screenshot.mjs http://localhost:3000 label` → saves as `screenshot-N-label.png`
- `screenshot.mjs` lives in the project root. Use it as-is.
- After screenshotting, read the PNG from `temporary screenshots/` with the Read tool — Claude can see and analyze the image directly.
- When comparing, be specific: "heading is 32px but reference shows ~24px", "card gap is 16px but should be 24px"
- Check: spacing/padding, font size/weight/line-height, colors (exact hex), alignment, border-radius, shadows, image sizing

---

## Output Defaults

- Single `index.html` file, all styles inline, unless user says otherwise
- Tailwind CSS via CDN: `<script src="https://cdn.tailwindcss.com"></script>`
- Placeholder images: `https://placehold.co/WIDTHxHEIGHT`
- Mobile-first responsive

---

## Anti-Generic Guardrails

- **Colors:** Never use default Tailwind palette (indigo-500, blue-600, etc.). Always pull from the MAGE brand palette. Use one dominant accent color per section — not multiple brand colors competing at once. Color should feel intentional and surprising, not decorative.
- **White space:** Treat negative space as a design element. Sections should breathe. Generous padding, generous margins. Never crowd elements together to fill space.
- **Shadows:** Use subtle, barely-there shadows — very low opacity, slight blur. No heavy color-tinted drop shadows. Shadows should hint at depth, not announce it.
- **Typography:** Lora for headings, Satoshi for body — always. Let typography carry visual weight: large, confident headings with tight tracking (`-0.03em`), generous line-height (`1.7`) on body. Type-led layouts over decoration-led layouts.
- **Gradients:** Use sparingly. One subtle gradient per section maximum. No SVG grain or noise textures — keep surfaces clean and flat. Texture is provided by photography and typography, not CSS filters.
- **Animations:** Only animate `transform` and `opacity`. Never `transition-all`. Use spring-style easing (`cubic-bezier(0.34, 1.56, 0.64, 1)`). Animations should feel effortless, not dramatic.
- **Interactive states:** Every clickable element needs hover, focus-visible, and active states. No exceptions.
- **Images:** Let product photography breathe — minimal overlays. A very light gradient at the bottom edge is acceptable for text legibility, nothing heavier.
- **Spacing:** Use a strict 8px base grid. Sections: 120px+ vertical padding. Component gaps: consistent multiples of 8. No random Tailwind steps.
- **Depth:** Two levels maximum — base and one elevated surface. Everything feels flat and purposeful, not layered and complex.

---

## Hard Rules

- Do not add sections, features, or content not in the reference
- Do not "improve" a reference design — match it
- Do not stop after one screenshot pass
- Do not use `transition-all`
- Do not use default Tailwind blue/indigo as primary color
- Do not invent brand colors — always use the palette defined above or in `brand_assets/`
- Do not use the SKU name "Spark Spell" — the correct name is **NoNap Spell**
- Do not use more than one brand accent color per section — restraint is the aesthetic
- Do not fill empty space with decoration, gradients, or texture — empty space is intentional
- Do not use heavy drop shadows, embossing, or skeuomorphic effects — the look is flat, clean, modern
