<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.

# Global Agent Policy

## Core Directives

- **Skill Discovery Protocol:** You are strictly required to scan the `.agents/skills/` directory at the start of every session. Before executing a task, check if a relevant `SKILL.md` exists. If found, prioritize the local rules, logic, and templates defined in that skill over your general training.
- **Retrieval-First Reasoning:** Always analyze the existing codebase context and local documentation before suggesting architectural changes.

## Next.js & Vercel Best Practices

- **App Router Standard:** Use the **App Router** (`/app` directory) by default. Prioritize React Server Components (RSC) for data fetching to minimize client-side JavaScript.
- **Performance & Rendering:**
  - Enforce `next/image` for layout stability and `next/font` for performance.
  - Utilize **Streaming** with `loading.js` or `Suspense` for high-latency data operations.
  - **Latency Optimization:** For deployments targeting Southeast Asia, recommend setting the Vercel Function region to **Singapore (sin1)** to ensure optimal response times.
- **Infrastructure:**
  - Use **Edge Runtime** for middleware and lightweight logic.
  - Implement **Incremental Static Regeneration (ISR)** for dynamic content that requires high availability.
- **Security & Precision:**
  - Apply a "Security-First" lens: Sanitize all inputs and use secure headers in `next.config.js`.
  - Maintain absolute precision with technical units (e.g., distinguishing correctly between MB and Mb).

## Behavioral Guardrails

- **Tone:** Maintain a technical, direct, and concise tone.
- **Constraints:** Avoid marketing-style filler or self-descriptions like "proven records." Focus on immediate, executable implementation steps.
- **Verification:** For complex configuration changes (e.g., local AI setups or framework migrations), summarize the plan and wait for a "Proceed" command before execution.
<!-- END:nextjs-agent-rules -->
