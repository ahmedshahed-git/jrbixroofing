# JR BIX Roofing implementation plan

## Build scope
- Replace the placeholder home page with one responsive, cinematic single-page site containing every requested section: hero/preloader, editorial introduction, services, craftsmanship showcase, trust story, before/after slider, parallax story, process, Instagram, estimate CTA, and footer.
- Create a reusable component structure for navigation, motion reveals, magnetic CTAs, media treatments, slider interaction, timeline, and custom cursor.
- Keep all navigation as in-page anchors because the request is explicitly one continuous cinematic experience.

## Visual system and assets
- Implement the specified charcoal, ivory, warm neutral, and restrained gold palette as semantic OKLCH design tokens in the global stylesheet.
- Use an editorial serif display face paired with a crisp sans-serif interface face, loaded from the document head.
- Generate a cohesive set of premium residential roofing images for the hero fallback, showcase, before/after comparison, and parallax story; use local optimized assets with descriptive alt text.
- Use a locally hosted cinematic roofing video where a suitable downloadable production asset is available; otherwise use a generated hero still with video-ready treatment and preserve graceful mobile/reduced-motion fallback.

## Motion and interaction
- Add Motion for React and Lenis, with a shared cinematic easing system, masked typography, clip reveals, staggered entrances, image scale/parallax, and scroll-linked progress.
- Build the branded percentage preloader and curtain reveal, transparent-to-solid sticky navigation, desktop-only context cursor, restrained magnetic button behavior, service hover choreography, and responsive process timeline.
- Build an accessible pointer/touch before-and-after slider with keyboard controls, semantic labels, and a premium gold divider/handle.
- Respect prefers-reduced-motion by disabling smooth scrolling, preloader theatrics, parallax, cursor effects, and large transforms.

## Quality and metadata
- Add route-specific SEO metadata, canonical URL, Open Graph/Twitter text, semantic heading structure, accessible focus states, and reduced-motion behavior.
- Verify all links, phone CTAs, Instagram target, media loading, slider dragging, overflow, and console state.
- Validate the finished page at desktop, tablet, and mobile widths and fix the latest build diagnostics before completion.

## Technical details
- TanStack Start remains the fixed React/Vite routing foundation; the experience lives at `/` and uses Tailwind CSS v4.
- Component visual styling will use semantic tokens only; no ad-hoc hex colors in JSX.
- Dependencies will be limited to `motion` and `lenis` unless an existing compatible package already provides the requirement.
