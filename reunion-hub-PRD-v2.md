# Product Requirements Document
## The Reunion Hub

| Field | Value |
|---|---|
| **Document Version** | 2.0 |
| **Status** | Draft — Awaiting Stakeholder Review |
| **Target Platform** | Web Application (Mobile-First) |
| **Tech Stack** | Next.js (App Router), Tailwind CSS, shadcn/ui, Vercel |
| **Last Updated** | May 2026 |
| **Author** | [Product Owner Name] |
| **Reviewers** | [Dev Lead], [Design Lead], [Business Owner] |

---

## Table of Contents

1. [Executive Summary](#1-executive-summary)
2. [Problem & Opportunity](#2-problem--opportunity)
3. [Goals & Success Metrics](#3-goals--success-metrics)
4. [Target Audience & Personas](#4-target-audience--personas)
5. [Competitive Landscape](#5-competitive-landscape)
6. [Design & Brand System](#6-design--brand-system)
7. [MVP Scope & Feature Requirements](#7-mvp-scope--feature-requirements)
8. [Non-Functional Requirements](#8-non-functional-requirements)
9. [Technical Architecture](#9-technical-architecture)
10. [Content Strategy](#10-content-strategy)
11. [Phased Roadmap](#11-phased-roadmap)
12. [Risks & Mitigations](#12-risks--mitigations)
13. [Assumptions & Constraints](#13-assumptions--constraints)
14. [Open Questions](#14-open-questions)
15. [Glossary](#15-glossary)

---

## 1. Executive Summary

The Reunion Hub is a specialized Online Travel Agency (OTA) and event organization platform built exclusively for the reunion niche — family, high school, and corporate alumni gatherings. Unlike generic travel sites that treat group bookings as an afterthought, this platform is architected around the specific social, logistical, and generational dynamics of reunion planning.

The MVP delivers a high-trust marketing and lead-generation site: a curated package catalog, an inquiry form, and a direct WhatsApp channel. Post-MVP phases introduce self-service coordination tools (RSVPs, dashboards, and payments) to increase the platform's retention value and reduce reliance on manual sales effort.

**Core differentiator:** We do not just sell travel — we sell the relief of having it handled.

---

## 2. Problem & Opportunity

### 2.1 The Problem

Organizing a reunion is a logistical nightmare across four major dimensions:

| Dimension | Specific Pain Points |
|---|---|
| **Coordination** | Herding 20–200+ people across different cities, time zones, and age groups |
| **Budgeting** | Collecting money, negotiating group rates, and tracking who has paid |
| **Inclusivity** | Finding venues and itineraries that work for toddlers, teenagers, adults, and elders simultaneously |
| **Technology** | Existing tools (Google Sheets, Facebook groups, generic booking sites) are fragmented and require digital fluency that many attendees lack |

### 2.2 The Opportunity

The reunion and group travel market is consistently underserved by mainstream OTAs. Pain is high, decision-making is slow, and trust is paramount — creating ideal conditions for a niche specialist with a high-touch, relationship-driven approach.

### 2.3 Success Hypothesis

If we offer pre-packaged, customizable reunion itineraries with a clear, accessible interface and a simple human contact pathway (WhatsApp + inquiry form), then committee heads will choose us over DIY coordination because we demonstrably reduce their time and stress investment.

---

## 3. Goals & Success Metrics

### 3.1 Business Goals (MVP)

1. Establish brand credibility in the reunion travel niche.
2. Generate a consistent pipeline of qualified leads via the inquiry form and WhatsApp.
3. Demonstrate package demand and which reunion types (Family, School, Corporate) convert best.

### 3.2 KPIs & Targets

| Metric | Definition | MVP Target | Measurement Tool |
|---|---|---|---|
| **Lead Conversion Rate** | % of unique visitors who submit the inquiry form OR click WhatsApp CTA | ≥ 3% | Vercel Analytics / GA4 |
| **WhatsApp Click-Through Rate** | Clicks on the floating WhatsApp button / unique sessions | ≥ 5% | GA4 Event Tracking |
| **Package Page Engagement** | Avg. time on any package detail page | ≥ 90 seconds | GA4 |
| **Bounce Rate (Hero)** | % of sessions that leave without scrolling past the hero section | ≤ 50% | GA4 |
| **Core Web Vitals** | LCP, CLS, FID scores on mobile and desktop | All "Good" (Green) | Google Lighthouse / Search Console |
| **Form Completion Rate** | % of users who start the form and submit it | ≥ 60% | GA4 Funnel |

### 3.3 Out of Scope for Success (MVP)

- Online payment processing (Phase 3)
- RSVP tracking (Phase 2)
- Repeat visitor / logged-in user metrics (Phase 2)

---

## 4. Target Audience & Personas

### Persona 1 — "The Committee Head" (Primary Buyer)

> *"I got volunteered to plan the reunion again. I just need someone to take this off my plate."*

| Attribute | Detail |
|---|---|
| **Age** | 35–55 |
| **Tech Literacy** | Medium-High |
| **Device** | Primarily mobile during research; desktop for final review |
| **Context** | Researching between work tasks; high intent, time-poor |
| **Pain Points** | Tracking RSVPs, chasing payments, vendor negotiations, keeping all generations happy |
| **Goal** | A "done-for-you" package with one point of contact; wants to feel confident, not overwhelmed |
| **Decision Trigger** | Social proof (testimonials, past events), clear pricing, and a fast path to human contact |

**Designing for this persona:** Clear CTAs, upfront pricing anchors, prominent testimonials, and a short inquiry form (not a multi-step wizard).

---

### Persona 2 — "The Elder Attendee" (Secondary User)

> *"My grandchild showed me this website. I just want to know what we're doing and what I need to bring."*

| Attribute | Detail |
|---|---|
| **Age** | 65+ |
| **Tech Literacy** | Low |
| **Device** | Tablet or desktop; large text size settings likely enabled |
| **Context** | Referred by a family member; low autonomy, high anxiety about making mistakes |
| **Pain Points** | Complex navigation, small text, jargon, too many options |
| **Goal** | Understand the schedule and costs clearly; find a phone number or WhatsApp |
| **Decision Trigger** | Simplicity, familiarity, and visible human contact options |

**Designing for this persona:** Large font sizing, high contrast, no jargon, prominent phone/WhatsApp contact, no modal popups or auto-playing media.

---

### Persona 3 — "The Young Organizer" (Emerging Buyer)

> *"I'm coordinating the 10-year reunion for my batch. I want something cool that doesn't feel like a tour package."*

| Attribute | Detail |
|---|---|
| **Age** | 25–35 |
| **Tech Literacy** | High |
| **Device** | Mobile-first |
| **Context** | Discovered via Instagram or word of mouth; aesthetic-driven, experience-first |
| **Pain Points** | Generic, boring packages; lack of customization; no shareable content |
| **Goal** | A unique, shareable reunion experience they can be proud of organizing |
| **Decision Trigger** | Memorable photography, social proof from similar cohorts, customization options |

**Designing for this persona:** Strong visual identity, photography quality, and the ability to reach us quickly via WhatsApp DM.

---

## 5. Competitive Landscape

| Competitor Type | Examples | Weakness We Exploit |
|---|---|---|
| **Generic OTAs** | Booking.com, Expedia | No group coordination tools; no reunion-specific packages; overwhelming interface |
| **Event Planning Software** | Eventbrite, Hopin | No travel/accommodation layer; requires high tech literacy |
| **Local Tour Operators** | Varies by market | No online presence or catalog; discovery friction is high |
| **Facebook Groups / Sheets** | DIY coordination | No reliability, no vendor relationships, no accountability |

**Our positioning:** We occupy the intersection of OTA convenience and event planner expertise, packaged for reunion-specific needs. We are not the cheapest option — we are the most trusted and time-saving one.

---

## 6. Design & Brand System

### 6.1 Design Philosophy

**Nostalgic Modern Simple.** Clean, minimalist layouts reduce cognitive load for multi-generational users. Warm, emotive photography and a curated color palette carry the emotional weight of the brand.

### 6.2 Color Palette

| Token Name | Hex | Psychology | Usage |
|---|---|---|---|
| `primary-blue` | `#1D699B` | Trust, reliability, professionalism | Primary CTAs, nav, headings |
| `secondary-blue` | `#195172` | Depth, stability | Footer BG, dark sections, high-contrast text |
| `primary-yellow` | `#E7AF36` | Warmth, nostalgia, energy | Hover states, pricing highlights, badges |
| `secondary-yellow` | `#EDD08D` | Softness, approachability | Package card BGs, testimonial blocks, dividers |
| `neutral-white` | `#FFFFFF` | Clarity, space | Page backgrounds, card surfaces |
| `neutral-900` | `#111827` | Legibility | Body copy — **never use gray below #4B5563** |

> ⚠️ **Accessibility Mandate:** All text must meet WCAG AA contrast ratios (4.5:1 for body, 3:1 for large text). Light gray text is prohibited. All interactive elements must have visible focus states.

### 6.3 Typography

| Role | Typeface | Weight | Size (min) |
|---|---|---|---|
| H1 / Hero | Montserrat | ExtraBold (800) | 40px mobile / 60px desktop |
| H2 / Section | Montserrat | Bold (700) | 28px |
| H3 / Card Title | Montserrat | SemiBold (600) | 20px |
| Body | Montserrat | Regular (400) | 16px |
| Caption / Label | Montserrat | Medium (500) | 14px |

> Line height for body copy must be ≥ 1.6 to support readability for older users.

### 6.4 Component Principles

- **Button minimum tap target:** 48 × 48px (mobile)
- **Card padding:** Minimum 24px
- **Section spacing:** Minimum 64px vertical rhythm
- **Icons:** Use outline-style icons only; no filled icon mixing
- **Images:** Must use `next/image` with `alt` text; apply a subtle warm overlay (sepia 10–15%) to vintage photography to align with brand aesthetic
- **Animations:** Minimal — fade-in on scroll is acceptable; no parallax or auto-playing carousels

---

## 7. MVP Scope & Feature Requirements

### 7.1 Feature Priority Matrix

| Feature | Priority | Phase |
|---|---|---|
| Hero Section | P0 | MVP |
| Package Catalog Grid | P0 | MVP |
| Package Detail View | P0 | MVP |
| Inquiry / Lead Capture Form | P0 | MVP |
| WhatsApp Floating Button | P0 | MVP |
| Trust & Social Proof Section | P1 | MVP |
| Value Pillars Section | P1 | MVP |
| Package Filtering | P2 | Phase 1.5 |
| SEO Metadata & Sitemap | P1 | MVP |

---

### 7.2 Feature: Hero Section

**Goal:** Establish brand credibility and drive the primary CTA within 3 seconds of landing.

**User Story:** As a Committee Head arriving on the site for the first time, I want to immediately understand what this service offers and feel confident enough to explore further.

**Acceptance Criteria:**
- [ ] Full-width, high-quality emotive background image (group of people, warm tones)
- [ ] Headline: ≤ 8 words. Value proposition must be immediately clear (no jargon)
- [ ] Subheadline: ≤ 20 words. Elaborates on the service
- [ ] Primary CTA button: "Plan Your Reunion" — links to the inquiry form section
- [ ] Secondary CTA or social proof anchor (e.g., "Trusted by 200+ reunion organizers ↓")
- [ ] Image must be served via `next/image` with priority loading (LCP optimization)
- [ ] On mobile: text must remain legible over image (dark overlay required if contrast < 4.5:1)
- [ ] No auto-playing video or audio

---

### 7.3 Feature: Package Catalog

**Goal:** Showcase pre-built reunion packages to anchor value and trigger inquiries.

**User Story:** As a Committee Head, I want to browse available reunion packages so that I can find one that fits my group and use it as a starting point for my inquiry.

**Acceptance Criteria:**
- [ ] Responsive grid: 1 column (mobile), 2 columns (tablet), 3 columns (desktop)
- [ ] Each card contains: thumbnail image, package title, short description (≤ 20 words), "Starting from" price, and a "View Itinerary" button
- [ ] "Starting from" price text styled in `primary-yellow`
- [ ] Cards use `secondary-yellow` as background
- [ ] "View Itinerary" navigates to a package detail page or expands a modal (to be decided — see Open Questions)
- [ ] Minimum 4 packages at launch
- [ ] Images must be optimized via `next/image` with `lazy` loading (below the fold)
- [ ] Empty state handled gracefully if no packages are loaded

**Package Detail View — Acceptance Criteria:**
- [ ] Full itinerary displayed in an easy-to-scan day-by-day format
- [ ] Inclusions and exclusions listed clearly
- [ ] CTA to inquire about this specific package (pre-fills the Reunion Type field in the form)
- [ ] Package name appears in the page `<title>` and meta description (SEO)

---

### 7.4 Feature: Inquiry / Lead Capture Form

**Goal:** Convert interested visitors into qualified leads with minimal friction.

**User Story:** As a Committee Head, I want to submit a quick inquiry so that a consultant can reach out with a customized proposal.

**Acceptance Criteria:**

**Fields:**
| Field | Type | Required | Validation |
|---|---|---|---|
| Full Name | Text input | Yes | Min 2 chars |
| Email Address | Email input | Yes | Valid email format |
| Phone Number | Tel input | Yes | Min 8 digits; accepts international format |
| Reunion Type | Dropdown | Yes | Options: Family, High School / University, Corporate Alumni, Other |
| Estimated Headcount | Dropdown | Yes | Options: 10–20, 21–50, 51–100, 100+ |
| Preferred Date Range | Text or date picker | No | Optional |
| Message / Special Requests | Textarea | No | Max 500 chars with character counter |

**Behavior:**
- [ ] Client-side validation on blur; clear error messages (not just red borders)
- [ ] Submit button disabled until all required fields are valid
- [ ] On success: show an inline thank-you message ("We've received your inquiry! Expect a response within 24 hours."). Do **not** redirect.
- [ ] On error (network failure): show a friendly error and a fallback link to WhatsApp
- [ ] Form submission sends data to a server action / API route (not a third-party JS form service, to avoid GDPR issues)
- [ ] Submissions stored in a database (see Technical Architecture) and trigger an email notification to the business owner
- [ ] Honeypot field added for basic bot protection

---

### 7.5 Feature: WhatsApp Floating Action Button (FAB)

**Goal:** Provide an immediate, low-friction human contact path for high-intent visitors.

**Acceptance Criteria:**
- [ ] Fixed position: bottom-right corner, 24px from edges
- [ ] Icon: WhatsApp logo (green); minimum 56 × 56px tap target
- [ ] Opens `https://wa.me/{PHONE_NUMBER}?text={URL_ENCODED_PREFILL_MESSAGE}` in a new tab
- [ ] Prefill message: "Hi, I'm interested in planning a reunion and found your website."
- [ ] Button must have `aria-label="Contact us on WhatsApp"` for screen readers
- [ ] Must not obscure any form fields or navigation on any viewport width
- [ ] Phone number stored in environment variable (`NEXT_PUBLIC_WHATSAPP_NUMBER`), not hardcoded

---

### 7.6 Feature: Trust & Social Proof Section

**Goal:** Reduce hesitation by demonstrating credibility and real-world results.

**Acceptance Criteria:**
- [ ] 2–4 short testimonials (max 3 sentences each) from past reunion organizers
- [ ] Each testimonial includes: quote, organizer name, reunion type, and year
- [ ] Displayed in a visually distinct block (styled with `secondary-yellow` background)
- [ ] Partner venue logos displayed in a horizontal strip (greyscale for visual harmony)
- [ ] Logos must link to partner websites (`target="_blank"`, `rel="noopener noreferrer"`)
- [ ] If fewer than 2 real testimonials are available at launch, section is hidden (not shown with placeholders)

---

### 7.7 Feature: Value Pillars Section

**Goal:** Communicate the core service offering at a glance for skimmers.

**Acceptance Criteria:**
- [ ] Three pillars: "Custom Itineraries," "Group Rate Negotiations," "Dedicated Event Manager" (copy TBC with business owner)
- [ ] Each pillar: icon, bold title, and 1–2 sentence description
- [ ] Icons must be from a consistent icon set (e.g., Lucide)
- [ ] Responsive: 1 column mobile → 3 columns desktop

---

## 8. Non-Functional Requirements

### 8.1 Performance

| Requirement | Target |
|---|---|
| Largest Contentful Paint (LCP) | < 2.5 seconds on mobile (4G) |
| Cumulative Layout Shift (CLS) | < 0.1 |
| First Input Delay (FID) / INP | < 200ms |
| Total page weight (homepage) | < 1.5 MB (images excluded from pre-load) |

### 8.2 Accessibility

- WCAG 2.1 Level AA compliance throughout
- Full keyboard navigability (Tab order, focus rings)
- Screen reader compatibility (semantic HTML, ARIA labels on interactive elements)
- No content conveyed by color alone (icons + text labels required)

### 8.3 Browser & Device Support

| Category | Minimum Support |
|---|---|
| Mobile browsers | Safari iOS 15+, Chrome Android 90+ |
| Desktop browsers | Chrome, Firefox, Safari, Edge (last 2 major versions) |
| Viewport | 320px to 1920px width |
| OS | iOS 15+, Android 10+, Windows 10+, macOS 12+ |

### 8.4 Security

- All form submissions over HTTPS only
- No sensitive data (PII) logged to the browser console
- GDPR-compliant: if targeting EU users, a cookie consent banner is required
- Rate limiting on the inquiry form API route (max 5 submissions per IP per hour)
- Environment variables for all third-party keys (WhatsApp number, email service API key)

### 8.5 SEO

- Server-side rendered pages (Next.js App Router) for full crawlability
- Unique `<title>` and `<meta description>` on every page
- OpenGraph and Twitter Card tags on homepage and package detail pages
- `robots.txt` and `sitemap.xml` auto-generated
- Structured data (JSON-LD): `TouristAttraction` or `Product` schema on package pages
- Image alt text mandatory on all images

---

## 9. Technical Architecture

### 9.1 Stack Overview

| Layer | Technology | Rationale |
|---|---|---|
| **Framework** | Next.js 14+ (App Router) | SSR for SEO; file-based routing; API routes for form handling |
| **Styling** | Tailwind CSS (custom theme) | Utility-first; fast prototyping; consistent design tokens |
| **UI Components** | shadcn/ui | Accessible, unstyled components; easy to brand |
| **Font** | Montserrat via `next/font/google` | Zero layout shift; self-hosted via Next.js |
| **Hosting** | Vercel | Edge CDN; automatic image optimization; preview deployments |
| **Analytics** | GA4 + Vercel Web Analytics | GA4 for funnel tracking; Vercel for Core Web Vitals |
| **Email** | Resend or Nodemailer | Inquiry form notification emails to business owner |
| **Database** | Supabase (PostgreSQL) or Airtable | Store inquiry form submissions; minimal ops overhead |
| **CMS (Phase 1.5)** | Sanity or Contentlayer | Allow non-technical staff to update packages without code deployments |

### 9.2 Data Flow — Inquiry Form Submission

```
User submits form
  → Client-side validation passes
  → POST /api/inquiries (Next.js API Route / Server Action)
    → Server validates & sanitizes input
    → Write to database (Supabase)
    → Send email notification to business owner (Resend)
    → Return 200 OK
  → Client shows success message
```

### 9.3 Environment Variables

```env
# WhatsApp
NEXT_PUBLIC_WHATSAPP_NUMBER=         # e.g., 6281234567890

# Email notifications
RESEND_API_KEY=
NOTIFICATION_EMAIL=                   # Business owner email

# Database
DATABASE_URL=                         # Supabase connection string

# Analytics
NEXT_PUBLIC_GA_MEASUREMENT_ID=
```

### 9.4 Package Data Structure (MVP — Static / JSON)

```typescript
type ReunionPackage = {
  id: string;
  slug: string;
  title: string;
  shortDescription: string;       // ≤ 20 words
  category: 'family' | 'school' | 'corporate';
  startingPrice: number;          // In IDR or USD — confirm with business
  currency: 'IDR' | 'USD';
  thumbnailImage: string;         // Path or URL
  itinerary: ItineraryDay[];
  inclusions: string[];
  exclusions: string[];
  featuredAt?: Date | null;       // Null if not featured
};

type ItineraryDay = {
  day: number;
  title: string;
  activities: string[];
};
```

---

## 10. Content Strategy

### 10.1 Voice & Tone

| Scenario | Tone |
|---|---|
| Headlines & CTAs | Warm, confident, reassuring. "Your reunion, handled." |
| Package descriptions | Evocative but clear. Appeal to memory and emotion, then ground in logistics. |
| Form labels & errors | Friendly and direct. Never use "invalid" — use "Please enter a valid email." |
| Error states / Edge cases | Calm, solutions-focused. Always offer an alternative path (WhatsApp). |

### 10.2 Imagery Guidelines

- **People:** Real groups over stock photos wherever possible. Diverse ages visible in hero imagery.
- **Aesthetic:** Slightly warm-toned, slightly faded. Avoid hyper-saturated stock imagery.
- **Licensing:** All images must be licensed for commercial web use (Unsplash commercial license minimum; custom photography preferred).
- **Format:** WebP with JPEG fallback; served via `next/image` with proper `sizes` attributes.

### 10.3 Copywriting Priorities for Launch

- [ ] Hero headline and subheadline (3 A/B variants for testing)
- [ ] Value pillar copy (confirmed with business owner)
- [ ] 4+ package titles, short descriptions, and full itineraries
- [ ] Testimonial copy (collected from real past clients or written as placeholders pending collection)
- [ ] Form confirmation message
- [ ] WhatsApp prefill message

---

## 11. Phased Roadmap

### Phase 0 — MVP (Target: [DATE])

Marketing and lead generation site. No user accounts.

- Landing page (Hero, Pillars, Social Proof)
- Package Catalog + Detail Pages (static data)
- Inquiry Form → Database + Email notification
- WhatsApp FAB
- SEO metadata, sitemap, robots.txt

### Phase 1.5 — Catalog Enhancement (Target: [DATE + 6 weeks])

- Package filtering (Family / School / Corporate / Destination)
- CMS integration for non-technical package updates
- A/B testing on hero headline

### Phase 2 — The Reunion Dashboard (Target: [DATE + 4 months])

- Password-protected guest portal per reunion group
- RSVP Engine: multi-guest RSVP forms
- Memory Lane Gallery: pre-event photo sharing

### Phase 3 — Transactions (Target: [DATE + 7 months])

- Stripe payment integration: deposits and full payments
- Split payment feature (per-attendee contribution tracking)
- Automated payment reminder emails

---

## 12. Risks & Mitigations

| Risk | Probability | Impact | Mitigation |
|---|---|---|---|
| Slow content production (testimonials, itineraries) blocking launch | High | High | Launch with placeholder content behind a feature flag; set hard content deadline 2 weeks before dev completion |
| Poor photo quality undermining brand credibility | Medium | High | Source a licensed photo bank (Unsplash/Getty) and define brand photography brief before design begins |
| Inquiry form spam flooding the business owner's inbox | Medium | Medium | Implement honeypot, rate limiting, and CAPTCHA (hCaptcha) from day one |
| Elder users unable to navigate the site | Medium | Medium | Conduct at least one usability test with a user 65+ before launch |
| WhatsApp number change disrupts all CTAs | Low | High | Store number in environment variable; never hardcode |
| Package prices change frequently, creating outdated content | High | Medium | Add "Price is indicative — contact us for a quote" disclaimer; CMS integration in Phase 1.5 |
| Core Web Vitals failing due to unoptimized images | Medium | High | Enforce `next/image` for all images from the start; add Lighthouse CI to the deployment pipeline |

---

## 13. Assumptions & Constraints

### Assumptions

- The business owner has (or can source) a minimum of 4 complete package itineraries before launch.
- At least 2 real testimonials (with permission to publish) are available before launch.
- A WhatsApp Business account with a dedicated number exists or will be set up before launch.
- An email address for receiving inquiry notifications is available and actively monitored.
- The primary market is [Country/Region — TBC]. Currency and phone number format must be confirmed.
- No user authentication is required for the MVP.

### Constraints

- **Budget:** [To be defined] — impacts CMS choice and photography sourcing.
- **Timeline:** [To be defined] — constraints on scope of MVP vs. Phase 1.5.
- **Team:** Frontend developer(s), designer, and one content/copy contributor assumed available.
- **Legal:** If GDPR or similar data protection laws apply to the target audience, a privacy policy page and cookie consent mechanism are mandatory (not optional).

---

## 14. Open Questions

| # | Question | Owner | Priority | Status |
|---|---|---|---|---|
| 1 | Should "View Itinerary" open a new page or an expanded modal/drawer? | Product + Dev | High | **Closed:** New Page. Modals can confuse older users. Standard navigation with a working "Back" button is preferred. |
| 2 | What is the primary target market? | Business Owner | High | **Closed:** Indonesia (Locals & inbound foreigners). Focus on adult/older demographic. Currency: IDR/USD. |
| 3 | Do we need a Privacy Policy and Cookie Consent banner at launch? | Business Owner + Legal | High | Open |
| 4 | Will packages be managed via hardcoded JSON (MVP) or a CMS from day one? | Product + Dev | High | **Closed:** Hardcoded JSON dummy packages for MVP. Packages are highly customizable. |
| 5 | What email service will be used for inquiry notifications? | Dev Lead | Medium | **Closed:** Skipped for now. No email handling required at MVP. |
| 6 | Are there any existing partner venue logos or testimonials ready to use? | Business Owner | Medium | Open |
| 7 | What is the pricing model displayed? | Business Owner | Medium | **Closed:** "Starting from" / Dummy default packages. Package CTAs route directly to WhatsApp to discuss customization. |
| 8 | Should the site be multi-language at MVP? | Business Owner | Low | Open |

---

## 15. Glossary

| Term | Definition |
|---|---|
| **OTA** | Online Travel Agency — a web platform that sells travel products (accommodation, tours, packages) online |
| **Committee Head** | The primary persona; the person who volunteers or is elected to organize a reunion on behalf of a group |
| **FAB** | Floating Action Button — the fixed-position button (here, WhatsApp) that remains visible while scrolling |
| **CTA** | Call to Action — a button or link that prompts the user to take a specific action |
| **LCP** | Largest Contentful Paint — a Core Web Vitals metric measuring perceived load speed |
| **CLS** | Cumulative Layout Shift — a Core Web Vitals metric measuring visual stability during load |
| **WCAG** | Web Content Accessibility Guidelines — international standard for web accessibility |
| **MVP** | Minimum Viable Product — the smallest feature set that delivers core value and can be launched |
| **SSR** | Server-Side Rendering — content rendered on the server before delivery to the browser (improves SEO) |
| **CMS** | Content Management System — a tool allowing non-technical users to update website content |
| **Pax** | Passengers/Participants — travel industry shorthand for headcount |
| **DXA** | Device-independent pixel unit used in OOXML documents (1440 DXA = 1 inch) |
