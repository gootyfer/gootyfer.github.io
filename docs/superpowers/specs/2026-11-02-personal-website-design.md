# Israel Gutiérrez — Personal Website Design

**Date:** 2026-11-02  
**Status:** Approved on 2026-11-02

## Intent

Redesign Israel Gutiérrez's personal website from scratch so it presents him as a credible product and engineering leader who uses AI pragmatically. The site should help conference organisers, peers, hiring leaders, and other people in the technology sector quickly understand his profile, see evidence of his work and talks, and contact him through professional channels.

The site is not intended to generate consulting leads. Israel has a full-time role; the desired outcome is durable professional visibility and stronger validation for future speaking and career opportunities.

## Goals

- Communicate product and engineering leadership, technical depth, and pragmatic use of AI within the first screen.
- Make Israel's current role at Gobierto visible without overstating his responsibilities.
- Provide concise evidence through selected work, outcomes, and recent talks.
- Make LinkedIn, GitHub, and email immediately accessible.
- Include a deliberately simple notes/blog system that makes publishing occasionally easy.
- Restore `israelgutierrez.es` and `www.israelgutierrez.es` on top of the existing GitHub Pages presence.
- Produce a fast, accessible, responsive, low-maintenance static site with strong metadata and semantic structure.

## Non-goals

- Lead generation, service packages, booking funnels, testimonials, or client-facing calls to action.
- A complete chronological CV or an exhaustive catalogue of projects, skills, talks, certifications, or publications.
- A content management system, database, authentication, comments, newsletter, analytics dashboard, or server-side application.
- A full Spanish translation at launch.
- Visual effects, product screenshots, generic AI imagery, decorative dashboards, or a conventional portfolio-card aesthetic.

## Anti-goals

The result should not look like an AI-generated portfolio template. In particular, it must avoid gradients, glowing blobs, excessive cards, skill badges, animated metrics, typewriter effects, generic illustrations, and claims that are not backed by Israel's history. It should also avoid presenting Israel as a consultant seeking clients or as an “AI expert” detached from product and engineering work.

## Audience and primary journeys

### Conference organiser

The visitor should be able to identify Israel's professional positioning, see that he has spoken at credible events, open the relevant talk pages, and reach LinkedIn or email in under a minute.

### Product or engineering leader

The visitor should understand the arc from software engineering and research into product leadership, see selected outcomes from Gobierto, Leap, and earlier work, and continue to LinkedIn or GitHub for detail.

### Industry peer or reader

The visitor should be able to discover a recent note, read it comfortably, subscribe through RSS, and share a stable URL.

## Language strategy

The first release will be written in English. This keeps the launch focused and creates one canonical body of copy to maintain. The code and URL structure should avoid assumptions that would block a Spanish version later, but launch scope does not include duplicated pages, a language switcher, or translated posts.

## Information architecture

The site has one editorial homepage plus individual note pages.

### Global header

- `Israel Gutiérrez` as the home link.
- Three text links only: LinkedIn, GitHub, and Email.
- No internal section navigation, hamburger menu, theme toggle, or prominent CTA button.

### Homepage sections

1. **Introduction**
   - A real portrait.
   - Compact status line: `Product Maker at Gobierto · Madrid`.
   - Main statement: `I lead product and engineering teams building useful technology.`
   - Short biography establishing 20+ years across software engineering, research, education, and product; current work at Gobierto; and practical use of AI in products and day-to-day work.

2. **Selected work**
   - Gobierto — current role, described conservatively as building products for public procurement professionals.
   - Leap — product leadership and selected outcomes; include that Leap was acquired by Platzi in July 2026.
   - Data and learning products — concise representation of the relevant earlier work.
   - Research and engineering — concise representation of publications and technical foundation.
   - Use prose and typographic hierarchy rather than a grid of cards.

3. **Selected talks**
   - `Menos features, más negocio` — LechazoConf, Valladolid, 2026.
   - `All you need is front` — T3chFest, Madrid, 2018.
   - `Emoticrítico` — T3chFest, Madrid, 2016.
   - Each item contains title, event, year, and a direct external link when available.

4. **Notes**
   - A short statement that Israel writes about product and engineering leadership, AI, public-sector technology, and lessons from building products.
   - List the newest posts with title, publication date, and a restrained one-line summary.
   - If no substantive post is ready at launch, show the section introduction and an honest empty-state line rather than publishing placeholder content.

