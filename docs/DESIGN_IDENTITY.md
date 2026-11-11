# ONYT — Comprehensive Design Identity, Logo, UI & Typography System
*Version 1.0.0 · Studio Grade Brand Specification*

---

## 1. Executive Summary & Brand Vibe

### 1.1 Brand Positioning
**ONYT** is an elite digital performance studio operating at the intersection of **ruthless growth strategy, category-defining brand identity, and high-performance digital engineering**. 

Unlike conventional creative agencies that sacrifice conversion for aesthetics, or performance shops that produce disposable utilitarian interfaces, ONYT synthesizes both into a unified growth engine.

```
       [ HIGH-OCTANE PERFORMANCE ]
                   ▲
                   │
    [ DEEP TECH ] ─┼─ [ EDITORIAL AESTHETICS ]
                   │
                   ▼
         [ COMPOUND SCALABILITY ]
```

### 1.2 The "Vibe" Manifesto
* **Architectural & Sculptural**: Bold structural layouts, crisp hairlines, and generous spatial breathing room.
* **Kinetic & Nocturnal**: Deep carbon foundations illuminated by visceral, incandescent flame accents. It evokes night-mode engineering terminals, supercar telemetry, and Parisian luxury editorial design.
* **Uncompromising Speed & Substance**: Zero fluff. High density of information delivered through typographic finesse, precision metrics, and tactile micro-interactions.

---

## 2. Color System & Vibe Palette

The ONYT color system balances nocturnal depth with high-visibility kinetic energy. It operates in dual modes: **Obsidian Dark (Default Vibe)** and **Gallery Bone Paper (Light Vibe)**.

### 2.1 The Signature Accent Palette ("The Kinetic Fire")
The core kinetic signature represents energy, conversion momentum, and live growth.

