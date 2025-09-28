# Code Review Notes

## Critical Issues

- **Guard gallery initialization on pages without the gallery markup.** `loadGalleryPhotos` immediately dereferences `document.getElementById('gallery-scroll')` without verifying the element exists, so pages like `sizing-guide.html` throw `Cannot read properties of null (reading 'innerHTML')` as soon as `DOMContentLoaded` fires. A simple null check before mutating or invoking `scrollGallery` will prevent the script from crashing on secondary pages.【F:script.js†L321-L359】

## High-Impact Suggestions

- **Move notification styles into CSS (or scoped `<style>` blocks) instead of injecting inline styles.** `showNotification` currently builds a full CSS rule-set in JavaScript and applies inline styles on every invocation, which bloats the runtime work and makes the component harder to theme. Defining the animation and layout once in `styles.css`, then toggling classes from JS, keeps presentation concerns in CSS and avoids repeated DOM mutations.【F:script.js†L123-L229】

- **Avoid forcing a full-page opacity toggle inside the `load` handler.** The current logic sets `document.body.style.opacity = '0'` after the window load event has already rendered the page, producing a visible flash to transparent before fading back in. If you want a fade-in effect, add a preloaded class via CSS (or `classList.add`) before first paint, or use the `pageshow` event with `persisted` handling to avoid layout thrashing.【F:script.js†L278-L286】

## Maintainability & Accessibility

- **Respect user motion preferences.** Global transitions are injected for `*` selectors, and multiple animations run on scroll. Wrap those effects in a `@media (prefers-reduced-motion: reduce)` clause so motion-sensitive users can opt out without editing the stylesheet manually.【F:script.js†L288-L311】【F:styles.css†L47-L200】

- **Consolidate repeated scroll listeners.** There are three separate `window.addEventListener('scroll', …)` registrations (navbar styling, active link tracking, hero parallax). Coalescing them into a single handler improves performance on mid-tier devices, especially when combined with `requestAnimationFrame` throttling to avoid layout thrash from multiple `offsetTop` reads per frame.【F:script.js†L31-L76】【F:script.js†L268-L275】

