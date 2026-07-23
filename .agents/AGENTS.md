# Eigene Website - Project Rules & Learnings

## CSS Rendering Bugs & Workarounds

### 1. Framer Motion vs. Fixed Positioning
- **Problem**: Framer Motion injects `filter` properties (e.g., `filter: blur()`) on wrapper elements like `<motion.div>` during page transitions (e.g., in `__root.tsx`). Any CSS `filter` on an ancestor element breaks `position: fixed` for its descendants, causing them to behave like `absolute` elements and scroll with the page content.
- **Solution**: Never use `position: fixed` for elements inside `<main>` or any route components if they need to stay completely static relative to the viewport. Instead, use the **Sticky-Top Hack**: Wrap the element in `<div className="absolute inset-0 z-0 pointer-events-none flex justify-end items-start">` and apply `sticky top-0 h-screen` to the element itself. This perfectly emulates fixed positioning without being broken by CSS filters.

### 2. Safari Rendering Bug: CSS Filters + Mask Image
- **Problem**: In Safari (iOS and macOS), if you animate a CSS `filter` (like `blur()`) on an element that also has a CSS mask (`mask-image`), Safari will often miscalculate the scale/resolution of the element during hardware acceleration. The element will abruptly change size or appear shrunk.
- **Solution**: Never apply CSS `filter` animations to elements with `mask-image`. If you need a fade-in animation for a masked image, only animate `opacity`. Remove any `filter: blur` from the `@keyframes` of masked elements.

## Design Patterns

### 3. Ghost Portrait (Portfolio Seite)
- **Layout**: Das Ghost-Portrait (`be.tsx`) MUSS immer die komplette **rechte Bildschirmhälfte** in voller Höhe einnehmen (`md:w-1/2 h-screen object-cover`), und nicht nur klein unten rechts in der Ecke kleben. Es muss absolut statisch im Hintergrund bleiben.
- **Interaktion**: Das Element darf den Rest der Seite nicht blockieren (`pointer-events-none`).
