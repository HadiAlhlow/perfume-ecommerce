# Design Types & Principles — 2025 Playbook

> **Operating Rule**: *Every value is configurable per invocation.* Always ask for missing values and confirm defaults:
`DUR_MS, DELAY_MS, OPACITY, X_PX, Y_PX, Z_PX, SCALE, ROT_DEG, SKEW_DEG, BLUR_PX, RADIUS_PX, SPREAD_PX, COLOR_RGBA, EASE`.
Prefer **GSAP** (+ScrollTrigger/Observer) for motion; animate **transform/opacity** only; respect `prefers-reduced-motion`.

---

## 0) Global Foundations

**Design Intent**
- Build adaptive, performant, and accessible experiences with clear hierarchy and purposeful motion.
- Pair modular layout systems with microinteractions to drive clarity, feedback, and momentum.

**Implementation North Stars**
- **Layout tokens**: grid columns, gaps, container widths, breakpoints.
- **Type tokens**: font family/axis, sizes, line-heights, letter-spacing, optical sizes.
- **Color tokens**: semantic roles (bg, surface, text, action, info, success, warning, danger).
- **Motion tokens**: duration, delay, easing, distance, blur, shadow depth.
- **A11y**: color-contrast AA/AAA, focus-visible rings, keyboard flows, reduced-motion.
- **Perf**: LCP < 2.5s, CLS < 0.1, animation on compositor (GPU), lazy-load non-critical.

**Typography Baseline (recommendation)**
- Use **variable fonts** with optical sizing (e.g., Inter, Satoshi, Geist, IBM Plex, Source Sans 3 / Source Serif 4, Roboto Flex).
- **Scale**: 12/14 (legal), 16 (base), 20 (eyebrow/lede), 24–32 (section heads), 48–96 (hero).
- **Line-height**: 1.4–1.6 body; 1.1–1.2 headlines; tighten for display, loosen for running text.
- **Weight**: 400 body, 600–800 display; avoid faux bold/italic.
- **Kinetic type**: reserve motion for entrances and micro emphasis; keep duration short and easing gentle.

---

## 1) Bento / Compartmentalized Grid

**Concept**
Modular “tile” system (asymmetric card sizes) on a fixed grid (e.g., 12 columns) to surface diverse content at a glance.

**Use When**
- Hero dashboards, product overviews, multi-offer landers, content hubs.

**Implementation Playbook**
- **Layout**: `display:grid; grid-template-columns: repeat(12, 1fr); gap: G_PX;`
- **Tiles**: `border-radius:RADIUS_PX; box-shadow: 0 2px 5px rgba(0,0,0,SHADOW_A);`
- **Emphasis**: vary `grid-column` spans (e.g., 6/6, 8/4, 4/4/4).
- **Microinteractions**: hover-lift `translateY(-Y_PX)` + shadow escalate.
- **A11y**: tab order mirrors visual order; `:focus-visible` ring + outline offset.
- **Perf**: defer non-critical tile media; use responsive images.

**GSAP Template**
```js
// Staggered tile entrance
gsap.from(".bento-tile", {
  y: Y_PX, opacity: 0, duration: DUR_MS/1000, ease: EASE, stagger: 0.06
});
```

**Typography**
- Strong display type for key tiles; secondary for details.
- Keep body copy 16–18px; headings 28–56px; consistent vertical rhythm via `grid-auto-rows` or clamp() spacing.

---

## 2) Microinteractions

**Concept**
Tiny, purposeful responses to user actions. Model: **Trigger → Rules → Feedback → Loops/Modes**.

**Use When**
- Buttons, toggles, form validation, navigation hints.

**Implementation Playbook**
- **Hover**: `transition: transform DUR_MS EASE, box-shadow DUR_MS EASE;`
- **Active**: press `scale(0.98) translateY(1px)`
- **Feedback**: success/fail color states + icons; announce via `aria-live` for async results.
- **A11y**: focus-visible rings; ensure motion isn’t required to understand the state.

**GSAP Template**
```js
btn.addEventListener("mouseenter", () => gsap.to(btn, { y: -Y_PX, duration: DUR_MS/1000, ease: EASE }));
btn.addEventListener("mouseleave", () => gsap.to(btn, { y: 0, duration: DUR_MS/1000, ease: EASE }));
btn.addEventListener("click", () => gsap.fromTo(btn, { scale: 0.98 }, { scale: 1, duration: DUR_MS/1000, ease: EASE }));
```

**Typography**
- Buttons: uppercase only if necessary; maintain x-height legibility; avoid letter-spacing > 0.08em.

---

## 3) Glassmorphism

**Concept**
Translucent “frosted glass” surfaces over rich backgrounds for depth and hierarchy.