| Swatch | Color Name | Hex Token | RGB / HSL | Usage & Meaning |
| :--- | :--- | :--- | :--- | :--- |
| ![#FF4D00](https://via.placeholder.com/18/ff4d00/000000?text=+) | **Kinetic Flame** | `#FF4D00` | `rgb(255, 77, 0)`<br>`hsl(18, 100%, 50%)` | **Core Brand Accent**: Primary CTA buttons, live status dots, active states, key highlight glyphs. |
| ![#FF6002](https://via.placeholder.com/18/ff6002/000000?text=+) | **Radiant Amber** | `#FF6002` | `rgb(255, 96, 2)`<br>`hsl(22, 100%, 50%)` | **Glow & Gradient Catalyst**: Halo drop shadows, radiant overlays, secondary hover gradients. |
| ![#510F01](https://via.placeholder.com/18/510f01/ffffff?text=+) | **Smoldering Ember** | `#510F01` | `rgb(81, 15, 1)`<br>`hsl(9, 98%, 16%)` | **Atmospheric Depth**: Backdrop radial glows, rich shadows, deep gradient roots. |
| ![#E03102](https://via.placeholder.com/18/e03102/ffffff?text=+) | **Burnt Vermilion** | `#E03102` | `rgb(224, 49, 2)`<br>`hsl(13, 98%, 44%)` | **Light Theme Accent**: Calibrated for WCAG AAA compliance on light bone paper backgrounds. |

---

### 2.2 Obsidian Dark Mode Palette (Primary Experience)
Designed for immersive viewing, reduced eye strain, and dramatic visual contrast.

| Token | Variable | Hex / Value | Purpose |
| :--- | :--- | :--- | :--- |
| **Canvas Void** | `--bg` | `#070605` | Deep warm charcoal obsidian. Never use raw `#000000`. |
| **Elevated Surface** | `--cd` | `#100D0B` | Card containers, navigation pill, modal drawer backgrounds. |
| **Hover Surface** | `--cd-hover` | `#171310` | Interactive card hover states and elevated components. |
| **Primary Text** | `--fg` | `#F2EDE6` | Warm Alabaster chalk. Softens high-contrast glare. |
| **Muted Text** | `--mut` | `#8F8780` | Ash Taupe. Used for captions, secondary copy, timestamps. |
| **Subtle Hairline** | `--ln` | `rgba(255, 255, 255, 0.11)` | Architectural grid lines, card borders, separators. |
| **Spotlight Glow** | `--spot` | `rgba(255, 77, 0, 0.08)` | Mouse-following radial canvas torchlight. |

---

### 2.3 Gallery Bone Paper Mode (Light Experience)
Editorial, tactile, and reminiscent of archival print magazines.

| Token | Variable | Hex / Value | Purpose |
| :--- | :--- | :--- | :--- |
| **Bone Paper** | `--bg` | `#F5F1EA` | Natural unbleached organic linen paper background. |
| **Pitch Noir** | `--fg` | `#0B0907` | Near-black ink typography for maximum legibility. |
| **Crisp White** | `--cd` | `#FFFFFF` | Elevated card surfaces and floating UI panels. |
| **Slate Earth** | `--mut` | `#6B635C` | Warm stone secondary text and metadata. |
| **Graphite Line** | `--ln` | `rgba(0, 0, 0, 0.13)` | Precise architectural dividers and border envelopes. |
| **Burnt Accent** | `--ac` | `#E03102` | Deep-energy red-orange calibrated for daylight reading. |

---

### 2.4 Functional & Telemetry Tokens
Used for analytics, data indicators, badges, and operational status.

| Indicator | Hex Token | Function | Meaning |
| :--- | :--- | :--- | :--- |
| **Live Pulse** | `#00E599` | Status Indicators | Live campaign, online status, positive ROAS |
| **Electric Warning** | `#FFB800` | Alert Badges | Notice, pending reviews, budget thresholds |
| **Flux Cyan** | `#00D2FF` | Technical Tags | Engineering specs, API metrics, platform integrations |

---

## 3. Logo Architecture & Brand Mark

### 3.1 The ONYT Logotype Anatomy
The ONYT logotype is custom-proportioned in **geometric high-impact uppercase**, featuring optical weight calibration:
* **The 'O'**: A mathematically balanced rounded-rectangle oval representing complete closed-loop growth.
* **The 'N'**: Sharp architectural 45° diagonal cut, emphasizing forward directional velocity.
* **The 'Y'**: Triangular junction engineered with balanced vertical stem grounding.
* **The 'T'**: Cantilevered crossbar providing definitive structural closure.

```
   ┌───┐  ┌┐  ┌┐  \   /  ─────┬─────
   │   │  ││\ ││   \ /        │     
   │   │  ││ \││    │         │     
   └───┘  └┘  └┘    │         │     
     O      N       Y         T     
```

### 3.2 Responsive Logo Variations
1. **Primary Full Lockup (`logo-large.png` / Vector)**: Used in hero intros, website header, and global footer.
2. **Compact Mark / Monogram ("The Onyx Monolith")**: For app icons, favicons, mobile navbars, and avatar stamps.
3. **Studio Metadata Lockup**: Accompanied by subtitle: `"ONYT · Growth Studio · Est. 2026"`.

### 3.3 Clear Space & Minimum Sizing
* **Safe Zone Rule**: The clear space perimeter must equal at least **half the height of the letter 'O'** ($0.5H$) on all four quadrants.
* **Digital Minimum Size**: Height $\ge 22\text{px}$ (Navbar) | Height $\ge 40\text{px}$ (Hero).
* **Favicon / Monogram**: $32\times 32\text{px}$, $64\times 64\text{px}$, $180\times 180\text{px}$ (Apple Touch).

### 3.4 Official Vector SVG Specification
```xml
<!-- ONYT Official Monogram Mark (Scalable Vector) -->
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120" fill="none" width="120" height="120">
  <rect width="120" height="120" rx="28" fill="#100D0B" stroke="rgba(255,255,255,0.11)" stroke-width="2"/>
  <!-- Kinetic Flame Accent Core -->
  <circle cx="92" cy="28" r="7" fill="#FF4D00"/>
  <!-- Geometric "O" Aperture -->
  <path d="M32 38C32 29.1634 39.1634 22 48 22H72C80.8366 22 88 29.1634 88 38V82C88 90.8366 80.8366 98 72 98H48C39.1634 98 32 90.8366 32 82V38Z" 
        stroke="#F2EDE6" stroke-width="10" stroke-linejoin="round"/>
  <!-- Dynamic Velocity Slash -->
  <line x1="42" y1="78" x2="78" y2="42" stroke="#FF4D00" stroke-width="8" stroke-linecap="round"/>
</svg>
```

### 3.5 Brand Logo Dos & Don'ts
* ✅ **DO**: Use on high-contrast dark `#070605` or clean `#F5F1EA` surfaces.
* ✅ **DO**: Preserve original proportions and kerning.
* ❌ **DON'T**: Stretch, skew, rotate, or outline the wordmark with low-contrast strokes.
* ❌ **DON'T**: Place the logotype on busy, low-contrast photography without an scrim overlay.
* ❌ **DON'T**: Recolour the logotype into arbitrary neon colors outside `#F2EDE6`, `#FFFFFF`, or `#0B0907`.

---

## 4. Typography System ("All Type Doc")

ONYT’s typography marries **architectural brutalism** with **frictionless digital legibility**.

### 4.1 Typeface Families
1. **Primary Display**: `Bricolage Grotesque`
   * *Classification*: Expressive French Neo-Grotesque with Variable Optical Size (`opsz 12..96`, `wght 400..800`).
   * *Role*: Headlines, section titles, giant statistical numerals, marquee banners.
   * *Character*: Sharp squarish ink-traps, dramatic contrast, tight rhythm, confident authority.
2. **Primary Body & Interface**: `DM Sans`
   * *Classification*: Geometric Humanist (`wght 400, 500, 700`, with true italics).
   * *Role*: Longform reading, navigation links, button text, feature bullets, form inputs.
   * *Character*: High x-height, open apertures, fatigue-free reading at 14–16px.
3. **Telemetry & Monospace**: `JetBrains Mono` / `SF Mono` / `Space Mono`
   * *Role*: Clocks (`IST`), index numbers (`01`, `02`), ticker codes, ROAS counters (`4.2x`).

---

### 4.2 Complete Fluid Typographic Scale

| Hierarchy Level | Font Family | Size (Fluid Clamp) | Weight | Line Height | Tracking | Usage Case |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **Display XXL** | Bricolage Grotesque | `clamp(48px, 8vw, 104px)` | 800 ExtraBold | `0.95` | `-0.04em` | Hero main statements, huge footer logomarks |
| **Display XL** | Bricolage Grotesque | `clamp(36px, 5.5vw, 68px)` | 700 Bold | `1.02` | `-0.03em` | Primary section headers, case study titles |
| **Headline H1** | Bricolage Grotesque | `clamp(30px, 4vw, 54px)` | 700 Bold | `1.08` | `-0.03em` | Major service headlines, about statements |
| **Headline H2** | Bricolage Grotesque | `clamp(24px, 2.6vw, 38px)` | 700 Bold | `1.15` | `-0.025em` | Card titles, process stage headings |
| **Headline H3** | Bricolage Grotesque | `clamp(19px, 1.8vw, 26px)` | 600 SemiBold | `1.22` | `-0.02em` | Feature labels, dialog titles |
| **Body Lead** | DM Sans | `clamp(18px, 1.3vw, 22px)` | 400 Regular | `1.5` | `-0.01em` | Intro paragraphs, hero subtext |
| **Body Base** | DM Sans | `16px` | 400 Regular | `1.6` | `0` | Standard website prose, blog copy, descriptions |
| **Body Small** | DM Sans | `14px` | 400 / 500 Medium | `1.5` | `+0.01em` | Card descriptions, form labels, footer links |
| **Eyebrow / Overline** | DM Sans | `12px` | 600 SemiBold | `1.0` | `+0.2em` | Uppercase section markers with leading rule (`—`) |
| **UI Button** | DM Sans | `14px` | 500 Medium | `1.0` | `+0.02em` | Interactive CTA buttons, pills |
| **Telemetry / Code** | Space / System Mono | `12px - 13px` | 500 Medium | `1.0` | `+0.08em` | Real-time clocks, step badges, data attributes |

---

### 4.3 Typography Implementation Tokens (CSS)
```css
:root {
  /* Font Family Definitions */
  --font-display: 'Bricolage Grotesque', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  --font-body: 'DM Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  --font-mono: 'JetBrains Mono', 'Space Mono', 'SF Mono', monospace;

  /* Font Scales */
  --text-hero: clamp(48px, 8vw, 104px);
  --text-h1: clamp(30px, 4vw, 54px);
  --text-h2: clamp(24px, 2.6vw, 38px);
  --text-h3: clamp(19px, 1.8vw, 26px);
  --text-lead: clamp(18px, 1.3vw, 22px);
  --text-base: 16px;
  --text-sm: 14px;
  --text-xs: 12px;

  /* Tracking Rules */
  --tracking-tight: -0.035em;
  --tracking-normal: 0em;
  --tracking-wide: 0.08em;
  --tracking-widest: 0.2em;
}
```

---

## 5. UI Design Language & Components

### 5.1 The Spatial Grid & Layout Architecture
* **Container Max Width**: `1440px` with central alignment.
* **Fluid Padding**: `clamp(16px, 3vw, 40px)` horizontal gutters.
* **Section Rhythm**: Vertical padding clamped at `clamp(70px, 9vw, 130px)`.
* **Grid Division**: 12-column mathematical grid with `24px` gutter on desktop, collapsing to 1-column on mobile viewport ($\le 768\text{px}$).

### 5.2 Glassmorphism & Elevation System
ONYT surfaces use an architectural glass treatment instead of heavy opaque drop shadows:

```
┌──────────────────────────────────────────────┐
│  SURFACE ELEVATION 2 (MODAL / FLYOUT)        │
│  background: rgba(16, 13, 11, 0.85);         │
│  backdrop-filter: blur(20px);                │
│  border: 1px solid rgba(255, 255, 255, 0.16);│
│  box-shadow: 0 24px 60px rgba(0,0,0,0.6);   │
└──────────────────────────────────────────────┘
       ▲
┌──────┴───────────────────────────────────────┐
│  SURFACE ELEVATION 1 (CARD / NAV BAR)        │
│  background: var(--cd) [#100D0B];            │
│  backdrop-filter: blur(12px);                │
│  border: 1px solid var(--ln) [11% white];    │
└──────────────────────────────────────────────┘
       ▲
┌──────┴───────────────────────────────────────┐
│  BASE CANVAS (STAGE 0)                       │
│  background: var(--bg) [#070605];            │
└──────────────────────────────────────────────┘
```

---

### 5.3 UI Component Library Specifications

#### A. Interactive Buttons & CTA System
1. **Primary Kinetic Button**:
   * *Style*: Pill silhouette (`border-radius: 99px`), `background: var(--ac)` (`#FF4D00`), text white.
   * *Hover Effect*: `transform: translateY(-2px); box-shadow: 0 12px 28px -10px var(--ac);`
   * *Physics*: Spring transition `transition: all 0.35s cubic-bezier(0.2, 0.8, 0.2, 1)`.

2. **Ghost Architectural Button**:
   * *Style*: Transparent base, `border: 1px solid var(--ln)`, text `var(--fg)`.
   * *Hover Effect*: `border-color: var(--ac); color: var(--ac); background: rgba(255, 77, 0, 0.04);`

3. **Frosted Capsule Pill**:
   * *Style*: Semi-transparent frosted capsule (`backdrop-filter: blur(10px)`), delicate `border: 1px solid rgba(255,255,255,0.4)`.
   * *Hover Effect*: Full inversion to solid pure white background with pitch noir text (`#000000`).

#### B. Architectural Cards & Matrices
* **Border Radius**: `20px` continuous corner curve.
* **Border Definition**: `1px solid var(--ln)`.
* **Hover Interaction**: Delicate border transition from `11% white` to `var(--ac)` with subtle $2\text{px}$ elevation lift.
* **Internal Padding**: `clamp(24px, 3vw, 40px)`.

#### C. Live Status Indicator ("The Pulse")
* **Geometry**: $8\times 8\text{px}$ circular node.
* **Color**: Kinetic Flame (`#FF4D00`) or Live Emerald (`#00E599`).
* **Motion**: Infinite breathing pulse keyframe:
  ```css
  @keyframes bl {
    0%, 100% { opacity: 1; transform: scale(1); }
    50% { opacity: 0.25; transform: scale(0.85); }
  }
  ```

#### D. Eyebrow Tagline Anchor
* Used at the entry of every major section.
* Visual anchor: A $28\text{px}\times 1\text{px}$ horizontal hairline rule in `currentColor`, followed by $12\text{px}$ uppercase text tracked at `0.2em`.

---

## 6. Motion Language & Choreography

ONYT is defined by **inertial, tactile motion** that feels engineered rather than decorative.

### 6.1 Lenis Smooth Scroll Configuration
```typescript
const lenis = new Lenis({
  lerp: 0.09,           // Silky smooth interpolation
  smoothWheel: true,     // Custom physics wheel response
  wheelMultiplier: 1.05, // Responsive wheel drag
});
```

### 6.2 Easing Curves & Timing
* **Entrance Ease**: `cubic-bezier(0.16, 1, 0.3, 1)` (Expedited punch out with extended deceleration).
* **Hover State Ease**: `cubic-bezier(0.2, 0.8, 0.2, 1)` (Tactile immediate response).
* **Marquee Carousel**: Linear steady-state infinite scroll (`30s` per loop).

### 6.3 Typography Stagger Reveal (SplitType + GSAP)
Headings animate upward through an overflow mask with line-by-line staggered entry:
* `opacity: 0 -> 1`
* `transform: translateY(100%) -> translateY(0%)`
* `stagger: 0.06s`
* `duration: 0.9s`

---

## 7. Quick Reference Design Tokens Cheat-Sheet

```json
{
  "brand": {
    "name": "ONYT",
    "est": "2026",
    "tagline": "Performance, Brand & Digital Studio"
  },
  "colors": {
    "dark": {
      "bg": "#070605",
      "surface": "#100D0B",
      "surfaceHover": "#171310",
      "fg": "#F2EDE6",
      "muted": "#8F8780",
      "border": "rgba(255, 255, 255, 0.11)",
      "accent": "#FF4D00",
      "accentGlow": "#FF6002"
    },
    "light": {
      "bg": "#F5F1EA",
      "surface": "#FFFFFF",
      "fg": "#0B0907",
      "muted": "#6B635C",
      "border": "rgba(0, 0, 0, 0.13)",
      "accent": "#E03102"
    }
  },
  "typography": {
    "display": "Bricolage Grotesque",
    "body": "DM Sans",
    "mono": "JetBrains Mono / Space Mono"
  },
  "radii": {
    "pill": "99px",
    "card": "20px",
    "button": "99px",
    "badge": "6px"
  }
}
```

