# Reunion Hub Design System

## Core Aesthetics
- **Theme**: Nostalgic Modern Simple. Clean, minimalist layouts to reduce cognitive load for multi-generational users (mostly adult and older audiences).
- **Vibe**: High-trust, professional, warm, accessible.

## Colors
- **Primary Blue**: `#1D699B` (Trust, reliability, professionalism. Use for Primary CTAs, nav, headings)
- **Secondary Blue**: `#195172` (Depth, stability. Use for Footer BG, dark sections, high-contrast text)
- **Primary Yellow**: `#E7AF36` (Warmth, nostalgia, energy. Use for Hover states, pricing highlights, badges)
- **Secondary Yellow**: `#EDD08D` (Softness, approachability. Use for Package card BGs, testimonial blocks, dividers)
- **Neutral White**: `#FFFFFF` (Page backgrounds, card surfaces)
- **Neutral 900 (Dark)**: `#111827` (Body copy. Never use light gray below #4B5563 for accessibility)

## Typography
- **Font Family**: Montserrat
- **H1 / Hero**: ExtraBold (800), 40px mobile / 60px desktop
- **H2 / Section**: Bold (700), 28px
- **H3 / Card Title**: SemiBold (600), 20px
- **Body**: Regular (400), 16px min, Line-height: 1.6+
- **Caption / Label**: Medium (500), 14px

## Components & Spacing
- **Buttons**: Minimum tap target of 48x48px (mobile). Must feel responsive.
- **Card Padding**: Minimum 24px
- **Section Spacing**: Minimum 64px vertical rhythm
- **Icons**: Outline-style icons only. No filled icon mixing.
- **Images**: Apply a subtle warm overlay (sepia 10-15%) to vintage photography.

## Animation & Interactions (Emil Kowalski Philosophy)
- **General**: Unseen details compound. Keep animations fast and purposeful.
- **Buttons / Pressable**: Add `transform: scale(0.97)` on `:active` with `transition: transform 160ms ease-out`. This makes the UI feel instantly responsive.
- **Entering Elements**: Never animate from `scale(0)`. Start from `scale(0.95)` with `opacity: 0`.
- **Easings**: Use custom curves, e.g., `--ease-out: cubic-bezier(0.23, 1, 0.32, 1)`. Never use `ease-in` for UI entry.
- **Duration**: Keep UI animations under 300ms. 
- **Popovers/Modals**: Modals scale from center.
- **Interruptibility**: Use CSS transitions over keyframes for interruptible UI.
- **Target Audience Considerations**: Since the audience is older, avoid fast flashing, heavy parallax, or auto-playing animations. Stick to subtle, high-quality feedback animations (like button press).