5. **Footer**
   - Copyright/name, LinkedIn, GitHub, email, and RSS.
   - No social feed, contact form, or newsletter signup.

### Note pages

- Article title, publication date, optional short description, and readable body.
- Link back to the homepage and a minimal footer.
- Optional code blocks and inline images supported, but no complex author box or related-post engine in the first release.

## Content principles

- Lead with outcomes and scope, not a long list of tools.
- Use first person, direct sentences, and a confident but restrained voice.
- Treat AI as part of how Israel builds and leads rather than a standalone identity claim.
- Prefer specific, verifiable statements. Claims sourced from LinkedIn or the CV should be checked once more before publication.
- Keep the Gobierto description conservative until Israel chooses to publish more detail.
- Omit follower counts, recommendations, old certifications, generic skill inventories, and dated social profiles.

### Content source of truth

The homepage copy will be drafted from the facts approved in the design conversation, the latest CV supplied in ChatGPT, Israel's current LinkedIn profile, and the public pages for Gobierto, Leap/Platzi, and the selected talks. The implementer is expected to turn those facts into concise English copy and verify names, dates, outcomes, and destination URLs against those sources. No new material claim should be inferred. Israel will review the final public copy before deployment.

## Visual direction

The selected direction is an editorial biography inspired by real, minimal personal sites rather than portfolio templates.

- Warm off-white background, near-black text, and one restrained accent colour for links and focus states.
- A characterful editorial serif for display copy paired with a neutral sans-serif for metadata and navigation. Fonts must be self-hosted or use a performant system stack; no render-blocking third-party font dependency.
- Generous whitespace and a narrow reading measure.
- A real portrait placed beside or just above the introduction on large screens and integrated naturally into the single-column flow on small screens.
- Thin rules and typographic spacing provide structure; avoid boxed cards and excessive border radii.
- Motion is optional and limited to subtle link/focus transitions, with `prefers-reduced-motion` respected.
- The existing Gravatar can serve as a temporary source during implementation, but launch should use the best available high-resolution, current portrait. The image must be locally stored, optimised, and supplied with meaningful alternative text.

## Responsive and accessible behaviour

- The layout should be designed mobile-first and remain comfortable from small phones through wide desktops.
- Header links may wrap but must remain visible without a menu.
- Body text, touch targets, contrast, focus indicators, heading order, and landmark structure should meet WCAG 2.2 AA expectations.
- The page must remain fully usable without JavaScript.
- External links should be clearly distinguishable; avoid forcing new tabs unless there is a compelling reason.

## Technical approaches considered

### 1. Astro + GitHub Pages + Markdown — selected

Astro generates a static site and manages notes through typed content collections backed by Markdown or MDX. GitHub Actions builds and deploys the site to GitHub Pages. This gives the blog a clean authoring workflow, supports RSS and metadata without bespoke scripts, and keeps hosting aligned with the existing `gootyfer.github.io` presence.

### 2. Plain HTML and CSS

This would minimise dependencies and work well for the homepage, but article templates, feeds, content validation, and future maintenance would require more manual work or custom scripting. It is less suitable because occasional publishing is a core goal.

### 3. Astro + Vercel or Cloudflare Pages

This retains Astro's content model and adds convenient previews and room for dynamic behaviour. It was not selected because the first release is fully static and introducing another hosting account provides little benefit over the existing GitHub Pages setup.

## Selected technical architecture

- Astro, with TypeScript enabled for configuration and content schemas.
- Static output only; no client-side UI framework and no JavaScript shipped unless a small enhancement proves necessary.
- Astro content collections for notes, with frontmatter fields for title, description, publication date, optional updated date, draft state, and optional image.
- Plain CSS using custom properties for colour, spacing, type scale, and layout. No component library or utility-CSS framework.
- Astro's image tooling for local responsive images and portrait optimisation.
- RSS feed, sitemap, canonical URLs, Open Graph metadata, and basic structured data for a `Person` and individual articles.
- GitHub Actions deployment to GitHub Pages from the main branch.
- Automated checks for formatting, Astro type/content validation, production build, and a focused accessibility/smoke check.

## Proposed source structure

The exact filenames are left to implementation planning, but the project should contain:

