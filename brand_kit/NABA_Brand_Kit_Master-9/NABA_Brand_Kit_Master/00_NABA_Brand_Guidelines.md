# NABA Brand Identity System
**National African & Black Association**  
Visual Identity Guidelines & Asset Kit  
Version 1.0 | Locked Logo System

---

## CRITICAL RULE: LOGO IS LOCKED
The provided NABA logo (lion head + upward triangle + NABA wordmark + tagline) is the **final, immutable** primary mark.  
**No redesign, no re-proportioning, no color shifts beyond defined variants, no stylistic alterations.**  
All assets, icons, lockups, and templates must derive directly from this exact geometry, stroke language, and color values.

---

## 1. Core Brand Colors (Extracted & Standardized)

| Token Name                  | Hex       | RGB              | Usage |
|----------------------------|-----------|------------------|-------|
| **Power Gold / Amber**     | `#F5A623` | 245, 166, 35    | Primary brand color – triangle, mane accents, CTAs, highlights |
| **Deep Onyx / Black**      | `#111111` | 17, 17, 17      | Lion linework, primary text, dark backgrounds |
| **Pure Black**             | `#000000` | 0, 0, 0         | High-contrast monochrome, print black |
| **Pure White**             | `#FFFFFF` | 255, 255, 255   | Light backgrounds, reverse text |
| **Warm Off-White**         | `#FAF8F5` | 250, 248, 245   | Soft light mode canvas, stationery |
| **Slate Dark**             | `#2A2A2A` | 42, 42, 42      | Secondary text, borders on dark |
| **Slate Light**            | `#E5E5E5` | 229, 229, 229   | Dividers, muted UI, light borders |
| **Gold Glow (subtle)**     | `#F5A623` @ 8–12% opacity | – | Ambient glow behind mark on dark app icons / splash |

**Design Tokens (CSS / Design System ready):**
```css
:root {
  --naba-gold: #F5A623;
  --naba-onyx: #111111;
  --naba-black: #000000;
  --naba-white: #FFFFFF;
  --naba-offwhite: #FAF8F5;
  --naba-slate-dark: #2A2A2A;
  --naba-slate-light: #E5E5E5;
  --naba-gold-glow: rgba(245, 166, 35, 0.12);
}
```

---

## 2. Typography

- **Primary Wordmark “NABA”**: Custom geometric double-line / inline sans-serif (as rendered in the locked logo). Do not substitute. When typesetting body or secondary, use a clean geometric sans that matches the spirit (e.g. Inter, Neue Haas Grotesk, or system sans with similar weight and proportions).
- **Tagline**: Clean secondary sans-serif, all-caps or title case as shown: “NATIONAL AFRICAN & BLACK ASSOCIATION”
- Recommended system fonts for UI / documents: Inter / SF Pro / Roboto (medium/bold for headings, regular for body).

Minimum clear space around logo: 0.5× the height of the triangle on all sides.

---

## 3. Primary Logo Variants (Folder 01)

| File | Description | Background |
|------|-------------|------------|
| NABA_Full_Lockup_Light_BG.png / .jpg | Full color logo (triangle + lion + NABA + tagline) | Transparent / white |
| NABA_Full_Lockup_Dark_BG.png | Same mark reversed for dark backgrounds (gold remains vibrant) | Dark / #111111 |
| NABA_Transparent_Mark_No_Text.png | Lion + triangle only (no wordmark) | Transparent |
| NABA_Monochrome_Black.png | Single-color black version for limited print / engraving | Transparent |
| NABA_Monochrome_White.png | Single-color white version for dark fields | Transparent |

**Export Rules:**
- Always preserve original aspect ratio.
- Minimum width for full lockup: 120 px digital / 25 mm print.
- SVG preferred for scalable use when vector source becomes available; current production files are high-res PNG.

---

## 4. App Icons (Folder 02)

### iOS App Icon – Dark
- Canvas: #111111 squircle
- Mark: Original full-color lion + triangle centered optically
- Subtle ambient gold glow (2–4% radius blur, low opacity) behind the triangle for premium depth
- Safe zone: 10% margin from edges

### iOS App Icon – Light
- Canvas: #FAF8F5 or pure white squircle
- Mark: Original full-color lion + triangle centered

### Android Adaptive Icon
- Foreground: Lion + triangle (transparent)
- Background: Solid #111111 (dark) or #FAF8F5 (light)

### Mobile Splash Screen
- Full #111111 background
- Centered original mark
- Subtle geometric light rays / soft glow emanating from the triangle apex
- Minimalist loading indicator (thin gold progress bar or pulsing gold triangle outline) at bottom third

---

## 5. Favicons & Touch Icons (Folder 03)

**Two optimized micro options (both must remain legible at 16×16):**