**Implementation Playbook**
- **Surface**: `background: rgba(255,255,255,ALPHA); border:1px solid rgba(255,255,255,BORDER_A);`
- **Depth**: `backdrop-filter: blur(BLUR_PX) saturate(1.1);`
- **Shadow**: soft ambient `0 2px 5px rgba(0,0,0,SHADOW_A)`
- **Contrast**: ensure text meets WCAG (darken overlay if needed).
- **Motion**: hover brighten via alpha increase; slide-up micro.

**GSAP Template**
```js
gsap.to(".glass", { backgroundColor: "rgba(255,255,255,ALPHA_H)", duration: DUR_MS/1000, ease: EASE });
```

**Typography**
- Sans-serif with high clarity; avoid ultra-thin on transparent backgrounds.
- Add subtle text-shadow only if contrast is borderline (prefer stronger surface instead).

---

## 4) 3D / Immersive & Parallax

**Concept**
Subtle 3D affordances and depth cues; interactive orbit/tilt for product storytelling.

**Implementation Playbook**
- **3D Context**: `perspective: P_PX; transform-style: preserve-3d;`
- **Hover Tilt**: pointer maps to `rotateX/rotateY`; clamp values.
- **Scroll Depth**: parallax layers with small deltas; avoid motion sickness.
- **A11y**: reduced-motion disables parallax/tilt.

**GSAP Template**
```js
el.addEventListener("mousemove", (e) => {
  const rX = gsap.utils.clamp(-ROT_DEG, ROT_DEG, (e.offsetY/el.offsetHeight - 0.5) * ROT_DEG*2);
  const rY = gsap.utils.clamp(-ROT_DEG, ROT_DEG, (e.offsetX/el.offsetWidth - 0.5) * ROT_DEG*2);
  gsap.to(el, { rotateX: -rX, rotateY: rY, duration: DUR_MS/1000, ease: EASE });
});
```

**Typography**
- Pair bold display with calm body; avoid over-animated headlines while 3D content moves.

---

## 5) Bold / Kinetic Typography

**Concept**
Type becomes a primary visual element via scale, weight, and controlled motion.

**Implementation Playbook**
- **Variable Fonts**: animate weight/width carefully.
- **Entrance**: split lines/words/letters for staggered reveals.
- **Contrast**: solid backgrounds or low-noise surfaces.
- **A11y**: avoid continuous looping motion; ensure pause/stop control if kinetic persists.

**GSAP Template**
```js
gsap.from(".headline span", { y: Y_PX, opacity: 0, duration: DUR_MS/1000, ease: EASE, stagger: 0.04 });
```

**Typography**
- Display: 64–120px with tight LH (1.05–1.2).
- Body: 16–18px; maintain comfortable measure (60–75ch).

---

## 6) Minimalism with a Twist

**Concept**
Clean layouts with generous whitespace, punctuated by a bold visual (color block, oversized type, or accent motion).

**Implementation Playbook**
- **Grid**: fewer elements per view; strong alignment.
- **Accent**: one focal element with color or motion; everything else restrained.
- **A11y**: high contrast and predictable focus order.

**Typography**
- One or two families; big/small contrast; consistent optical sizing.

---

## 7) Retro & Nostalgia

**Concept**
80s/90s/Y2K aesthetics—bitmap textures, pixel art, vapor gradients—blended with modern UX.

**Implementation Playbook**
- **Color**: deliberate neon/pastel palettes; ensure contrast.
- **Texture**: grain/noise (subtle), pixel iconography.
- **UX**: modern patterns underneath; do not regress usability.

**Typography**
- Pixel/mono display for headings; modern sans for body.
- Limit novelty fonts to headlines and short labels.

---

## 8) Hand‑Drawn & Organic

**Concept**
Imperfect, human marks and flowing shapes to create warmth and authenticity.

**Implementation Playbook**
- **Illustrations**: SVG paths with slight jitter; animated stroke-dashoffset for “draw-in” effects.
- **Shapes**: organic blobs with masks; soft shadows.
- **A11y**: retain clear hit areas and legible contrast.

**GSAP Template**
```js
gsap.fromTo(".draw path", { strokeDashoffset: X_PX }, { strokeDashoffset: 0, duration: DUR_MS/1000, ease: EASE });
```

**Typography**
- Friendly sans or rounded grotesk; avoid razor-thin weights.

---

## 9) Dark Mode & Vibrant Gradients

**Concept**
Reduced eye strain and modern aesthetic; gradients to add energy and depth.