- Shared base and article layouts.
- Small presentational components for the header, selected-work entries, talk entries, notes list, and footer where this improves clarity.
- One homepage route and one dynamic route for notes.
- A content collection holding Markdown/MDX note files.
- Local assets for the portrait, social preview image, and any article images.
- Global design tokens and styles kept small enough to understand without a design system abstraction.

## Publishing workflow

To publish a note, Israel creates one Markdown file, fills in validated frontmatter, writes the body, and opens a pull request or pushes to the publishing branch. Draft posts are excluded from production. Merging to the deployment branch runs checks and publishes automatically. A short README will document the exact steps and include a copyable post template.

## SEO and professional identity

- The canonical site origin is `https://israelgutierrez.es`.
- The homepage title and description should position Israel around product and engineering leadership, with AI as a practical part of the work.
- Include canonical URLs, Open Graph/Twitter metadata, favicon, social preview image, RSS discovery, sitemap, and robots policy.
- Add concise `Person` structured data with the canonical site and verified LinkedIn/GitHub profiles. Do not expose a street address, phone number, or unnecessary personal data.
- Use privacy-respecting, cookieless analytics only if Israel explicitly asks for it later; ship without analytics initially.

## Domain and deployment

The existing GitHub user site remains the hosting base. Deployment work will:

1. Build and publish the new Astro site through GitHub Pages.
2. Configure `israelgutierrez.es` as the custom domain in GitHub Pages.
3. Verify domain ownership in GitHub before cutover where possible.
4. Configure the Namecheap DNS records required for both the apex domain and `www`.
5. Set one canonical hostname and redirect the other through GitHub Pages.
6. Enable and verify HTTPS after DNS propagation.
7. Confirm that both custom-domain variants and `gootyfer.github.io` resolve without redirect loops or mixed-content errors.

The DNS change will be treated as a separate release step after the new site has been validated on its GitHub Pages URL, minimising downtime.

## Migration and compatibility

- The new homepage replaces the legacy Octopress homepage.
- The live legacy sitemap currently exposes the homepage, `/blog/`, `/blog/archives/`, and one article: `/blog/2014/11/03/hackea-tu-educacion-durante-la-universidad/`.
- Preserve `Hackea tu educación durante la universidad` at `/blog/2014/11/03/hackea-tu-educacion-durante-la-universidad/` as a historical 2014 article. It should remain reachable at that URL but should not appear in the new homepage's Notes list or be presented as current thinking.
- Preserve sensible compatibility routes for `/blog/` and `/blog/archives/`, redirecting them to the new notes area or homepage rather than leaving them broken.
- Retain a `CNAME` file or the equivalent GitHub Pages configuration required by the selected deployment method.
- Remove references to obsolete Twitter/Medium profiles unless Israel confirms they remain useful.

## Quality and acceptance criteria

- The homepage communicates role, positioning, selected work, talks, notes, and professional contact paths as designed.
- Content matches the approved facts and contains no unverified or inflated claims.
- A sample draft note validates locally, and the notes index, article page, RSS feed, sitemap, and metadata build correctly.
- Production build and automated checks pass.
- Manual checks cover current Chrome, Safari, and Firefox at representative mobile and desktop widths.
- Keyboard navigation, visible focus, reduced-motion behaviour, semantic headings, alternative text, and colour contrast are verified.
- Lighthouse checks on the deployed static site target at least 95 for Performance, Accessibility, Best Practices, and SEO, while recognising that measured results may vary by environment.
- No cookie banner is needed because the first release has no tracking or non-essential cookies.
- After cutover, the apex domain, `www`, HTTPS, canonical URLs, and GitHub Pages fallback/redirect behaviour are verified from public DNS.

## Builder decisions

The implementer may decide the precise Astro component boundaries, design-token values, font pairing within the stated constraints, breakpoint values, test tooling, and the exact wording of build scripts. These decisions must preserve the approved visual direction, accessibility goals, and low-dependency architecture.

## Inputs required during implementation

The project can begin with the approved content and temporary portrait. Before public launch, Israel will need to confirm:

- The final email address to expose publicly.
- Whether a newer high-resolution portrait should replace the existing Gravatar.
- Access to or control of the `gootyfer.github.io` repository, GitHub Pages settings, and Namecheap DNS when deployment reaches those steps.

These inputs do not change the architecture or page structure and therefore do not block implementation planning.