1. **Silhouette Favicon**: High-contrast black lion head silhouette inside the solid gold triangle (no fine mane detail).  
2. **Geometric “N” Favicon**: The double-line “N” extracted from the NABA wordmark, set in gold or black on transparent / solid.

**Required sizes:**
- favicon-16x16.png
- favicon-32x32.png
- favicon-48x48.png
- apple-touch-icon-180x180.png
- android-chrome-192x192.png
- android-chrome-512x512.png

---

## 6. UI System Icons (24×24 px grid)

Style: Dual-tone – black stroke (matching lion line weight) + selective amber/gold fill accents.  
Rounded geometric language that echoes the triangle and bold curves of the mane.

1. **Advocacy / Legal Rights** – Scales of justice contained inside an upward triangle outline  
2. **Community & Unity** – Three interlocked / overlapping human silhouettes or clasped hands  
3. **Healthcare & Wellbeing** – Heart inside a shield outline  
4. **Education & Youth** – Open book with a small upward flame / rising shape  
5. **Partnerships / Global** – Interconnected nodes or abstract bridge linking two forms  
6. **Contact / Support** – Speech bubble or headset with gold accent  
7. **Events** – Calendar with triangle flag accent  

All icons delivered as SVG + PNG @1x/@2x.

---

## 7. Lockups (Folder 04)

- **Horizontal Lockup**: Mark (lion+triangle) left-aligned, “NABA” wordmark + tagline to the right, optically balanced.
- **Vertical Stacked Lockup**: Mark centered above “NABA” + tagline (matches original composition).
- **Compact Header Lockup**: Reduced height version for navbars – mark + “NABA” only (tagline omitted or abbreviated).

Clear space and minimum sizes apply.

---

## 8. Stationery & Collateral (Folder 05)

### Business Card (85 × 55 mm)
**Front**  
- Solid #111111 background  
- Centered original gold triangle + lion mark  
- Optional subtle metallic gold foil simulation on triangle edges for premium print  

**Back**  
- Crisp white / #FAF8F5  
- Double-line “NABA” wordmark  
- Contact block:  
  admin@nabaorg.uk  
  +44 7990 753 498  
  www.nabaorg.uk  
- Cleanly bordered QR code (links to website or membership)  
- Thin gold accent line or small triangle motif in corner

### Official Letterhead (A4)
- Top: Horizontal lockup left-aligned  
- Thin continuous amber (#F5A623) rule across the full width below the header  
- Footer: Registered charity / non-profit credentials, address, website, small monochrome mark  

### Event Banner / Flyer Grid
- Modular grid based on the upward triangle geometry  
- Generous use of #111111 + gold accents  
- Photography treated with warm gold overlays or desaturated + gold highlights  

---

## 9. Digital & Social (Folder 06)

**Profile Avatars**  
- Square crop of the original mark (lion + triangle) on solid #111111 or white, depending on platform default.  
- Instagram / Facebook / LinkedIn / X: use the no-text mark for maximum recognizability at small sizes.

**Header Banners**  
- Wide format (e.g. 1500×500 px for X/LinkedIn)  
- Dark onyx base  
- Large centered or left-aligned mark  
- Supporting text: “National African & Black Association • Scotland & UK”  
- Subtle geometric pattern derived from the triangle or soft gold light rays  

---

## 10. Usage Rules Summary

- Never stretch, rotate, or add effects (drop shadows, bevels, etc.) to the primary mark except the approved subtle glow on dark app icons.
- Never place the full-color mark on busy photographic backgrounds without a solid color container or sufficient contrast.
- Maintain the exact color values listed above.
- Always provide clear space.
- For any new derivative (new icon, new lockup), the lion + triangle geometry and stroke language must remain the visual parent.

---

## Folder Architecture (Production Ready)

```
NABA_Brand_Kit_Master/
├── 00_NABA_Brand_Guidelines.md          ← This document
├── 01_Primary_Logo/
│   ├── NABA_Full_Lockup_Light_BG.png
│   ├── NABA_Full_Lockup_Light_BG.jpg
│   ├── NABA_Full_Lockup_Dark_BG.png     (to be generated)
│   ├── NABA_Transparent_Mark_No_Text.png
│   └── NABA_Monochrome_*.png
├── 02_App_Icons/
│   ├── iOS_App_Icon_Dark.png
│   ├── iOS_App_Icon_Light.png
│   ├── Android_Adaptive_Foreground.png
│   └── Splash_Screen_Dark.png
├── 03_Icon_Sets_and_Favicons/
│   ├── favicon-*.png
│   ├── apple-touch-icon.png
│   └── UI_Icons_SVG/
├── 04_Lockups_and_Layouts/
├── 05_Stationery_and_Collateral/
└── 06_Digital_and_Social_Assets/
```

---

**Contact for brand questions:** admin@nabaorg.uk  

This system guarantees 100% consistency with the locked original logo while providing a complete, production-ready visual identity for digital products, print, and social presence.