**Implementation Playbook**
- **Palettes**: text on dark ≥ 7:1 where possible; avoid pure black (#000) for surfaces (use #0B0B0D style).
- **Gradients**: subtle multi-stop with accessible overlays.
- **Elevation**: shadows + borders tuned for dark.

**Typography**
- Increase weight/size slightly on dark; ensure link color contrast; avoid mid-grey text.

---

## 10) Non‑Traditional Scrolling / Scrollytelling

**Concept**
Narrative-led progression using pinned sections, scene transitions, and progressive reveals.

**Implementation Playbook**
- **Pinned scenes**: sticky containers with timeline-controlled animations.
- **Progress mapping**: map scroll to `progress` for reveal distances.
- **A11y**: provide skip links; content must be accessible without scroll effects.

**GSAP Template**
```js
gsap.timeline({ scrollTrigger: { trigger: ".scene", start: "top top", end: "+=200%", scrub: true } })
  .from(".scene .layer", { y: Y_PX, opacity: 0, stagger: 0.2, ease: EASE });
```

**Typography**
- Large, legible copy; short lines; pin key messages in view.

---

## 11) Accessibility‑First Design

**Concept**
Inclusive by default; keyboard, screen reader, and color contrast excellence.

**Implementation Playbook**
- **Contrast**: WCAG AA minimum; AAA for body if feasible.
- **Keyboard**: visible focus rings, logical order, traps avoided.
- **Media**: alt text, captions, transcripts.
- **Motion**: respect reduced-motion.

**Typography**
- Minimum 16px body; avoid thin/light weights under 300 for body; adequate line-height.

---

## 12) Sustainable Web Design

**Concept**
Lower the digital carbon footprint via lean assets, green hosting, and efficient code.

**Implementation Playbook**
- **Images**: modern formats (AVIF/WebP), responsive sizes, lazy-load.
- **JS**: ship only what’s used; code-split; defer non-critical.
- **Fonts**: subset and preload; variable fonts over many statics.
- **Hosting**: choose energy‑efficient providers.

**Typography**
- Subset fonts; use system stacks where possible for secondary UI text.

---

## 13) AI & Personalization

**Concept**
Dynamic content, layouts, and recommendations tailored to behavior, context, and goals.

**Implementation Playbook**
- **Signals**: clicks, dwell, cart state, recency.
- **Variants**: component-level swaps (copy, media, CTA, order).
- **Guardrails**: transparency (“Why am I seeing this?”), opt-out, privacy controls.

**Typography**
- Maintain consistency across variants; avoid jarring typographic shifts between personalized states.

---

## 14) AI Chatbots & Voice Interfaces

**Concept**
NLP-powered assistants for support, guidance, and flows; voice as alternative input.

**Implementation Playbook**
- **Chat UI**: clear turn-taking, quick replies, typing indicators (microinteractions).
- **Voice**: ASR latency targets; explicit confirmations.
- **A11y**: full keyboard paths; ARIA roles live regions.

**Typography**
- Readable message bubbles (16–18px); mono for code; maintain content hierarchy inside responses.

---

## 15) Sustainable Motion System (Easing & Durations)

**Concept**
Consistent, brand-aligned motion that communicates state without causing fatigue.

**Implementation Playbook**
- **Durations**: base 160–240ms; longer (280–360ms) for large moves; micro (120–160ms) for hovers.
- **Easings**: standard `ease`, snappy `cubic-bezier(0.16,1,0.3,1)`, and decel `cubic-bezier(0.2,0,0,1)`.
- **Sequencing**: stagger ≤ 80ms; limit chained steps.

**GSAP Tokenization**
```js
const TOKENS = { DUR_MS, DELAY_MS, EASE, X_PX, Y_PX, SCALE };
// Confirm values with user each invocation before applying.
```

---

## 16) Design Ops Checklists

**Do**
- Use tokens and components; write acceptance criteria per pattern.
- Set measurable targets (LCP, CLS, conversion, task success).
- Provide no‑motion fallbacks and focus states.

**Don’t**
- Animate layout properties (top/left/width/height).
- Rely on color alone for state.
- Overuse novelty fonts or long-running animations.

---

## Appendix — Shadow / Blur / Transform Reference

- **Shadows**
  - Soft: `0 2px 5px rgba(0,0,0,0.20)`
  - Lift: `0 12px 24px rgba(0,0,0,0.22)`
  - Ambient: `0 24px 48px rgba(0,0,0,0.20)`

- **Glass**
  - `backdrop-filter: blur(BLUR_PX) saturate(1.1); background: rgba(255,255,255,ALPHA); border:1px solid rgba(255,255,255,BORDER_A)`

- **Transforms**
  - Slide up: `translateY(-Y_PX)`
  - Tilt: `rotateX/rotateY(±ROT_DEG)`
  - Scale micro: `scale(SCALE)`

> All tokens above are placeholders—ask for values each time and confirm defaults before use.
